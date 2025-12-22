// API клиент для интеграции с Mod1_v2 (ASR + Chunk)
// Модуль обработки аудио и транскрипции

export interface Mod1Config {
  baseUrl: string;
  apiKey?: string;
  timeout?: number;
}

export interface TranscribeRequest {
  session_id: string;
  lang?: string;
  emit_partial?: boolean;
  audio_file?: File;
  audio_data?: ArrayBuffer;
}

export interface TranscribeResponse {
  status: string;
  session_id: string;
  chunk_id: string;
  text_full: string;
  confidence: number;
  language: string;
  chunks: any[];
}

export interface ChunkData {
  session_id: string;
  chunk_id: string;
  seq: number;
  text: string;
  overlap_prefix: string | null;
  lang: string;
}

export interface WebSocketMessage {
  type: 'hello' | 'progress' | 'chunk' | 'final' | 'error';
  data?: ChunkData | TranscribeResponse | { error: string } | any;
}

export class Mod1Client {
  private config: Mod1Config;
  private wsConnection: WebSocket | null = null;
  private wsReconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor(config: Mod1Config) {
    this.config = {
      timeout: 30000,
      ...config
    };
  }

  /**
   * Пакетная транскрипция аудио файла
   */
  async transcribeFile(request: TranscribeRequest): Promise<TranscribeResponse> {
    console.log('🔄 Mod1Client.transcribeFile called with:', request);
    
    const formData = new FormData();
    // Параметры передаются в URL, не в FormData
    
    if (request.audio_file) {
      console.log('📁 Adding audio file to FormData:', request.audio_file.name, 'size:', request.audio_file.size);
      formData.append('file', request.audio_file);
    }

    console.log('📡 Sending request to Mod1 REST API...');
    // Добавляем timestamp для предотвращения кэширования
    const timestamp = Date.now();
    const url = `${this.config.baseUrl}/v1/transcribe?session_id=${encodeURIComponent(request.session_id)}&lang=${encodeURIComponent(request.lang || 'ru-RU')}&timestamp=${timestamp}`;
    
    const headers: Record<string, string> = {
      ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
    };
    
    console.log('───────────────────────────────────────────────────────────');
    console.log('🔄 Mod1Client.fetch [transcribe]');
    console.log(`📍 URL: POST ${url}`);
    console.log(`📤 Headers:`, JSON.stringify(headers, null, 2));
    console.log(`📦 Body Type: FormData`);
    console.log(`📦 Body (полная информация):`);
    console.log(`   - File name: ${request.audio_file?.name || 'N/A'}`);
    console.log(`   - File size: ${request.audio_file?.size || 0} bytes`);
    console.log(`   - File type: ${request.audio_file?.type || 'N/A'}`);
    console.log(`   - Session ID: ${request.session_id}`);
    console.log(`   - Language: ${request.lang || 'ru-RU'}`);
    // Пытаемся показать содержимое FormData
    const formDataEntries: any = {};
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        formDataEntries[key] = {
          type: 'File',
          name: value.name,
          size: value.size,
          mimeType: value.type,
          lastModified: value.lastModified
        };
      } else {
        formDataEntries[key] = value;
      }
    }
    console.log(`📦 FormData entries (полное содержимое):`, JSON.stringify(formDataEntries, null, 2));
    console.log('───────────────────────────────────────────────────────────');
    
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers
    });

    console.log(`📥 Status: ${response.status} ${response.statusText}`);
    console.log(`📋 Response Headers:`, Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Mod1 REST API error:', response.status, errorText);
      console.log('───────────────────────────────────────────────────────────');
      throw new Error(`Transcription failed: ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    const responseString = JSON.stringify(result, null, 2);
    console.log(`✅ Response Size: ${responseString.length} characters`);
    console.log(`✅ Response (ПОЛНОЕ СОДЕРЖИМОЕ):`);
    console.log(responseString);
    console.log(`✅ Response (как объект):`, result);
    console.log('───────────────────────────────────────────────────────────');
    return result;
  }

  /**
   * Получить полный текст сессии
   */
  async getSessionText(sessionId: string): Promise<TranscribeResponse> {
    const url = `${this.config.baseUrl}/v1/session/${sessionId}/text`;
    const headers: Record<string, string> = {
      ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
    };
    
    console.log('───────────────────────────────────────────────────────────');
    console.log('🔄 Mod1Client.fetch [getSessionText]');
    console.log(`📍 URL: GET ${url}`);
    console.log(`📤 Headers:`, JSON.stringify(headers, null, 2));
    
    const response = await fetch(url, { headers });
    
    console.log(`📥 Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error:', errorText);
      console.log('───────────────────────────────────────────────────────────');
      throw new Error(`Failed to get session text: ${response.statusText}`);
    }

    const result = await response.json();
    const responseString = JSON.stringify(result, null, 2);
    console.log(`✅ Response Size: ${responseString.length} characters`);
    console.log(`✅ Response (ПОЛНОЕ СОДЕРЖИМОЕ):`);
    console.log(responseString);
    console.log(`✅ Response (как объект):`, result);
    console.log('───────────────────────────────────────────────────────────');
    return result;
  }

  /**
   * Получить чанки сессии
   */
  async getSessionChunks(sessionId: string): Promise<ChunkData[]> {
    const url = `${this.config.baseUrl}/v1/session/${sessionId}/chunks`;
    const headers: Record<string, string> = {
      ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
    };
    
    console.log('───────────────────────────────────────────────────────────');
    console.log('🔄 Mod1Client.fetch [getSessionChunks]');
    console.log(`📍 URL: GET ${url}`);
    console.log(`📤 Headers:`, JSON.stringify(headers, null, 2));
    
    const response = await fetch(url, { headers });
    
    console.log(`📥 Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error:', errorText);
      console.log('───────────────────────────────────────────────────────────');
      throw new Error(`Failed to get session chunks: ${response.statusText}`);
    }

    const result = await response.json();
    const responseString = JSON.stringify(result, null, 2);
    console.log(`✅ Response Size: ${responseString.length} characters`);
    console.log(`✅ Response (ПОЛНОЕ СОДЕРЖИМОЕ):`);
    console.log(responseString);
    console.log(`✅ Response (как объект):`, result);
    console.log('───────────────────────────────────────────────────────────');
    return result;
  }

  /**
   * Подключение к WebSocket для real-time стриминга
   */
  connectWebSocket(
    sessionId: string,
    onMessage: (message: WebSocketMessage) => void,
    onError?: (error: Event) => void,
    onClose?: () => void
  ): void {
    const wsUrl = `${this.config.baseUrl.replace('http', 'ws')}/v1/stream?session_id=${sessionId}&lang=ru-RU&emit_partial=true&chunking=true`;
    
    console.log('🔌 Connecting to WebSocket:', wsUrl);
    this.wsConnection = new WebSocket(wsUrl);

    this.wsConnection.onopen = () => {
      console.log('WebSocket connected to Mod1');
      this.wsReconnectAttempts = 0;
    };

    this.wsConnection.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        onMessage(message);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    this.wsConnection.onerror = (error) => {
      console.error('WebSocket error:', error);
      onError?.(error);
    };

    this.wsConnection.onclose = () => {
      console.log('WebSocket disconnected');
      onClose?.();
      
      // Попытка переподключения
      if (this.wsReconnectAttempts < this.maxReconnectAttempts) {
        this.wsReconnectAttempts++;
        console.log(`Attempting to reconnect (${this.wsReconnectAttempts}/${this.maxReconnectAttempts})`);
        setTimeout(() => {
          this.connectWebSocket(sessionId, onMessage, onError, onClose);
        }, 2000 * this.wsReconnectAttempts);
      }
    };
  }

  /**
   * Отправка аудио данных через WebSocket
   */
  sendAudioData(audioData: ArrayBuffer): void {
    console.log('🎵 Sending audio data, size:', audioData.byteLength, 'bytes');
    if (this.wsConnection && this.wsConnection.readyState === WebSocket.OPEN) {
      this.wsConnection.send(audioData);
      console.log('✅ Audio data sent successfully');
    } else {
      console.warn('❌ WebSocket is not connected, readyState:', this.wsConnection?.readyState);
    }
  }

  /**
   * Отключение от WebSocket
   */
  disconnectWebSocket(): void {
    if (this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = null;
    }
  }

  /**
   * Проверка здоровья Mod1 сервиса
   */
  async healthCheck(): Promise<boolean> {
    try {
      const url = `${this.config.baseUrl}/healthz`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
      
    console.log('───────────────────────────────────────────────────────────');
    console.log('🔄 Mod1Client.fetch [healthCheck]');
    console.log(`📍 URL: GET ${url}`);
      
      const response = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);
      console.log(`📥 Status: ${response.status} ${response.statusText}`);
      console.log('───────────────────────────────────────────────────────────');
      return response.ok;
    } catch (error) {
      console.warn('Mod1 health check failed (CORS or service unavailable):', error);
      console.log('───────────────────────────────────────────────────────────');
      return false;
    }
  }

  /**
   * Регистрация webhook'ов для получения результатов
   */
  async registerWebhook(webhookUrl: string, events: string[] = ['chunk', 'final']): Promise<void> {
    const url = `${this.config.baseUrl}/v1/hooks/register`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
    };
    const body = { url: webhookUrl, events };
    
    console.log('───────────────────────────────────────────────────────────');
    console.log('🔄 Mod1Client.fetch [registerWebhook]');
    console.log(`📍 URL: POST ${url}`);
    console.log(`📤 Headers:`, JSON.stringify(headers, null, 2));
    const bodyString = JSON.stringify(body, null, 2);
    console.log(`📦 Body Type: JSON`);
    console.log(`📦 Body Size: ${bodyString.length} characters`);
    console.log(`📦 Body (ПОЛНОЕ СОДЕРЖИМОЕ):`);
    console.log(bodyString);
    console.log(`📦 Body (как объект):`, body);
    console.log('───────────────────────────────────────────────────────────');
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    console.log(`📥 Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error:', errorText);
      console.log('───────────────────────────────────────────────────────────');
      throw new Error(`Failed to register webhook: ${response.statusText}`);
    }
    
    console.log('✅ Webhook registered successfully');
    console.log('───────────────────────────────────────────────────────────');
  }
}

// Создаем экземпляр клиента с настройками по умолчанию
export const mod1Client = new Mod1Client({
  baseUrl: import.meta.env.VITE_MOD1_BASE_URL || 'http://localhost:8080',
  apiKey: import.meta.env.VITE_MOD1_API_KEY
});

export default mod1Client;
