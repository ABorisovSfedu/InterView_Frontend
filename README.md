# 🎯 InterView Platform

Веб-платформа для визуализации требований клиентов в реальном времени с помощью ИИ. Преобразует устные требования (через голос или текст) в визуальные макеты сайтов.

## ✨ Основные возможности

- 🎤 **Распознавание речи** — преобразование голосовых требований в текст (Mod1)
- 🧠 **Извлечение сущностей** — NLP-обработка текста для выделения ключевых элементов (Mod2)
- 🎨 **Визуализация** — автоматическое создание макетов на основе требований (Mod3)
- ✏️ **Визуальный редактор** — редактирование и настройка сгенерированных макетов
- 💾 **Управление проектами** — хранение сессий и макетов в базе данных
- 🔄 **Real-time обработка** — WebSocket интеграция для потоковой транскрипции

## 🚀 Быстрый запуск

### Вариант 1: Docker (рекомендуется)

```bash
# Одна команда для запуска всего проекта
./start.sh

# Или через npm
npm run docker:start
```

### Вариант 2: Локальный запуск

```bash
# Установка зависимостей
npm install
cd server && npm install && cd ..

# Инициализация базы данных
cd server && npm run init-db && cd ..

# Запуск (в разных терминалах)
npm run dev          # Фронтенд (порт 3000)
cd server && npm run dev  # Бэкенд (порт 5001)
```

**Примечание**: Для полной функциональности необходимо запустить внешние модули:
- Mod1 (ASR) на порту 8080
- Mod2 (NLP) на порту 8001
- Mod3 (Visual Mapping) на порту 9001

## 🌐 Доступ к приложению

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **Mod1 API**: http://localhost:8080
- **Mod2 API**: http://localhost:8001
- **Mod3 API**: http://localhost:9001

## 📋 Основные команды

### Docker команды

```bash
npm run docker:start    # Запуск проекта
npm run docker:stop     # Остановка проекта
npm run docker:logs     # Просмотр логов
npm run docker:restart  # Перезапуск
npm run docker:status   # Статус контейнеров
npm run docker:clean    # Полная очистка
```

### Обычные команды

```bash
npm run dev             # Запуск фронтенда (dev режим)
npm run build           # Сборка фронтенда для production
cd server && npm run dev # Запуск бэкенда (dev режим)
cd server && npm start  # Запуск бэкенда (production)
```

## 🏗️ Архитектура

### Технологический стек

**Frontend:**
- React 18.3.1 + TypeScript
- Vite 6.3.5 (сборщик)
- Zustand 5.0.8 (управление состоянием)
- React Router DOM 7.9.3 (маршрутизация)
- @dnd-kit (drag & drop)
- Radix UI + Tailwind CSS (UI компоненты)

**Backend:**
- Node.js + Express 4.18.2
- SQLite3 5.1.6 (база данных)
- JWT (аутентификация)
- bcryptjs (хеширование паролей)

**Внешние модули:**
- Mod1_v2 (ASR) — порт 8080
- Mod2-v1 (NLP) — порт 8001
- Mod3-v1 (Visual Mapping) — порт 9001

### Поток обработки данных

```
Голос/Текст → Mod1 (Транскрипция) → Mod2 (NLP) → Mod3 (Визуализация) → Layout
```

1. **Mod1** — распознавание речи и транскрипция аудио в текст
2. **Mod2** — извлечение сущностей и ключевых фраз из текста
3. **Mod3** — сопоставление сущностей с визуальными компонентами
4. **Web Backend** — сохранение результатов в базе данных

## 📁 Структура проекта

```
├── src/                    # Исходный код фронтенда
│   ├── api/               # API клиенты (mod1, mod2, mod3, web)
│   ├── components/        # React компоненты
│   ├── flows/             # Бизнес-логика потоков (voiceToLayout)
│   ├── stores/            # Zustand stores
│   ├── page-engine/       # Движок рендеринга страниц
│   └── lib/               # Утилиты и библиотеки
├── server/                # Backend сервер
│   ├── routes/            # API маршруты
│   ├── models/            # Модели данных
│   ├── middleware/        # Express middleware
│   └── config/            # Конфигурация БД
└── docker-compose.yml     # Docker конфигурация
```

## 🎨 Основные функции

### Генерация layout из голоса

Запись голоса → Транскрипция → NLP обработка → Визуальные компоненты

### Генерация layout из текста

Ввод текста → NLP обработка → Визуальные компоненты

### Визуальный редактор

- Drag & Drop компонентов
- Библиотека визуальных элементов (60+ компонентов)
- Редактирование свойств
- Режимы View/Edit
- Сохранение изменений

### Управление проектами

- Создание проектов
- Управление сессиями
- Сохранение макетов
- История изменений
  
## 🔧 Настройка

### Переменные окружения

**Frontend** (`.env.local`):
```env
VITE_MOD1_BASE_URL=http://localhost:8080
VITE_MOD2_BASE_URL=http://localhost:8001
VITE_MOD3_BASE_URL=http://localhost:9001
VITE_API_BASE_URL=http://localhost:5001
```

**Backend** (`server/config.env`):
```env
NODE_ENV=development
PORT=5001
DB_PATH=./data/database.sqlite
JWT_SECRET=your-secret-key-here
```

## 🎯 Основные маршруты

- `/` — Главная страница (landing)
- `/auth` — Аутентификация (вход/регистрация)
- `/app` — Список проектов
- `/projects/{id}` — Страница проекта
- `/session/{id}` — Единая страница сессии
- `/builder/{id}` — Визуальный редактор
- `/generate/{id}` — Генерация layout
- `/pricing` — Тарифы подписки
- `/account` — Личный кабинет

## 🛠️ Разработка

### Требования

- Node.js 18+
- npm или yarn
- Docker (опционально, для контейнеризации)

### Установка зависимостей

```bash
# Frontend
npm install

# Backend
cd server
npm install
```

### Инициализация БД

```bash
cd server
npm run init-db
```

### Проверка здоровья сервисов

```bash
# Backend
curl http://localhost:5001/api/health

# Mod1
curl http://localhost:8080/healthz

# Mod2
curl http://localhost:8001/health

# Mod3
curl http://localhost:9001/health
```

## 📦 Производственное развертывание

```bash
# Сборка фронтенда
npm run build

# Запуск через Docker Compose
docker-compose up -d

# Или запуск бэкенда напрямую
cd server
npm start
```


## 📝 Лицензия

MIT

## 👥 Команда

InterView Team
