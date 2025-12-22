// API клиент для Mod1_v2 (ASR + Transcription)
// Обработка аудио файлов и транскрипции в реальном времени

import { fetchJson, API_CONFIG } from './config';

// Интерфейсы для Mod1 API
export interface Mod1TranscribeOptions {
  session_id: string;
  chunk_id?: string;
  lang?: string;
  timestamp?: number;
}

export interface Mod1TranscribeResponse {
  status: 'ok' | 'error';
  session_id: string;
  chunk_id?: string;
  text: string;
  confidence?: number;
  language?: string;
  error?: string;
}

export interface AudioFile {
  file: File;
  sessionId: string;
  chunkId?: string;
}

/**
 * Класс для работы с Mod1 API
 */
export class Mod1Client {
  private baseUrl: string;
  
  constructor(baseUrl = API_CONFIG.MOD1_BASE_URL) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Убираем trailing slash
  }
  
  /**
   * Основной метод транскрипции аудио файла
   * @param audioFile - объект с аудио файлом и метаданными
   * @returns результат транскрипции
   */
  async transcribe(audioFile: AudioFile): Promise<Mod1TranscribeResponse> {
    const { file, sessionId, chunkId } = audioFile;
    
    // Проверяем, что это аудио файл
    if (!file.type.startsWith('audio/')) {
      throw new Error('Файл должен быть аудио формата');
    }
    
    // Нормализуем имя файла
    const fileName = file.name || `audio_${Date.now()}.webm`;
    
    // Создаем FormData для multipart запроса
    const formData = new FormData();
    formData.append('file', file, fileName);
    
    // Параметры запроса
    const params = new URLSearchParams({
      session_id: sessionId,
      lang: 'ru-RU'
    });
    
    if (chunkId) {
      params.append('chunk_id', chunkId);
    }
    
    // Добавляем timestamp если не задан
    const timestamp = Date.now();
    params.append('timestamp', timestamp.toString());
    
    // Формируем URL
    const url = `${this.baseUrl}/v1/transcribe?${params.toString()}`;
    
    try {
      console.group('🎤 ========== MOD1: ТРАНСКРИПЦИЯ АУДИО ==========');
      console.log('📍 URL:', url);
      console.log('📋 Параметры запроса:', {
        session_id: sessionId,
        chunk_id: chunkId,
        lang: 'ru-RU',
        timestamp: timestamp
      });
      
      // Показываем параметры FormData
      const formDataInfo: any = {};
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          formDataInfo[key] = {
            type: 'File',
            name: value.name,
            size: value.size,
            mimeType: value.type
          };
        } else {
          formDataInfo[key] = value;
        }
      }
      console.log('📤 ОТПРАВЛЯЕМ В MOD1:');
      console.log('   FormData:', JSON.stringify(formDataInfo, null, 2));
      console.log('   Файл:', {
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        type: file.type
      });
      
      // Отправляем запрос с multipart/form-data
      const response = await fetchJson<Mod1TranscribeResponse>(url, {
        method: 'POST',
        headers: {
          // Не устанавливаем Content-Type для multipart
        },
        body: formData,
        retries: 2,
        timeout: 30000 // 30 секунд для аудио обработки
      }, {
        source: 'mod1',
        sessionId
      });
      
      // Проверяем успешность
      if (response.data.status !== 'ok') {
        console.error('❌ MOD1 ОТВЕТ С ОШИБКОЙ:', response.data);
        console.groupEnd();
        throw new Error(response.data.error || 'Mod1 вернул ошибку в статусе');
      }
      
      console.log('📥 ПОЛУЧАЕМ ОТ MOD1:');
      console.log('   Статус:', response.data.status);
      console.log('   Session ID:', response.data.session_id);
      console.log('   Chunk ID:', response.data.chunk_id);
      console.log('   Текст транскрипции:', response.data.text);
      console.log('   Уверенность:', response.data.confidence);
      console.log('   Полный ответ:', JSON.stringify(response.data, null, 2));
      console.groupEnd();
      
      return response.data;
      
    } catch (error) {
      console.error('❌ Ошибка транскрипции Mod1:', {
        source: 'mod1',
        error: error instanceof Error ? error.message : 'Unknown error',
        sessionId,
        fileName: file.name
      });
      
      // Возвращаем структурированную ошибку
      if (error instanceof Error) {
        return {
          status: 'error',
          session_id: sessionId,
          chunk_id: chunkId,
          text: '',
          error: error.message
        };
      }
      
      throw error;
    }
  }
  
  /**
   * Создание аудио файла из WebM chunks для потоковой обработки
   * @param chunks - массив аудио chunks
  'sessionId - идентификатор сессии
   * @returns промис с результатом транскрипции
   */
  async transcribeFromChunks(
    chunks: Blob[], 
    sessionId: string,
    language = 'ru-RU'
  ): Promise<Mod1TranscribeResponse> {
    // Объединяем chunks в один файл
    const combinedBlob = new Blob(chunks, { type: 'audio/webm' });
    const audioFile = new File([combinedBlob], `audio_${sessionId}.webm`, {
      type: 'audio/webm'
    });
    
    return this.transcribe({
      file: audioFile,
      sessionId,
      chunkId: `chunk_combined_${Date.now()}`
    });
  }
  
  /**
   * Проверка здоровья Mod1 сервиса
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetchJson(`${this.baseUrl}/healthz`, {
        method: 'GET',
        timeout: 5000
      }, {
        source: 'mod1-health'
      });
      
      return response.data.status === 'ok';
    } catch (error) {
      console.warn('⚠️ Mod1 health check failed:', error);
      return false;
    }
  }
  
  /**
   * Получение информации о поддерживаемых форматах аудио
   */
  async getSupportedFormats(): Promise<string[]> {
    try {
      const response = await fetchJson(`${this.baseUrl}/v1/formats`, {
        method: 'GET',
        timeout: 5000
      }, {
        source: 'mod1-formats'
      });
      
      return response.data?.formats || ['audio/webm', 'audio/wav', 'audio/mp3'];
    } catch (error) {
      // Fallback на стандартные форматы
      return ['audio/webm', 'audio/wav', 'audio/mp3'];
    }
  }
  
  /**
   * Создание аудио файла из MediaRecorder chunks
   * Утилитарная функция для работы с веб-аудио
   */
  static createAudioFileFromRecorder(
    chunks: Blob[],
    sessionId: string,
    fileName?: string
  ): AudioFile {
    const combinedBlob = new Blob(chunks, { type: 'audio/webm' });
    const file = new File([combinedBlob], fileName || `recording_${sessionId}.webm`, {
      type: 'audio/webm'
    });
    
    return {
      file,
      sessionId,
      chunkId: `chunk_${Date.now()}`
    };
  }
}

// Экспортируем синглтон для использования в приложении
export const mod1Client = new Mod1Client();

// Экспорт по умолчанию
export default mod1Client;

