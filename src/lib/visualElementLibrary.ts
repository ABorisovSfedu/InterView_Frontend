// Полноценная библиотека визуальных элементов
import { VisualElement, ElementCategory, ElementTemplate, ElementLibrary, defaultStyles } from '../types/visualElements';

// Базовые элементы
const basicElements: VisualElement[] = [
  {
    id: 'header-h1',
    type: 'header',
    category: 'basic',
    name: 'Заголовок H1',
    description: 'Основной заголовок страницы',
    icon: '📝',
    content: 'Добро пожаловать на наш сайт',
    x: 0,
    y: 0,
    width: 500,
    height: 60,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { level: 1 },
    styles: { 
      ...defaultStyles.header, 
      fontSize: '42px',
      fontWeight: '700',
      lineHeight: '1.2',
      color: '#111827',
      letterSpacing: '-0.02em',
      margin: '0',
      padding: '0',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }
  },
  {
    id: 'header-h2',
    type: 'header',
    category: 'basic',
    name: 'Заголовок H2',
    description: 'Вторичный заголовок',
    icon: '📝',
    content: 'Создавайте удивительные веб-сайты',
    x: 0,
    y: 0,
    width: 450,
    height: 50,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { level: 2 },
    styles: { 
      ...defaultStyles.header, 
      fontSize: '32px',
      fontWeight: '600',
      lineHeight: '1.3',
      color: '#1f2937',
      margin: '0',
      padding: '0'
    }
  },
  {
    id: 'text-paragraph',
    type: 'text',
    category: 'basic',
    name: 'Параграф',
    description: 'Обычный текстовый блок',
    icon: '📄',
    content: 'Это пример качественного текстового контента. Здесь можно разместить подробное описание вашего продукта, услуги или компании. Текст должен быть читаемым и информативным.',
    x: 0,
    y: 0,
    width: 500,
    height: 120,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: {},
    styles: { 
      ...defaultStyles.text,
      fontSize: '16px',
      lineHeight: '1.7',
      color: '#4b5563',
      margin: '0',
      padding: '0'
    }
  },
  {
    id: 'button-primary',
    type: 'button',
    category: 'basic',
    name: 'Кнопка (Основная)',
    description: 'Основная кнопка действия',
    icon: '🔘',
    content: 'Начать сейчас',
    x: 0,
    y: 0,
    width: 160,
    height: 48,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { variant: 'primary' },
    styles: { 
      ...defaultStyles.button, 
      backgroundColor: '#3b82f6',
      color: 'white',
      fontSize: '16px',
      fontWeight: '600',
      padding: '12px 24px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)',
      transition: 'all 0.2s',
      cursor: 'pointer',
      border: 'none'
    }
  },
  {
    id: 'button-secondary',
    type: 'button',
    category: 'basic',
    name: 'Кнопка (Вторичная)',
    description: 'Вторичная кнопка',
    icon: '🔘',
    content: 'Узнать больше',
    x: 0,
    y: 0,
    width: 150,
    height: 48,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { variant: 'secondary' },
    styles: { 
      ...defaultStyles.button, 
      backgroundColor: 'white',
      color: '#3b82f6',
      fontSize: '16px',
      fontWeight: '600',
      padding: '12px 24px',
      borderRadius: '8px',
      border: '2px solid #3b82f6',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.2s',
      cursor: 'pointer'
    }
  },
  {
    id: 'divider',
    type: 'divider',
    category: 'basic',
    name: 'Разделитель',
    description: 'Горизонтальная линия-разделитель',
    icon: '➖',
    content: '',
    x: 0,
    y: 0,
    width: 400,
    height: 1,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: {},
    styles: { 
      backgroundColor: 'transparent',
      border: 'none',
      borderTop: '1px solid #e5e7eb',
      margin: '24px 0'
    }
  }
];

// Элементы форм
const formElements: VisualElement[] = [
  {
    id: 'input-text',
    type: 'input',
    category: 'forms',
    name: 'Поле ввода (Текст)',
    description: 'Поле для ввода текста',
    icon: '📝',
    content: '',
    x: 0,
    y: 0,
    width: 320,
    height: 48,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { type: 'text', placeholder: 'Введите ваше имя' },
    styles: { 
      ...defaultStyles.input,
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: '15px',
      backgroundColor: '#ffffff',
      transition: 'all 0.2s',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
    }
  },
  {
    id: 'input-email',
    type: 'input',
    category: 'forms',
    name: 'Поле ввода (Email)',
    description: 'Поле для ввода email',
    icon: '📧',
    content: '',
    x: 0,
    y: 0,
    width: 320,
    height: 48,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { type: 'email', placeholder: 'your.email@example.com' },
    styles: { 
      ...defaultStyles.input,
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: '15px',
      backgroundColor: '#ffffff',
      transition: 'all 0.2s',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
    }
  },
  {
    id: 'input-password',
    type: 'input',
    category: 'forms',
    name: 'Поле ввода (Пароль)',
    description: 'Поле для ввода пароля',
    icon: '🔒',
    content: '',
    x: 0,
    y: 0,
    width: 320,
    height: 48,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { type: 'password', placeholder: '••••••••' },
    styles: { 
      ...defaultStyles.input,
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: '15px',
      backgroundColor: '#ffffff',
      transition: 'all 0.2s',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      fontFamily: 'monospace',
      letterSpacing: '2px'
    }
  },
  {
    id: 'textarea',
    type: 'textarea',
    category: 'forms',
    name: 'Многострочное поле',
    description: 'Поле для ввода длинного текста',
    icon: '📄',
    content: '',
    x: 0,
    y: 0,
    width: 400,
    height: 120,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { placeholder: 'Расскажите нам о вашем проекте...', rows: 5 },
    styles: { 
      ...defaultStyles.input, 
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: '15px',
      lineHeight: '1.6',
      resize: 'vertical',
      backgroundColor: '#ffffff',
      transition: 'all 0.2s',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      fontFamily: 'inherit'
    }
  },
  {
    id: 'select',
    type: 'select',
    category: 'forms',
    name: 'Выпадающий список',
    description: 'Список для выбора опций',
    icon: '📋',
    content: 'Выберите категорию',
    x: 0,
    y: 0,
    width: 280,
    height: 48,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { options: ['Веб-разработка', 'Дизайн', 'Маркетинг', 'Консультации'] },
    styles: { 
      ...defaultStyles.input,
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: '15px',
      backgroundColor: '#ffffff',
      transition: 'all 0.2s',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      cursor: 'pointer',
      appearance: 'none',
      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23666\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 12px center',
      paddingRight: '40px'
    }
  },
  {
    id: 'checkbox',
    type: 'checkbox',
    category: 'forms',
    name: 'Чекбокс',
    description: 'Флажок для выбора',
    icon: '☑️',
    content: 'Я согласен с условиями использования',
    x: 0,
    y: 0,
    width: 280,
    height: 24,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { checked: false },
    styles: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px',
      fontSize: '14px',
      color: '#374151',
      cursor: 'pointer'
    }
  },
  {
    id: 'radio',
    type: 'radio',
    category: 'forms',
    name: 'Радиокнопка',
    description: 'Кнопка для выбора одной опции',
    icon: '🔘',
    content: 'Базовый план',
    x: 0,
    y: 0,
    width: 180,
    height: 24,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { name: 'radio-group', value: 'option1' },
    styles: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px',
      fontSize: '14px',
      color: '#374151',
      cursor: 'pointer'
    }
  }
];

// Элементы навигации
const navigationElements: VisualElement[] = [
  {
    id: 'navbar',
    type: 'navbar',
    category: 'navigation',
    name: 'Навигационная панель',
    description: 'Горизонтальная навигация',
    icon: '🧭',
    content: 'Главная | О нас | Услуги | Портфолио | Контакты',
    x: 0,
    y: 0,
    width: 800,
    height: 72,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { links: ['Главная', 'О нас', 'Услуги', 'Портфолио', 'Контакты'] },
    styles: { 
      backgroundColor: '#ffffff', 
      color: '#1f2937', 
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '32px',
      borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      fontSize: '15px',
      fontWeight: '500'
    }
  },
  {
    id: 'breadcrumb',
    type: 'breadcrumb',
    category: 'navigation',
    name: 'Хлебные крошки',
    description: 'Навигационная цепочка',
    icon: '🍞',
    content: 'Главная / Продукты / Категория / Товар',
    x: 0,
    y: 0,
    width: 400,
    height: 40,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { items: ['Главная', 'Продукты', 'Категория', 'Товар'] },
    styles: { 
      color: '#6b7280', 
      fontSize: '14px',
      padding: '12px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  },
  {
    id: 'sidebar',
    type: 'sidebar',
    category: 'navigation',
    name: 'Боковая панель',
    description: 'Вертикальная навигация',
    icon: '📋',
    content: 'Главная\nО нас\nУслуги\nПортфолио\nБлог\nКонтакты',
    x: 0,
    y: 0,
    width: 240,
    height: 400,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { items: ['Главная', 'О нас', 'Услуги', 'Портфолио', 'Блог', 'Контакты'] },
    styles: { 
      backgroundColor: '#f9fafb', 
      border: '1px solid #e5e7eb',
      borderRight: 'none',
      padding: '24px 0',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    }
  },
  {
    id: 'pagination',
    type: 'pagination',
    category: 'navigation',
    name: 'Пагинация',
    description: 'Навигация по страницам',
    icon: '📄',
    content: '« 1 2 3 ... 10 »',
    x: 0,
    y: 0,
    width: 320,
    height: 48,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { currentPage: 1, totalPages: 10 },
    styles: { 
      display: 'flex',
      gap: '4px',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px'
    }
  }
];

// Медиа элементы
const mediaElements: VisualElement[] = [
  {
    id: 'image',
    type: 'image',
    category: 'media',
    name: 'Изображение',
    description: 'Картинка или фото',
    icon: '🖼️',
    content: '',
    x: 0,
    y: 0,
    width: 400,
    height: 300,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { src: '', alt: 'Изображение' },
    styles: { 
      backgroundColor: '#f3f4f6',
      border: 'none',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#9ca3af',
      overflow: 'hidden',
      position: 'relative',
      backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundSize: 'cover',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    }
  },
  {
    id: 'video',
    type: 'video',
    category: 'media',
    name: 'Видео',
    description: 'Видео контент',
    icon: '🎥',
    content: '',
    x: 0,
    y: 0,
    width: 560,
    height: 315,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { src: '', controls: true },
    styles: { 
      backgroundColor: '#000000',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    }
  },
  {
    id: 'audio',
    type: 'audio',
    category: 'media',
    name: 'Аудио',
    description: 'Аудио плеер',
    icon: '🎵',
    content: '',
    x: 0,
    y: 0,
    width: 400,
    height: 80,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { src: '', controls: true },
    styles: { 
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '16px 20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    }
  },
  {
    id: 'gallery',
    type: 'gallery',
    category: 'media',
    name: 'Галерея',
    description: 'Сетка изображений',
    icon: '🖼️',
    content: '',
    x: 0,
    y: 0,
    width: 600,
    height: 450,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { images: [], columns: 3 },
    styles: { 
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '12px',
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }
  }
];

// Контентные блоки
const contentElements: VisualElement[] = [
  {
    id: 'card',
    type: 'card',
    category: 'content',
    name: 'Карточка',
    description: 'Контейнер для контента',
    icon: '🃏',
    content: 'Премиум план\n\nПолучите доступ ко всем функциям и приоритетную поддержку. Идеально для бизнеса.',
    x: 0,
    y: 0,
    width: 340,
    height: 280,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: {},
    styles: { 
      ...defaultStyles.card,
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }
  },
  {
    id: 'quote',
    type: 'quote',
    category: 'content',
    name: 'Цитата',
    description: 'Блок с цитатой',
    icon: '💬',
    content: 'Дизайн — это не то, как это выглядит и ощущается. Дизайн — это то, как это работает.',
    x: 0,
    y: 0,
    width: 500,
    height: 140,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { author: 'Стив Джобс' },
    styles: { 
      borderLeft: '4px solid #3b82f6',
      padding: '24px 32px',
      backgroundColor: '#f8fafc',
      fontStyle: 'italic',
      fontSize: '20px',
      lineHeight: '1.6',
      color: '#1f2937',
      borderRadius: '8px',
      margin: '0',
      position: 'relative',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    }
  },
  {
    id: 'list-ul',
    type: 'list',
    category: 'content',
    name: 'Список (Маркированный)',
    description: 'Маркированный список',
    icon: '📋',
    content: '• Профессиональный дизайн\n• Адаптивная верстка\n• SEO оптимизация\n• Техническая поддержка',
    x: 0,
    y: 0,
    width: 320,
    height: 160,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { type: 'ul', items: ['Профессиональный дизайн', 'Адаптивная верстка', 'SEO оптимизация', 'Техническая поддержка'] },
    styles: { 
      padding: '24px 32px',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '15px',
      lineHeight: '2',
      color: '#374151',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    }
  },
  {
    id: 'list-ol',
    type: 'list',
    category: 'content',
    name: 'Список (Нумерованный)',
    description: 'Нумерованный список',
    icon: '🔢',
    content: '1. Анализ требований\n2. Разработка дизайна\n3. Верстка и программирование\n4. Тестирование и запуск',
    x: 0,
    y: 0,
    width: 400,
    height: 180,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { type: 'ol', items: ['Анализ требований', 'Разработка дизайна', 'Верстка и программирование', 'Тестирование и запуск'] },
    styles: { 
      padding: '24px 32px',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '15px',
      lineHeight: '2',
      color: '#374151',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    }
  },
  {
    id: 'accordion',
    type: 'accordion',
    category: 'content',
    name: 'Аккордеон',
    description: 'Складывающиеся секции',
    icon: '📁',
    content: 'Часто задаваемые вопросы\nКак начать работу?\nКакие методы оплаты вы принимаете?\nПредоставляете ли вы поддержку?',
    x: 0,
    y: 0,
    width: 500,
    height: 200,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { sections: ['Часто задаваемые вопросы', 'Как начать работу?', 'Какие методы оплаты вы принимаете?', 'Предоставляете ли вы поддержку?'] },
    styles: { 
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      overflow: 'hidden',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    }
  },
  {
    id: 'header-site',
    type: 'header-site',
    category: 'content',
    name: 'Шапка сайта',
    description: 'Полноценная шапка с логотипом и навигацией',
    icon: '🏠',
    content: 'Логотип\nГлавная | О нас | Услуги | Контакты\nВойти',
    x: 0,
    y: 0,
    width: 1200,
    height: 80,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { 
      logo: 'Логотип',
      links: ['Главная', 'О нас', 'Услуги', 'Контакты'],
      showButton: true
    },
    styles: { 
      backgroundColor: '#ffffff',
      color: '#1f2937',
      borderBottom: '1px solid #e5e7eb',
      padding: '0 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      fontSize: '15px',
      fontWeight: '500'
    }
  },
  {
    id: 'footer-site',
    type: 'footer-site',
    category: 'content',
    name: 'Подвал сайта',
    description: 'Полноценный подвал с ссылками и контактами',
    icon: '📄',
    content: 'Компания\nО нас | Команда | Карьера | Новости\n\nУслуги\nВеб-разработка | Дизайн | Маркетинг\n\nПоддержка\nПомощь | Документация | API\n\n© 2024 Компания. Все права защищены.',
    x: 0,
    y: 0,
    width: 1200,
    height: 400,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { 
      columns: [
        { title: 'Компания', links: ['О нас', 'Команда', 'Карьера', 'Новости'] },
        { title: 'Услуги', links: ['Веб-разработка', 'Дизайн', 'Маркетинг'] },
        { title: 'Поддержка', links: ['Помощь', 'Документация', 'API'] }
      ],
      copyright: '© 2024 Компания. Все права защищены.'
    },
    styles: { 
      backgroundColor: '#1f2937',
      color: '#ffffff',
      padding: '60px 40px 30px',
      display: 'flex',
      flexDirection: 'column',
      gap: '40px'
    }
  },
  {
    id: 'features',
    type: 'features',
    category: 'content',
    name: 'Секция преимуществ',
    description: 'Блок с преимуществами и особенностями',
    icon: '⭐',
    content: 'Быстрая загрузка\nНаши сайты загружаются за секунды\n\nБезопасность\nЗащита данных на высшем уровне\n\nПоддержка 24/7\nКруглосуточная техническая поддержка',
    x: 0,
    y: 0,
    width: 1000,
    height: 350,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { 
      items: [
        { title: 'Быстрая загрузка', description: 'Наши сайты загружаются за секунды', icon: '⚡' },
        { title: 'Безопасность', description: 'Защита данных на высшем уровне', icon: '🔒' },
        { title: 'Поддержка 24/7', description: 'Круглосуточная техническая поддержка', icon: '💬' }
      ]
    },
    styles: { 
      backgroundColor: '#ffffff',
      padding: '80px 40px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '40px'
    }
  },
  {
    id: 'testimonials',
    type: 'testimonials',
    category: 'content',
    name: 'Отзывы клиентов',
    description: 'Блок с отзывами и рекомендациями',
    icon: '💬',
    content: 'Отличный сервис! Профессиональная команда и качественный результат.\n— Иван Петров, CEO\n\nРабота выполнена в срок, все требования учтены.\n— Мария Сидорова, Директор',
    x: 0,
    y: 0,
    width: 1000,
    height: 400,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { 
      items: [
        { text: 'Отличный сервис! Профессиональная команда и качественный результат.', author: 'Иван Петров', role: 'CEO' },
        { text: 'Работа выполнена в срок, все требования учтены.', author: 'Мария Сидорова', role: 'Директор' }
      ]
    },
    styles: { 
      backgroundColor: '#f9fafb',
      color: '#1f2937',
      padding: '80px 40px',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '40px'
    }
  },
  {
    id: 'pricing',
    type: 'pricing',
    category: 'content',
    name: 'Тарифные планы',
    description: 'Блок с ценами и тарифами',
    icon: '💰',
    content: 'Базовый\n₽1,999/мес\nОсновные функции\nПоддержка по email\n\nПрофессиональный\n₽4,999/мес\nВсе функции\nПриоритетная поддержка\n\nПремиум\n₽9,999/мес\nВсе функции\nПерсональный менеджер',
    x: 0,
    y: 0,
    width: 1000,
    height: 500,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { 
      plans: [
        { name: 'Базовый', price: '₽1,999', period: '/мес', features: ['Основные функции', 'Поддержка по email'] },
        { name: 'Профессиональный', price: '₽4,999', period: '/мес', features: ['Все функции', 'Приоритетная поддержка'], featured: true },
        { name: 'Премиум', price: '₽9,999', period: '/мес', features: ['Все функции', 'Персональный менеджер'] }
      ]
    },
    styles: { 
      backgroundColor: '#ffffff',
      color: '#1f2937',
      padding: '80px 40px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '30px'
    }
  },
  {
    id: 'team',
    type: 'team',
    category: 'content',
    name: 'Команда',
    description: 'Блок с информацией о команде',
    icon: '👥',
    content: 'Иван Иванов\nCEO и основатель\n10+ лет опыта\n\nМария Петрова\nДизайнер\nСпециалист по UI/UX\n\nАлексей Сидоров\nРазработчик\nFull-stack разработчик',
    x: 0,
    y: 0,
    width: 1000,
    height: 400,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { 
      members: [
        { name: 'Иван Иванов', role: 'CEO и основатель', description: '10+ лет опыта' },
        { name: 'Мария Петрова', role: 'Дизайнер', description: 'Специалист по UI/UX' },
        { name: 'Алексей Сидоров', role: 'Разработчик', description: 'Full-stack разработчик' }
      ]
    },
    styles: { 
      backgroundColor: '#ffffff',
      color: '#1f2937',
      padding: '80px 40px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '40px'
    }
  },
  {
    id: 'faq',
    type: 'faq',
    category: 'content',
    name: 'FAQ',
    description: 'Часто задаваемые вопросы',
    icon: '❓',
    content: 'Как начать работу?\nПросто зарегистрируйтесь и выберите тарифный план.\n\nКакие методы оплаты вы принимаете?\nМы принимаем карты, электронные кошельки и банковские переводы.\n\nПредоставляете ли вы поддержку?\nДа, мы предоставляем круглосуточную техническую поддержку.',
    x: 0,
    y: 0,
    width: 800,
    height: 500,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { 
      items: [
        { question: 'Как начать работу?', answer: 'Просто зарегистрируйтесь и выберите тарифный план.' },
        { question: 'Какие методы оплаты вы принимаете?', answer: 'Мы принимаем карты, электронные кошельки и банковские переводы.' },
        { question: 'Предоставляете ли вы поддержку?', answer: 'Да, мы предоставляем круглосуточную техническую поддержку.' }
      ]
    },
    styles: { 
      backgroundColor: '#ffffff',
      color: '#1f2937',
      padding: '60px 40px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }
  },
  {
    id: 'stats',
    type: 'stats',
    category: 'content',
    name: 'Статистика',
    description: 'Блок с цифрами и статистикой',
    icon: '📊',
    content: '1000+\nДовольных клиентов\n50+\nЗавершенных проектов\n99%\nУдовлетворенность\n24/7\nПоддержка',
    x: 0,
    y: 0,
    width: 1000,
    height: 300,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { 
      items: [
        { value: '1000+', label: 'Довольных клиентов' },
        { value: '50+', label: 'Завершенных проектов' },
        { value: '99%', label: 'Удовлетворенность' },
        { value: '24/7', label: 'Поддержка' }
      ]
    },
    styles: { 
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      padding: '80px 40px',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '40px',
      textAlign: 'center'
    }
  },
  {
    id: 'newsletter',
    type: 'newsletter',
    category: 'content',
    name: 'Подписка на рассылку',
    description: 'Форма подписки на новости',
    icon: '📧',
    content: 'Подпишитесь на нашу рассылку\nПолучайте последние новости и обновления\n\nВведите ваш email\nПодписаться',
    x: 0,
    y: 0,
    width: 800,
    height: 250,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { 
      title: 'Подпишитесь на нашу рассылку',
      description: 'Получайте последние новости и обновления'
    },
    styles: { 
      backgroundColor: '#f3f4f6',
      padding: '60px 40px',
      borderRadius: '12px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }
  },
  {
    id: 'social-links',
    type: 'social-links',
    category: 'content',
    name: 'Социальные сети',
    description: 'Ссылки на социальные сети',
    icon: '🔗',
    content: 'Facebook | Twitter | Instagram | LinkedIn',
    x: 0,
    y: 0,
    width: 400,
    height: 60,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { 
      links: [
        { name: 'Facebook', url: '#', icon: '📘' },
        { name: 'Twitter', url: '#', icon: '🐦' },
        { name: 'Instagram', url: '#', icon: '📷' },
        { name: 'LinkedIn', url: '#', icon: '💼' }
      ]
    },
    styles: { 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      padding: '20px'
    }
  },
  {
    id: 'cta',
    type: 'cta',
    category: 'content',
    name: 'Призыв к действию',
    description: 'Блок с призывом к действию',
    icon: '🎯',
    content: 'Готовы начать?\nНачните использовать наш сервис уже сегодня\n\nНачать бесплатно',
    x: 0,
    y: 0,
    width: 800,
    height: 300,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { 
      title: 'Готовы начать?',
      description: 'Начните использовать наш сервис уже сегодня',
      buttonText: 'Начать бесплатно'
    },
    styles: { 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundColor: '#667eea',
      color: '#ffffff',
      padding: '80px 40px',
      borderRadius: '16px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  {
    id: 'map',
    type: 'map',
    category: 'content',
    name: 'Карта',
    description: 'Интерактивная карта',
    icon: '🗺️',
    content: '',
    x: 0,
    y: 0,
    width: 800,
    height: 400,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { 
      address: 'Москва, ул. Примерная, 123',
      lat: 55.7558,
      lng: 37.6173
    },
    styles: { 
      backgroundColor: '#e5e7eb',
      color: '#1f2937',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #d1d5db',
      overflow: 'hidden'
    }
  }
];

// Компоненты макета
const layoutElements: VisualElement[] = [
  {
    id: 'container',
    type: 'container',
    category: 'layout',
    name: 'Контейнер',
    description: 'Основной контейнер',
    icon: '📦',
    content: '',
    x: 0,
    y: 0,
    width: 800,
    height: 400,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: {},
    styles: { 
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      padding: '32px',
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      maxWidth: '100%',
      margin: '0 auto'
    }
  },
  {
    id: 'row',
    type: 'row',
    category: 'layout',
    name: 'Строка',
    description: 'Горизонтальная строка',
    icon: '➡️',
    content: '',
    x: 0,
    y: 0,
    width: 700,
    height: 120,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: {},
    styles: { 
      display: 'flex',
      gap: '24px',
      backgroundColor: '#f9fafb',
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      alignItems: 'center',
      justifyContent: 'flex-start'
    }
  },
  {
    id: 'column',
    type: 'column',
    category: 'layout',
    name: 'Колонка',
    description: 'Вертикальная колонка',
    icon: '⬇️',
    content: '',
    x: 0,
    y: 0,
    width: 280,
    height: 400,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: {},
    styles: { 
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      backgroundColor: '#f9fafb',
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      alignItems: 'stretch'
    }
  },
  {
    id: 'grid',
    type: 'grid',
    category: 'layout',
    name: 'Сетка',
    description: 'CSS Grid контейнер',
    icon: '⊞',
    content: '',
    x: 0,
    y: 0,
    width: 600,
    height: 300,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { columns: 3, rows: 2 },
    styles: { 
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'repeat(2, 1fr)',
      gap: '20px',
      backgroundColor: '#f9fafb',
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid #e5e7eb'
    }
  }
];

// Таблицы и данные
const dataElements: VisualElement[] = [
  {
    id: 'table',
    type: 'table',
    category: 'data',
    name: 'Таблица',
    description: 'Таблица данных',
    icon: '📊',
    content: 'Продукт | Количество | Цена\nТовар A | 150 шт | 12,500 ₽\nТовар B | 89 шт | 8,900 ₽\nТовар C | 234 шт | 23,400 ₽',
    x: 0,
    y: 0,
    width: 600,
    height: 200,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { 
      headers: ['Продукт', 'Количество', 'Цена'],
      rows: [['Товар A', '150 шт', '12,500 ₽'], ['Товар B', '89 шт', '8,900 ₽'], ['Товар C', '234 шт', '23,400 ₽']]
    },
    styles: { 
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      overflow: 'hidden',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      fontSize: '14px'
    }
  },
  {
    id: 'chart-bar',
    type: 'chart',
    category: 'data',
    name: 'Гистограмма',
    description: 'Столбчатая диаграмма',
    icon: '📈',
    content: '',
    x: 0,
    y: 0,
    width: 500,
    height: 320,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { type: 'bar', data: [] },
    styles: { 
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#6b7280',
      fontSize: '14px',
      position: 'relative'
    }
  },
  {
    id: 'chart-pie',
    type: 'chart',
    category: 'data',
    name: 'Круговая диаграмма',
    description: 'Круговая диаграмма',
    icon: '🥧',
    content: '',
    x: 0,
    y: 0,
    width: 360,
    height: 360,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { type: 'pie', data: [] },
    styles: { 
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#6b7280',
      fontSize: '14px',
      position: 'relative'
    }
  }
];

// Уведомления и обратная связь
const feedbackElements: VisualElement[] = [
  {
    id: 'alert-success',
    type: 'alert',
    category: 'feedback',
    name: 'Уведомление (Успех)',
    description: 'Успешное уведомление',
    icon: '✅',
    content: 'Ваш заказ успешно оформлен! Мы отправили подтверждение на вашу почту.',
    x: 0,
    y: 0,
    width: 420,
    height: 72,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { type: 'success' },
    styles: { 
      backgroundColor: '#d1fae5',
      border: '1px solid #10b981',
      borderLeft: '4px solid #10b981',
      color: '#065f46',
      padding: '16px 20px',
      borderRadius: '8px',
      fontSize: '14px',
      lineHeight: '1.5',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: '0 2px 4px rgba(16, 185, 129, 0.1)'
    }
  },
  {
    id: 'alert-error',
    type: 'alert',
    category: 'feedback',
    name: 'Уведомление (Ошибка)',
    description: 'Уведомление об ошибке',
    icon: '❌',
    content: 'Произошла ошибка при обработке запроса. Пожалуйста, попробуйте еще раз.',
    x: 0,
    y: 0,
    width: 420,
    height: 72,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { type: 'error' },
    styles: { 
      backgroundColor: '#fee2e2',
      border: '1px solid #ef4444',
      borderLeft: '4px solid #ef4444',
      color: '#991b1b',
      padding: '16px 20px',
      borderRadius: '8px',
      fontSize: '14px',
      lineHeight: '1.5',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: '0 2px 4px rgba(239, 68, 68, 0.1)'
    }
  },
  {
    id: 'alert-warning',
    type: 'alert',
    category: 'feedback',
    name: 'Уведомление (Предупреждение)',
    description: 'Предупреждение',
    icon: '⚠️',
    content: 'Внимание! Пожалуйста, проверьте введенные данные перед отправкой формы.',
    x: 0,
    y: 0,
    width: 420,
    height: 72,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { type: 'warning' },
    styles: { 
      backgroundColor: '#fef3c7',
      border: '1px solid #f59e0b',
      borderLeft: '4px solid #f59e0b',
      color: '#92400e',
      padding: '16px 20px',
      borderRadius: '8px',
      fontSize: '14px',
      lineHeight: '1.5',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: '0 2px 4px rgba(245, 158, 11, 0.1)'
    }
  },
  {
    id: 'alert-info',
    type: 'alert',
    category: 'feedback',
    name: 'Уведомление (Информация)',
    description: 'Информационное уведомление',
    icon: 'ℹ️',
    content: 'Новое обновление доступно! Обновите приложение для получения последних функций.',
    x: 0,
    y: 0,
    width: 420,
    height: 72,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { type: 'info' },
    styles: { 
      backgroundColor: '#dbeafe',
      border: '1px solid #3b82f6',
      borderLeft: '4px solid #3b82f6',
      color: '#1e40af',
      padding: '16px 20px',
      borderRadius: '8px',
      fontSize: '14px',
      lineHeight: '1.5',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: '0 2px 4px rgba(59, 130, 246, 0.1)'
    }
  },
  {
    id: 'progress',
    type: 'progress',
    category: 'feedback',
    name: 'Прогресс-бар',
    description: 'Индикатор прогресса',
    icon: '📊',
    content: '',
    x: 0,
    y: 0,
    width: 400,
    height: 24,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: { value: 65, max: 100 },
    styles: { 
      backgroundColor: '#e5e7eb',
      borderRadius: '12px',
      overflow: 'hidden',
      height: '24px',
      position: 'relative',
      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)'
    }
  },
  {
    id: 'spinner',
    type: 'spinner',
    category: 'feedback',
    name: 'Спиннер',
    description: 'Индикатор загрузки',
    icon: '⏳',
    content: '',
    x: 0,
    y: 0,
    width: 48,
    height: 48,
    zIndex: 1,
    opacity: 1,
    locked: false,
    visible: true,
    props: {},
    styles: { 
      border: '4px solid #e5e7eb',
      borderTop: '4px solid #3b82f6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      width: '48px',
      height: '48px',
      display: 'inline-block'
    }
  }
];

// Готовые шаблоны
const templates: ElementTemplate[] = [
  {
    id: 'hero-section',
    name: 'Hero секция',
    description: 'Главная секция с заголовком и кнопкой',
    category: 'templates',
    thumbnail: '🎯',
    tags: ['hero', 'landing', 'cta'],
    elements: [
      {
        id: 'hero-title',
        type: 'header',
        category: 'basic',
        name: 'Hero заголовок',
        description: '',
        icon: '📝',
        content: 'Добро пожаловать!',
        x: 0,
        y: 0,
        width: 500,
        height: 60,
        zIndex: 1,
        opacity: 1,
        locked: false,
        visible: true,
        props: { level: 1 },
        styles: { ...defaultStyles.header, fontSize: '48px', textAlign: 'center' }
      },
      {
        id: 'hero-subtitle',
        type: 'text',
        category: 'basic',
        name: 'Hero подзаголовок',
        description: '',
        icon: '📄',
        content: 'Создавайте удивительные веб-сайты с помощью нашего конструктора',
        x: 0,
        y: 80,
        width: 500,
        height: 60,
        zIndex: 1,
        opacity: 1,
        locked: false,
        visible: true,
        props: {},
        styles: { ...defaultStyles.text, fontSize: '18px', textAlign: 'center' }
      },
      {
        id: 'hero-button',
        type: 'button',
        category: 'basic',
        name: 'Hero кнопка',
        description: '',
        icon: '🔘',
        content: 'Начать',
        x: 200,
        y: 160,
        width: 100,
        height: 50,
        zIndex: 1,
        opacity: 1,
        locked: false,
        visible: true,
        props: { variant: 'primary' },
        styles: { ...defaultStyles.button, fontSize: '16px', padding: '12px 24px' }
      }
    ]
  },
  {
    id: 'contact-form',
    name: 'Контактная форма',
    description: 'Готовая форма обратной связи',
    category: 'templates',
    thumbnail: '📧',
    tags: ['form', 'contact', 'feedback'],
    elements: [
      {
        id: 'form-title',
        type: 'header',
        category: 'basic',
        name: 'Заголовок формы',
        description: '',
        icon: '📝',
        content: 'Свяжитесь с нами',
        x: 0,
        y: 0,
        width: 300,
        height: 40,
        zIndex: 1,
        opacity: 1,
        locked: false,
        visible: true,
        props: { level: 2 },
        styles: { ...defaultStyles.header, fontSize: '24px' }
      },
      {
        id: 'form-name',
        type: 'input',
        category: 'forms',
        name: 'Поле имени',
        description: '',
        icon: '📝',
        content: '',
        x: 0,
        y: 60,
        width: 300,
        height: 40,
        zIndex: 1,
        opacity: 1,
        locked: false,
        visible: true,
        props: { type: 'text', placeholder: 'Ваше имя' },
        styles: defaultStyles.input
      },
      {
        id: 'form-email',
        type: 'input',
        category: 'forms',
        name: 'Поле email',
        description: '',
        icon: '📧',
        content: '',
        x: 0,
        y: 120,
        width: 300,
        height: 40,
        zIndex: 1,
        opacity: 1,
        locked: false,
        visible: true,
        props: { type: 'email', placeholder: 'Ваш email' },
        styles: defaultStyles.input
      },
      {
        id: 'form-message',
        type: 'textarea',
        category: 'forms',
        name: 'Поле сообщения',
        description: '',
        icon: '📄',
        content: '',
        x: 0,
        y: 180,
        width: 300,
        height: 100,
        zIndex: 1,
        opacity: 1,
        locked: false,
        visible: true,
        props: { placeholder: 'Ваше сообщение...', rows: 4 },
        styles: { ...defaultStyles.input, resize: 'vertical' }
      },
      {
        id: 'form-submit',
        type: 'button',
        category: 'basic',
        name: 'Кнопка отправки',
        description: '',
        icon: '🔘',
        content: 'Отправить',
        x: 0,
        y: 300,
        width: 100,
        height: 40,
        zIndex: 1,
        opacity: 1,
        locked: false,
        visible: true,
        props: { variant: 'primary' },
        styles: defaultStyles.button
      }
    ]
  }
];

// Полная библиотека элементов
export const elementLibrary: ElementLibrary = {
  categories: {
    basic: {
      name: 'Базовые',
      description: 'Основные элементы интерфейса',
      icon: '🔧',
      elements: basicElements
    },
    forms: {
      name: 'Формы',
      description: 'Элементы форм и ввода данных',
      icon: '📝',
      elements: formElements
    },
    navigation: {
      name: 'Навигация',
      description: 'Элементы навигации и меню',
      icon: '🧭',
      elements: navigationElements
    },
    media: {
      name: 'Медиа',
      description: 'Изображения, видео и аудио',
      icon: '🎥',
      elements: mediaElements
    },
    content: {
      name: 'Контент',
      description: 'Блоки контента и информации',
      icon: '📄',
      elements: contentElements
    },
    layout: {
      name: 'Макет',
      description: 'Компоненты для построения макета',
      icon: '📐',
      elements: layoutElements
    },
    data: {
      name: 'Данные',
      description: 'Таблицы, графики и диаграммы',
      icon: '📊',
      elements: dataElements
    },
    feedback: {
      name: 'Обратная связь',
      description: 'Уведомления и индикаторы состояния',
      icon: '💬',
      elements: feedbackElements
    },
    templates: {
      name: 'Шаблоны',
      description: 'Готовые наборы элементов',
      icon: '🎨',
      elements: []
    }
  },
  templates
};

// Функция для получения элементов по категории
export const getElementsByCategory = (category: ElementCategory): VisualElement[] => {
  return elementLibrary.categories[category]?.elements || [];
};

// Функция для поиска элементов
export const searchElements = (query: string): VisualElement[] => {
  const allElements = Object.values(elementLibrary.categories)
    .flatMap(category => category.elements);
  
  return allElements.filter(element => 
    element.name.toLowerCase().includes(query.toLowerCase()) ||
    element.description.toLowerCase().includes(query.toLowerCase()) ||
    element.type.toLowerCase().includes(query.toLowerCase())
  );
};

// Функция для получения шаблонов
export const getTemplates = (): ElementTemplate[] => {
  return elementLibrary.templates;
};

export default elementLibrary;
