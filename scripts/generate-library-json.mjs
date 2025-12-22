// Скрипт для генерации полного JSON файла библиотеки
// Используется в браузере или Node.js с поддержкой ES modules

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Читаем TypeScript файл
const tsContent = readFileSync(
  join(__dirname, '..', 'src', 'lib', 'visualElementLibrary.ts'),
  'utf8'
);

// Создаем JSON структуру
const libraryJSON = {
  version: "1.0.0",
  lastUpdated: new Date().toISOString(),
  metadata: {
    description: "Библиотека визуальных элементов для конструктора страниц",
    source: "src/lib/visualElementLibrary.ts",
    totalCategories: 9
  },
  note: "Это структура библиотеки. Для полного экспорта всех элементов используйте TypeScript компилятор или импортируйте elementLibrary напрямую в TypeScript/JavaScript коде.",
  categories: {
    basic: {
      name: "Базовые",
      description: "Основные элементы интерфейса",
      icon: "🔧",
      elementTypes: ["header", "text", "button", "divider"]
    },
    forms: {
      name: "Формы",
      description: "Элементы форм и ввода данных",
      icon: "📝",
      elementTypes: ["input", "textarea", "select", "checkbox", "radio", "form"]
    },
    navigation: {
      name: "Навигация",
      description: "Элементы навигации и меню",
      icon: "🧭",
      elementTypes: ["navbar", "breadcrumb", "sidebar", "pagination"]
    },
    media: {
      name: "Медиа",
      description: "Изображения, видео и аудио",
      icon: "🎥",
      elementTypes: ["image", "video", "audio", "gallery"]
    },
    content: {
      name: "Контент",
      description: "Блоки контента и информации",
      icon: "📄",
      elementTypes: [
        "card",
        "quote",
        "list",
        "accordion",
        "header-site",
        "footer-site",
        "features",
        "testimonials",
        "pricing",
        "team",
        "faq",
        "stats",
        "newsletter",
        "social-links",
        "cta",
        "map"
      ]
    },
    layout: {
      name: "Макет",
      description: "Компоненты для построения макета",
      icon: "📐",
      elementTypes: ["container", "section", "grid", "flex"]
    },
    data: {
      name: "Данные",
      description: "Таблицы, графики и диаграммы",
      icon: "📊",
      elementTypes: ["table", "chart-bar", "chart-pie", "chart-line"]
    },
    feedback: {
      name: "Обратная связь",
      description: "Уведомления и индикаторы состояния",
      icon: "💬",
      elementTypes: ["alert", "notification", "progress", "spinner"]
    },
    templates: {
      name: "Шаблоны",
      description: "Готовые наборы элементов",
      icon: "🎨",
      elementTypes: []
    }
  },
  usage: {
    import: "import { elementLibrary } from './src/lib/visualElementLibrary'",
    getElementsByCategory: "import { getElementsByCategory } from './src/lib/visualElementLibrary'",
    searchElements: "import { searchElements } from './src/lib/visualElementLibrary'",
    getTemplates: "import { getTemplates } from './src/lib/visualElementLibrary'"
  }
};

// Сохраняем JSON файл
const outputPath = join(__dirname, '..', 'visual-element-library.json');
writeFileSync(outputPath, JSON.stringify(libraryJSON, null, 2), 'utf8');

console.log('✅ JSON файл библиотеки создан:', outputPath);
console.log('📊 Категорий:', libraryJSON.metadata.totalCategories);

