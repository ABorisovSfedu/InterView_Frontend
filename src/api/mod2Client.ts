// API клиент для интеграции с Mod2-v1 (NLP + Layout)
// Модуль обработки текста и генерации layout'ов

export interface Mod2Config {
  baseUrl: string;
  apiKey?: string;
  timeout?: number;
}

export interface ChunkIngestRequest {
  session_id: string;
  chunk_id: string;
  seq: number;
  text: string;
  overlap_prefix: string | null;
  lang: string;
}

export interface FullIngestRequest {
  session_id: string;
  text_full: string;
  lang: string;
  duration_sec: number;
  total_chunks?: number;
  chunks?: any[];
}

export interface EntitiesResponse {
  status: string;
  session_id: string;
  entities: string[];
  keyphrases: string[];
  chunks_processed: number;
}

export interface LayoutResponse {
  status: string;
  session_id: string;
  layout: {
    template: string;
    sections: {
      hero?: any[];
      main?: any[];
      footer?: any[];
    };
    count: number;
  };
}

export interface VocabResponse {
  terms: Array<{
    term: string;
    category: string;
    synonyms?: string[];
  }>;
}

export class Mod2Client {
  private config: Mod2Config;

  constructor(config: Mod2Config) {
    this.config = {
      timeout: 30000,
      ...config
    };
  }

  /**
   * Отправка чанка в Mod2 для NLP обработки
   */
  async ingestChunk(chunk: ChunkIngestRequest): Promise<void> {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const idempotencyKey = `chunk_${chunk.chunk_id}_${Date.now()}`;
    const url = `${this.config.baseUrl}/v2/ingest/chunk`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Signature': 'test-signature', // Временная подпись для тестирования
      'Idempotency-Key': idempotencyKey,
      'X-Request-Id': requestId,
      ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
    };
    
    console.log('───────────────────────────────────────────────────────────');
    console.log('🔄 Mod2Client.fetch [ingestChunk]');
    console.log(`📍 URL: POST ${url}`);
    console.log(`🆔 Request ID: ${requestId}`);
    console.log(`📤 Headers:`, JSON.stringify(headers, null, 2));
    const bodyString = JSON.stringify(chunk, null, 2);
    console.log(`📦 Body Type: JSON`);
    console.log(`📦 Body Size: ${bodyString.length} characters`);
    console.log(`📦 Body (ПОЛНОЕ СОДЕРЖИМОЕ):`);
    console.log(bodyString);
    console.log(`📦 Body (как объект):`, chunk);
    console.log('───────────────────────────────────────────────────────────');
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(chunk)
    });
    
    console.log(`📥 Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error:', errorText);
      console.log('───────────────────────────────────────────────────────────');
      throw new Error(`Failed to ingest chunk: ${response.statusText} - ${errorText}`);
    }
    
    console.log('✅ Chunk ingested successfully');
    console.groupEnd();
  }

  /**
   * Отправка финального результата в Mod2
   */
  async ingestFull(result: FullIngestRequest): Promise<void> {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const idempotencyKey = `full_${result.session_id}_${Date.now()}`;
    const url = `${this.config.baseUrl}/v2/ingest/full`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Signature': 'test-signature', // Временная подпись для тестирования
      'Idempotency-Key': idempotencyKey,
      'X-Request-Id': requestId,
      ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
    };
    
    console.log('───────────────────────────────────────────────────────────');
    console.log('🔄 Mod2Client.fetch [ingestFull]');
    console.log(`📍 URL: POST ${url}`);
    console.log(`🆔 Request ID: ${requestId}`);
    console.log(`📤 Headers:`, JSON.stringify(headers, null, 2));
    const bodyString = JSON.stringify(result, null, 2);
    console.log(`📦 Body Type: JSON`);
    console.log(`📦 Body Size: ${bodyString.length} characters`);
    console.log(`📦 Body (ПОЛНОЕ СОДЕРЖИМОЕ):`);
    console.log(bodyString);
    console.log(`📦 Body (как объект):`, result);
    console.log('───────────────────────────────────────────────────────────');
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(result)
    });
    
    console.log(`📥 Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error:', errorText);
      console.log('───────────────────────────────────────────────────────────');
      throw new Error(`Failed to ingest full result: ${response.statusText} - ${errorText}`);
    }
    
    console.log('✅ Full result ingested successfully');
    console.groupEnd();
  }

  /**
   * Получение сущностей для сессии
   */
  async getSessionEntities(sessionId: string): Promise<EntitiesResponse> {
    const url = `${this.config.baseUrl}/v2/session/${sessionId}/entities`;
    const headers: Record<string, string> = {
      ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
    };
    
    console.log('───────────────────────────────────────────────────────────');
    console.log('🔄 Mod2Client.fetch [getSessionEntities]');
    console.log(`📍 URL: GET ${url}`);
    console.log(`📤 Headers:`, JSON.stringify(headers, null, 2));
    
    const response = await fetch(url, { headers });
    
    console.log(`📥 Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error:', errorText);
      console.log('───────────────────────────────────────────────────────────');
      throw new Error(`Failed to get session entities: ${response.statusText}`);
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
   * Получение layout для сессии
   */
  async getSessionLayout(sessionId: string): Promise<LayoutResponse> {
    const url = `${this.config.baseUrl}/v2/session/${sessionId}/layout`;
    const headers: Record<string, string> = {
      ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
    };
    
    console.log('───────────────────────────────────────────────────────────');
    console.log('🔄 Mod2Client.fetch [getSessionLayout]');
    console.log(`📍 URL: GET ${url}`);
    console.log(`📤 Headers:`, JSON.stringify(headers, null, 2));
    
    const response = await fetch(url, { headers });
    
    console.log(`📥 Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error:', errorText);
      console.log('───────────────────────────────────────────────────────────');
      throw new Error(`Failed to get session layout: ${response.statusText}`);
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
   * Получение словаря терминов
   */
  async getVocab(): Promise<VocabResponse> {
    const url = `${this.config.baseUrl}/v2/vocab`;
    const headers: Record<string, string> = {
      ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
    };
    
    console.log('───────────────────────────────────────────────────────────');
    console.log('🔄 Mod2Client.fetch [getVocab]');
    console.log(`📍 URL: GET ${url}`);
    console.log(`📤 Headers:`, JSON.stringify(headers, null, 2));
    
    const response = await fetch(url, { headers });
    
    console.log(`📥 Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error:', errorText);
      console.log('───────────────────────────────────────────────────────────');
      throw new Error(`Failed to get vocab: ${response.statusText}`);
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
   * Проверка здоровья Mod2 сервиса
   */
  async healthCheck(): Promise<boolean> {
    try {
      const url = `${this.config.baseUrl}/healthz`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
      
    console.log('───────────────────────────────────────────────────────────');
    console.log('🔄 Mod2Client.fetch [healthCheck]');
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
      console.warn('Mod2 health check failed:', error);
      console.log('───────────────────────────────────────────────────────────');
      return false;
    }
  }

  /**
   * Отладка парсинга текста
   */
  async debugParse(text: string): Promise<any> {
    const url = `${this.config.baseUrl}/v2/debug/parse`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
    };
    const body = { text };
    
    console.log('───────────────────────────────────────────────────────────');
    console.log('🔄 Mod2Client.fetch [debugParse]');
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
      throw new Error(`Failed to debug parse: ${response.statusText}`);
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
}

// Создаем экземпляр клиента с настройками по умолчанию
export const mod2Client = new Mod2Client({
  baseUrl: import.meta.env.VITE_MOD2_BASE_URL || 'http://localhost:8001',
  apiKey: import.meta.env.VITE_MOD2_API_KEY
});

export default mod2Client;
