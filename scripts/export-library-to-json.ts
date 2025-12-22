// Скрипт для экспорта библиотеки визуальных элементов в JSON
import { elementLibrary } from '../src/lib/visualElementLibrary';
import { defaultStyles } from '../src/types/visualElements';
import * as fs from 'fs';
import * as path from 'path';

const outputPath = path.join(__dirname, '..', 'visual-element-library.json');

// Преобразуем библиотеку в JSON-совместимый формат
const libraryJSON = {
  version: "1.0.0",
  lastUpdated: new Date().toISOString(),
  metadata: {
    totalCategories: Object.keys(elementLibrary.categories).length,
    totalElements: Object.values(elementLibrary.categories).reduce(
      (sum, cat) => sum + cat.elements.length, 0
    ),
    totalTemplates: elementLibrary.templates.length
  },
  defaultStyles,
  categories: elementLibrary.categories,
  templates: elementLibrary.templates
};

// Сохраняем в JSON файл
fs.writeFileSync(
  outputPath,
  JSON.stringify(libraryJSON, null, 2),
  'utf8'
);

console.log(`✅ Библиотека визуальных элементов экспортирована в: ${outputPath}`);
console.log(`📊 Статистика:`);
console.log(`   - Категорий: ${libraryJSON.metadata.totalCategories}`);
console.log(`   - Элементов: ${libraryJSON.metadata.totalElements}`);
console.log(`   - Шаблонов: ${libraryJSON.metadata.totalTemplates}`);

