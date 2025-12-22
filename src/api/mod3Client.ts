// API клиент для интеграции с Mod3-v1 (Visual Elements Mapping)
// Модуль сопоставления NLP результатов с визуальными элементами интерфейса

export interface Mod3Config {
  baseUrl: string;
  apiKey?: string;
  timeout?: number;
}

export interface MapRequest {
  session_id: string;
  entities: string[];
  keyphrases: string[];
  template?: string;
}

export interface ComponentMatch {
  term: string;
  component: string;
  component_type: string;
  confidence: number;
  match_type: 'exact' | 'fuzzy' | 'synonym' | 'default';
}

export interface LayoutSection {
  [key: string]: Array<{
    component: string;
    confidence?: number;
    match_type?: string;
  }>;
}

export interface MapResponse {
  status: string;
  session_id: string;
  layout: {
    template: string;
    sections: LayoutSection;
    count: number;
  };
  matches: ComponentMatch[];
  explanations: Array<{
    term: string;
    matched_component: string;
    match_type: string;
    score: number;
  }>;
}

export interface VocabTerm {
  term: string;
  category: string;
  synonyms?: string[];
}

export interface VocabResponse {
  terms: VocabTerm[];
}

export class Mod3Client {
  private config: Mod3Config;

  constructor(config: Mod3Config) {
    this.config = {
      timeout: 30000,
      ...config
    };
  }

  /**
   * Сопоставление сущностей с layout'ом
   */
  async mapEntities(request: MapRequest): Promise<MapResponse> {
    const url = `${this.config.baseUrl}/v1/map`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
    };
    
    console.log('───────────────────────────────────────────────────────────');
    console.log('🔄 Mod3Client.fetch [mapEntities]');
    console.log(`📍 URL: POST ${url}`);
    console.log(`📤 Headers:`, JSON.stringify(headers, null, 2));
    const bodyString = JSON.stringify(request, null, 2);
    console.log(`📦 Body Type: JSON`);
    console.log(`📦 Body Size: ${bodyString.length} characters`);
    console.log(`📦 Body (ПОЛНОЕ СОДЕРЖИМОЕ):`);
    console.log(bodyString);
    console.log(`📦 Body (как объект):`, request);
    console.log('───────────────────────────────────────────────────────────');
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(request)
    });
    
    console.log(`📥 Status: ${response.status} ${response.statusText}`);
    console.log(`📋 Response Headers:`, Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error:', errorText);
      console.log('───────────────────────────────────────────────────────────');
      throw new Error(`Mapping failed: ${response.statusText} - ${errorText}`);
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
   * Получение сохраненного layout'а для сессии
   */
  async getLayout(sessionId: string): Promise<MapResponse> {
    const url = `${this.config.baseUrl}/v1/layout/${sessionId}`;
    const headers: Record<string, string> = {
      ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
    };
    
    console.log('───────────────────────────────────────────────────────────');
    console.log('🔄 Mod3Client.fetch [getLayout]');
    console.log(`📍 URL: GET ${url}`);
    console.log(`📤 Headers:`, JSON.stringify(headers, null, 2));
    
    const response = await fetch(url, { headers });
    
    console.log(`📥 Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error:', errorText);
      console.log('───────────────────────────────────────────────────────────');
      throw new Error(`Failed to get layout: ${response.statusText}`);
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
    const url = `${this.config.baseUrl}/v1/vocab`;
    const headers: Record<string, string> = {
      ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
    };
    
    console.log('───────────────────────────────────────────────────────────');
    console.log('🔄 Mod3Client.fetch [getVocab]');
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
   * Синхронизация словаря терминов
   */
  async syncVocab(): Promise<void> {
    const url = `${this.config.baseUrl}/v1/vocab/sync`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
    };
    
    console.group('🔄 Mod3Client.fetch [syncVocab]');
    console.log(`📍 URL: POST ${url}`);
    console.log(`📤 Headers:`, headers);
    
    const response = await fetch(url, {
      method: 'POST',
      headers
    });
    
    console.log(`📥 Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error:', errorText);
      console.log('───────────────────────────────────────────────────────────');
      throw new Error(`Failed to sync vocab: ${response.statusText} - ${errorText}`);
    }
    
    console.log('✅ Vocab synced successfully');
    console.groupEnd();
  }

  /**
   * Проверка здоровья Mod3 сервиса
   */
  async healthCheck(): Promise<boolean> {
    try {
      const url = `${this.config.baseUrl}/healthz`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
      
    console.log('───────────────────────────────────────────────────────────');
    console.log('🔄 Mod3Client.fetch [healthCheck]');
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
      console.warn('Mod3 health check failed:', error);
      console.log('───────────────────────────────────────────────────────────');
      return false;
    }
  }

  /**
   * Получение статистики сопоставлений
   */
  async getMappingStats(sessionId: string): Promise<{
    total_matches: number;
    exact_matches: number;
    fuzzy_matches: number;
    synonym_matches: number;
    default_matches: number;
    confidence_avg: number;
  }> {
    const url = `${this.config.baseUrl}/v1/stats/${sessionId}`;
    const headers: Record<string, string> = {
      ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
    };
    
    console.log('───────────────────────────────────────────────────────────');
    console.log('🔄 Mod3Client.fetch [getMappingStats]');
    console.log(`📍 URL: GET ${url}`);
    console.log(`📤 Headers:`, JSON.stringify(headers, null, 2));
    
    const response = await fetch(url, { headers });
    
    console.log(`📥 Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error:', errorText);
      console.log('───────────────────────────────────────────────────────────');
      throw new Error(`Failed to get mapping stats: ${response.statusText}`);
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
   * Получение доступных шаблонов layout'ов
   */
  async getTemplates(): Promise<{
    templates: Array<{
      name: string;
      description: string;
      sections: string[];
      max_components: number;
    }>;
  }> {
    const url = `${this.config.baseUrl}/v1/templates`;
    const headers: Record<string, string> = {
      ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
    };
    
    console.log('───────────────────────────────────────────────────────────');
    console.log('🔄 Mod3Client.fetch [getTemplates]');
    console.log(`📍 URL: GET ${url}`);
    console.log(`📤 Headers:`, JSON.stringify(headers, null, 2));
    
    const response = await fetch(url, { headers });
    
    console.log(`📥 Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error:', errorText);
      console.log('───────────────────────────────────────────────────────────');
      throw new Error(`Failed to get templates: ${response.statusText}`);
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
   * Создание кастомного сопоставления
   */
  async createCustomMapping(
    term: string, 
    component: string, 
    componentType: string,
    confidence: number = 1.0
  ): Promise<void> {
    const url = `${this.config.baseUrl}/v1/mappings`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
    };
    const body = { term, component, component_type: componentType, confidence };
    
    console.log('───────────────────────────────────────────────────────────');
    console.log('🔄 Mod3Client.fetch [createCustomMapping]');
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
      throw new Error(`Failed to create custom mapping: ${response.statusText} - ${errorText}`);
    }
    
    console.log('✅ Custom mapping created successfully');
    console.groupEnd();
  }

  /**
   * Получение истории сопоставлений для сессии
   */
  async getMappingHistory(sessionId: string): Promise<{
    history: Array<{
      timestamp: string;
      entities: string[];
      keyphrases: string[];
      matches: ComponentMatch[];
      layout: LayoutSection;
    }>;
  }> {
    const url = `${this.config.baseUrl}/v1/history/${sessionId}`;
    const headers: Record<string, string> = {
      ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
    };
    
    console.log('───────────────────────────────────────────────────────────');
    console.log('🔄 Mod3Client.fetch [getMappingHistory]');
    console.log(`📍 URL: GET ${url}`);
    console.log(`📤 Headers:`, JSON.stringify(headers, null, 2));
    
    const response = await fetch(url, { headers });
    
    console.log(`📥 Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error:', errorText);
      console.log('───────────────────────────────────────────────────────────');
      throw new Error(`Failed to get mapping history: ${response.statusText}`);
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
export const mod3Client = new Mod3Client({
  baseUrl: 'http://localhost:9001',
  apiKey: undefined
});

export default mod3Client;
