/**
 * Утилита для определения сетевых ошибок и ошибок недоступности сервера
 */

export interface NetworkError {
  isNetworkError: boolean;
  originalError: Error;
}

/**
 * Проверяет, является ли ошибка сетевой ошибкой или ошибкой недоступности сервера
 */
export function isNetworkError(error: any): boolean {
  if (!error) return false;

  // Проверяем имя ошибки
  const errorName = error.name || '';
  const errorMessage = error.message || '';
  const errorCode = error.code || '';

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

  // Ошибки CORS (часто связаны с недоступностью сервера)
  if (
    errorMessage.includes('CORS') ||
    errorMessage.includes('Cross-Origin') ||
    errorName === 'NetworkError'
  ) {
    return true;
  }

  // Ошибки парсинга JSON (могут быть при недоступности сервера)
  if (
    errorName === 'SyntaxError' &&
    (errorMessage.includes('JSON') ||
      errorMessage.includes('Unexpected token') ||
      errorMessage.includes('Unexpected end'))
  ) {
    // Но только если это не ошибка валидации (400)
    // Проверяем, нет ли статуса в сообщении
    if (!errorMessage.match(/\b(400|401|403|404)\b/)) {
      return true;
    }
  }

  // Проверяем статус ответа (5xx - серверные ошибки)
  if (error.status && error.status >= 500) {
    return true;
  }

  // Проверяем, есть ли в сообщении упоминание о недоступности сервера
  if (
    errorMessage.toLowerCase().includes('сервер недоступен') ||
    errorMessage.toLowerCase().includes('server unavailable') ||
    errorMessage.toLowerCase().includes('connection refused') ||
    errorMessage.toLowerCase().includes('network error')
  ) {
    return true;
  }

  return false;
}

/**
 * Создает обертку для ошибки с флагом сетевой ошибки
 */
export function createNetworkError(error: Error): NetworkError {
  return {
    isNetworkError: true,
    originalError: error,
  };
}



