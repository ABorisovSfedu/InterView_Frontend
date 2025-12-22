// Определяем базовый URL API в зависимости от окружения
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api'  // В продакшене используем относительный путь (nginx проксирует)
  : 'http://localhost:5001/api';  // В разработке используем прямой URL к бэкенду

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('auth_token');
  }

  // Установить токен
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  // Получить заголовки
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Базовый метод для запросов
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      mode: 'cors',
      credentials: 'include',
      ...options,
    };

    try {
      console.log('───────────────────────────────────────────────────────────');
      console.log(`🔄 ApiClient.request [${endpoint}]`);
      console.log(`📍 URL: ${config.method || 'GET'} ${url}`);
      console.log(`📤 Headers:`, JSON.stringify(config.headers, null, 2));
      if (config.body) {
        try {
          const bodyObj = typeof config.body === 'string' ? JSON.parse(config.body) : config.body;
          const bodyString = JSON.stringify(bodyObj, null, 2);
          console.log(`📦 Body Type: JSON`);
          console.log(`📦 Body Size: ${bodyString.length} characters`);
          console.log(`📦 Body (ПОЛНОЕ СОДЕРЖИМОЕ):`);
          console.log(bodyString);
          // Также выводим как объект для удобства просмотра
          console.log(`📦 Body (как объект):`, bodyObj);
        } catch {
          console.log(`📦 Body Type: Raw string`);
          console.log(`📦 Body Size: ${config.body.length} characters`);
          console.log(`📦 Body (ПОЛНОЕ СОДЕРЖИМОЕ):`, config.body);
        }
      } else {
        console.log(`📦 Body: (empty)`);
      }
      console.log('───────────────────────────────────────────────────────────');
      
      const response = await fetch(url, config);
      
      console.log(`📥 Status: ${response.status} ${response.statusText}`);
      console.log(`📋 Response Headers:`, Object.fromEntries(response.headers.entries()));
      
      // Проверяем, есть ли контент для парсинга
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('❌ Non-JSON response:', text);
        
        // Если статус 5xx, это серверная ошибка
        if (response.status >= 500) {
          const networkError = new Error('Сервер недоступен или возвращает некорректный ответ');
          networkError.status = response.status;
          networkError.isNetworkError = true;
          throw networkError;
        }
        
        throw new Error(`Server returned non-JSON response: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const responseString = JSON.stringify(data, null, 2);
      console.log(`✅ Response Size: ${responseString.length} characters`);
      console.log(`✅ Response data (полное содержимое):`);
      console.log(responseString);
      // Также выводим как объект для удобства просмотра
      console.log(`✅ Response data (как объект):`, data);

      if (!response.ok) {
        console.error('❌ Error response:', data);
        // Если статус 5xx, это серверная ошибка (недоступность)
        if (response.status >= 500) {
          const networkError = new Error(data.error || `HTTP error! status: ${response.status}`);
          networkError.status = response.status;
          networkError.isNetworkError = true;
          console.log('───────────────────────────────────────────────────────────');
          throw networkError;
        }
        
        // Для 4xx ошибок (валидация, неправильный пароль и т.д.) не помечаем как сетевую
        console.log('───────────────────────────────────────────────────────────');
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      console.log('───────────────────────────────────────────────────────────');
      return data;
    } catch (error) {
      console.error('❌ API request failed:', error);
      console.log('───────────────────────────────────────────────────────────');
      
      // Проверяем, является ли это сетевой ошибкой
      const isNetwork = this._isNetworkError(error);
      
      if (isNetwork) {
        // Помечаем ошибку как сетевую
        if (!error.isNetworkError) {
          error.isNetworkError = true;
        }
        // Если это SyntaxError при парсинге, заменяем сообщение
        if (error.name === 'SyntaxError') {
          const networkError = new Error('Сервер недоступен или возвращает некорректный ответ');
          networkError.isNetworkError = true;
          networkError.originalError = error;
          throw networkError;
        }
      }
      
      throw error;
    }
  }

  // Вспомогательный метод для определения сетевых ошибок
  _isNetworkError(error) {
    if (!error) return false;

    const errorName = error.name || '';
    const errorMessage = error.message || '';
    const errorCode = error.code || '';

    // Уже помечена как сетевая
    if (error.isNetworkError) return true;

    // Статус 5xx
    if (error.status && error.status >= 500) return true;

    // Сетевые ошибки fetch
    if (
      errorName === 'TypeError' &&
      (errorMessage.includes('Failed to fetch') ||
        errorMessage.includes('fetch failed') ||
        errorMessage.includes('NetworkError') ||
        errorMessage.includes('Network request failed'))
    ) {
      return true;
    }

    // Ошибки подключения
    if (
      errorCode === 'ECONNREFUSED' ||
      errorCode === 'ENOTFOUND' ||
      errorCode === 'ETIMEDOUT' ||
      errorMessage.includes('ECONNREFUSED') ||
      errorMessage.includes('ERR_NETWORK') ||
      errorMessage.includes('ERR_CONNECTION_REFUSED') ||
      errorMessage.includes('ERR_CONNECTION_TIMED_OUT')
    ) {
      return true;
    }

    // Ошибки CORS
    if (
      errorMessage.includes('CORS') ||
      errorMessage.includes('Cross-Origin') ||
      errorName === 'NetworkError'
    ) {
      return true;
    }

    // SyntaxError при парсинге (может быть при недоступности сервера)
    if (
      errorName === 'SyntaxError' &&
      (errorMessage.includes('JSON') ||
        errorMessage.includes('Unexpected token') ||
        errorMessage.includes('Unexpected end'))
    ) {
      // Но только если это не ошибка валидации (400)
      if (!errorMessage.match(/\b(400|401|403|404)\b/)) {
        return true;
      }
    }

    return false;
  }

  // GET запрос
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST запрос
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT запрос
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE запрос
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // Загрузка файлов
  async uploadFiles(endpoint, files) {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    const headers = {};
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const url = `${this.baseURL}${endpoint}`;
    
    console.group(`🔄 ApiClient.uploadFiles [${endpoint}]`);
    console.log(`📍 URL: POST ${url}`);
    console.log(`📤 Headers:`, JSON.stringify(headers, null, 2));
    console.log(`📦 Body Type: FormData`);
    console.log(`📦 Body (полная информация):`);
    console.log(`   - Total files: ${files.length}`);
    files.forEach((file, index) => {
      console.log(`   File ${index + 1}:`);
      console.log(`     - Name: ${file.name}`);
      console.log(`     - Size: ${file.size} bytes`);
      console.log(`     - Type: ${file.type}`);
      console.log(`     - Last Modified: ${new Date(file.lastModified).toISOString()}`);
    });
    // Пытаемся показать содержимое FormData
    const formDataEntries = {};
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

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    console.log(`📥 Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Error:', error);
      console.log('───────────────────────────────────────────────────────────');
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const responseString = JSON.stringify(result, null, 2);
    console.log(`✅ Response Size: ${responseString.length} characters`);
    console.log(`✅ Response data (полное содержимое):`);
    console.log(responseString);
    console.log(`✅ Response data (как объект):`, result);
    console.groupEnd();
    return result;
  }

  // Аутентификация
  async register(email, password, name, plan = 'basic') {
    return this.post('/auth/register', { email, password, name, plan });
  }

  async login(email, password) {
    return this.post('/auth/login', { email, password });
  }

  async getProfile() {
    return this.get('/auth/profile');
  }

  async updateProfile(data) {
    return this.put('/auth/profile', data);
  }

  async changePassword(currentPassword, newPassword) {
    return this.put('/auth/change-password', { currentPassword, newPassword });
  }

  // Проекты
  async getProjects() {
    return this.get('/projects');
  }

  async getProject(projectId) {
    return this.get(`/projects/${projectId}`);
  }

  async createProject(name, client = null, description = null) {
    return this.post('/projects', { name, client, description });
  }

  async updateProject(projectId, data) {
    return this.put(`/projects/${projectId}`, data);
  }

  async deleteProject(projectId) {
    return this.delete(`/projects/${projectId}`);
  }

  async getProjectStats(projectId) {
    return this.get(`/projects/${projectId}/stats`);
  }

  // Сессии
  async getProjectSessions(projectId) {
    return this.get(`/sessions/project/${projectId}`);
  }

  async getUserSessions() {
    return this.get(`/sessions/user`);
  }

  async getSession(sessionId) {
    return this.get(`/sessions/${sessionId}`);
  }

  async createSession(projectId, type, duration = null, fileSize = null) {
    const data = { type };
    if (duration !== null) data.duration = duration;
    if (fileSize !== null) data.fileSize = fileSize;
    
    const url = `${this.baseURL}/sessions/project/${projectId}`;
    const bodyString = JSON.stringify(data, null, 2);
    
    console.log('═══════════════════════════════════════════════════════════');
    console.log('🆕 СОЗДАНИЕ СЕССИИ');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`📍 URL: POST ${url}`);
    console.log(`📋 Project ID: ${projectId}`);
    console.log(`📋 Type: ${type}`);
    console.log(`📋 Duration: ${duration}`);
    console.log(`📋 File Size: ${fileSize}`);
    console.log(`📦 Body Type: JSON`);
    console.log(`📦 Body Size: ${bodyString.length} characters`);
    console.log(`📦 Body (ПОЛНОЕ СОДЕРЖИМОЕ):`);
    console.log(bodyString);
    console.log(`📦 Body (как объект):`, data);
    console.log('───────────────────────────────────────────────────────────');
    
    try {
      const result = await this.post(`/sessions/project/${projectId}`, data);
      const resultString = JSON.stringify(result, null, 2);
      console.log(`✅ Response Size: ${resultString.length} characters`);
      console.log(`✅ Response (ПОЛНОЕ СОДЕРЖИМОЕ):`);
      console.log(resultString);
      console.log(`✅ Response (как объект):`, result);
      console.log('═══════════════════════════════════════════════════════════');
      return result;
    } catch (error) {
      console.error('❌ Ошибка создания сессии:', error);
      console.log('═══════════════════════════════════════════════════════════');
      throw error;
    }
  }

  async updateSession(sessionId, data) {
    return this.put(`/sessions/${sessionId}`, data);
  }

  async deleteSession(sessionId) {
    return this.delete(`/sessions/${sessionId}`);
  }

  async uploadSessionFiles(sessionId, files) {
    return this.uploadFiles(`/sessions/${sessionId}/upload`, files);
  }

  async getSessionFiles(sessionId) {
    return this.get(`/sessions/${sessionId}/files`);
  }

  // Layout сохранение и загрузка
  async saveLayout(sessionId, layoutData) {
    return this.post(`/sessions/${sessionId}/layout`, layoutData);
  }

  async loadLayout(sessionId) {
    return this.get(`/sessions/${sessionId}/layout`);
  }

  // Проверка здоровья сервера
  async healthCheck() {
    return this.get('/health');
  }
}

// Создаем единственный экземпляр API клиента
const apiClient = new ApiClient();

export default apiClient;
