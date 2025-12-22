# Dockerfile для бэкенда (Node.js + Express)
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci --only=production

# Копируем исходный код
COPY . .

# Создаем директории для загрузок и данных
RUN mkdir -p uploads data

# Устанавливаем права доступа
RUN chown -R node:node /app
USER node

# Открываем порт 5000
EXPOSE 5000

# Инициализируем базу данных и запускаем сервер
CMD ["sh", "-c", "npm run init-db && npm start"]

