import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  // Основные иконки
  Eye,
  User,
  Mail,
  Phone,
  Settings,
  Menu,
  X,
  CheckCircle,
  ArrowRight,
  Play,
  Sparkles,
  Info,
  Shield,
  Globe,
  Edit3,
  Layers,
  Clock,
  Zap,
  Target,
  Rocket,
  Star,
  Mic,
  Brain,
  Users,
  // Дополнительные иконки для демонстрации
  Home,
  Search,
  Bell,
  Heart,
  Share2,
  Download,
  Upload,
  Trash2,
  Edit,
  Save,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Вспомогательный компонент для отображения цвета
const ColorSwatch = ({
  name,
  value,
  description,
  foregroundVar,
}: {
  name: string;
  value: string;
  description?: string;
  foregroundVar?: string;
}) => {
  const [computedColor, setComputedColor] = React.useState<string>("");
  const [computedForeground, setComputedForeground] = React.useState<string>("");

  React.useEffect(() => {
    // Вычисляем основной цвет
    if (value.startsWith("var(")) {
      // Извлекаем имя CSS переменной: var(--primary) -> --primary
      const cssVarName = value.replace(/var\(|\)/g, "").trim();
      const root = document.documentElement;
      const computed = getComputedStyle(root).getPropertyValue(cssVarName).trim();
      // Если цвет вычислен успешно, используем его, иначе используем саму переменную
      setComputedColor(computed || value);
    } else {
      setComputedColor(value);
    }

    // Вычисляем foreground цвет, если указан
    if (foregroundVar) {
      if (foregroundVar.startsWith("var(")) {
        const fgVarName = foregroundVar.replace(/var\(|\)/g, "").trim();
        const root = document.documentElement;
        const computedFg = getComputedStyle(root).getPropertyValue(fgVarName).trim();
        setComputedForeground(computedFg || foregroundVar);
      } else {
        setComputedForeground(foregroundVar);
      }
    }
  }, [value, foregroundVar]);

  // Используем inline style для применения вычисленных цветов
  // Если цвет еще не вычислен, используем CSS переменную напрямую
  const backgroundColor = computedColor || value;
  const textColor = computedForeground || foregroundVar || "var(--foreground)";
  
  const swatchStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
    color: textColor,
  };

  return (
    <div className="space-y-2">
      {/* Визуальный блок с цветом */}
      <div
        className="w-full h-32 rounded-lg border border-border shadow-md flex items-center justify-center p-4 transition-all hover:shadow-lg"
        style={swatchStyle}
      >
        <p className="font-semibold text-sm text-center break-words">
          {name}
        </p>
      </div>
      
      {/* Подпись под блоком */}
      <div className="space-y-1">
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        <p className="text-xs font-mono text-muted-foreground break-all">
          {value}
        </p>
        {computedColor && computedColor !== value && (
          <p className="text-xs font-mono text-muted-foreground break-all">
            {computedColor}
          </p>
        )}
      </div>
    </div>
  );
};

// Компонент для демонстрации типографики
const TypographySample = ({
  name,
  className,
  sample = "Sample Text",
}: {
  name: string;
  className: string;
  sample?: string;
}) => {
  return (
    <div className="space-y-2">
      <p className="text-xs font-mono text-muted-foreground">{name}</p>
      <p className={className}>{sample}</p>
      <p className="text-xs text-muted-foreground">
        {className.split(" ").join(" ")}
      </p>
    </div>
  );
};

export default function DesignSystemPage() {
  // Список иконок для демонстрации
  const iconList = [
    { name: "Eye", icon: Eye },
    { name: "User", icon: User },
    { name: "Mail", icon: Mail },
    { name: "Phone", icon: Phone },
    { name: "Settings", icon: Settings },
    { name: "Menu", icon: Menu },
    { name: "X", icon: X },
    { name: "CheckCircle", icon: CheckCircle },
    { name: "ArrowRight", icon: ArrowRight },
    { name: "Play", icon: Play },
    { name: "Sparkles", icon: Sparkles },
    { name: "Info", icon: Info },
    { name: "Shield", icon: Shield },
    { name: "Globe", icon: Globe },
    { name: "Edit3", icon: Edit3 },
    { name: "Layers", icon: Layers },
    { name: "Clock", icon: Clock },
    { name: "Zap", icon: Zap },
    { name: "Target", icon: Target },
    { name: "Rocket", icon: Rocket },
    { name: "Star", icon: Star },
    { name: "Mic", icon: Mic },
    { name: "Brain", icon: Brain },
    { name: "Users", icon: Users },
    { name: "Home", icon: Home },
    { name: "Search", icon: Search },
    { name: "Bell", icon: Bell },
    { name: "Heart", icon: Heart },
    { name: "Share2", icon: Share2 },
    { name: "Download", icon: Download },
    { name: "Upload", icon: Upload },
    { name: "Trash2", icon: Trash2 },
    { name: "Edit", icon: Edit },
    { name: "Save", icon: Save },
    { name: "Plus", icon: Plus },
    { name: "Minus", icon: Minus },
    { name: "ChevronDown", icon: ChevronDown },
    { name: "ChevronUp", icon: ChevronUp },
    { name: "ChevronLeft", icon: ChevronLeft },
    { name: "ChevronRight", icon: ChevronRight },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Заголовок страницы */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            Design System
          </h1>
          <p className="text-lg text-muted-foreground">
            Справочная страница всех визуальных элементов дизайна приложения
          </p>
        </div>

        {/* Секция: Цвета */}
        <section className="mb-16" id="colors">
          <h2 className="text-3xl font-semibold mb-6">Цвета (Color Palette)</h2>

          {/* Основные цвета */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Основные цвета</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <ColorSwatch
                name="Primary"
                value="var(--primary)"
                description="Основной цвет бренда"
                foregroundVar="var(--primary-foreground)"
              />
              <ColorSwatch
                name="Primary Foreground"
                value="var(--primary-foreground)"
                description="Текст на primary"
                foregroundVar="var(--primary)"
              />
              <ColorSwatch
                name="Secondary"
                value="var(--secondary)"
                description="Вторичный цвет"
                foregroundVar="var(--secondary-foreground)"
              />
              <ColorSwatch
                name="Secondary Foreground"
                value="var(--secondary-foreground)"
                description="Текст на secondary"
                foregroundVar="var(--secondary)"
              />
              <ColorSwatch
                name="Destructive"
                value="var(--destructive)"
                description="Цвет ошибок и удаления"
                foregroundVar="var(--destructive-foreground)"
              />
              <ColorSwatch
                name="Destructive Foreground"
                value="var(--destructive-foreground)"
                description="Текст на destructive"
                foregroundVar="var(--destructive)"
              />
            </div>
          </div>

          {/* Нейтральные цвета */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Нейтральные цвета</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <ColorSwatch
                name="Background"
                value="var(--background)"
                description="Фон страницы"
                foregroundVar="var(--foreground)"
              />
              <ColorSwatch
                name="Foreground"
                value="var(--foreground)"
                description="Основной текст"
                foregroundVar="var(--background)"
              />
              <ColorSwatch
                name="Muted"
                value="var(--muted)"
                description="Приглушенный фон"
                foregroundVar="var(--muted-foreground)"
              />
              <ColorSwatch
                name="Muted Foreground"
                value="var(--muted-foreground)"
                description="Приглушенный текст"
                foregroundVar="var(--muted)"
              />
              <ColorSwatch
                name="Accent"
                value="var(--accent)"
                description="Акцентный фон"
                foregroundVar="var(--accent-foreground)"
              />
              <ColorSwatch
                name="Accent Foreground"
                value="var(--accent-foreground)"
                description="Акцентный текст"
                foregroundVar="var(--accent)"
              />
            </div>
          </div>

          {/* Границы и инпуты */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Границы и формы</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <ColorSwatch
                name="Border"
                value="var(--border)"
                description="Цвет границ"
                foregroundVar="var(--foreground)"
              />
              <ColorSwatch
                name="Input"
                value="var(--input)"
                description="Граница инпута"
                foregroundVar="var(--foreground)"
              />
              <ColorSwatch
                name="Input Background"
                value="var(--input-background)"
                description="Фон инпута"
                foregroundVar="var(--foreground)"
              />
              <ColorSwatch
                name="Ring"
                value="var(--ring)"
                description="Цвет фокуса"
                foregroundVar="var(--foreground)"
              />
              <ColorSwatch
                name="Card"
                value="var(--card)"
                description="Фон карточки"
                foregroundVar="var(--card-foreground)"
              />
              <ColorSwatch
                name="Card Foreground"
                value="var(--card-foreground)"
                description="Текст в карточке"
                foregroundVar="var(--card)"
              />
            </div>
          </div>
        </section>

        {/* Секция: Типографика */}
        <section className="mb-16" id="typography">
          <h2 className="text-3xl font-semibold mb-6">Типографика (Typography)</h2>

          {/* Заголовки */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Заголовки</h3>
            <div className="space-y-6">
              <TypographySample
                name="Heading 1 (h1)"
                className="text-4xl font-semibold"
                sample="Заголовок первого уровня"
              />
              <TypographySample
                name="Heading 2 (h2)"
                className="text-3xl font-semibold"
                sample="Заголовок второго уровня"
              />
              <TypographySample
                name="Heading 3 (h3)"
                className="text-2xl font-semibold"
                sample="Заголовок третьего уровня"
              />
              <TypographySample
                name="Heading 4 (h4)"
                className="text-xl font-semibold"
                sample="Заголовок четвертого уровня"
              />
              <TypographySample
                name="Heading 5 (h5)"
                className="text-lg font-semibold"
                sample="Заголовок пятого уровня"
              />
              <TypographySample
                name="Heading 6 (h6)"
                className="text-base font-semibold"
                sample="Заголовок шестого уровня"
              />
            </div>
          </div>

          {/* Текст */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Текст</h3>
            <div className="space-y-6">
              <TypographySample
                name="Body Large"
                className="text-lg"
                sample="Основной текст большого размера для важной информации"
              />
              <TypographySample
                name="Body (Base)"
                className="text-base"
                sample="Основной текст стандартного размера для обычного контента"
              />
              <TypographySample
                name="Body Small"
                className="text-sm"
                sample="Мелкий текст для дополнительной информации"
              />
              <TypographySample
                name="Caption"
                className="text-xs text-muted-foreground"
                sample="Подпись или вспомогательный текст"
              />
            </div>
          </div>

          {/* Начертания */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Начертания (Font Weight)</h3>
            <div className="space-y-4">
              <TypographySample
                name="Normal (400)"
                className="text-base font-normal"
                sample="Обычное начертание"
              />
              <TypographySample
                name="Medium (500)"
                className="text-base font-medium"
                sample="Среднее начертание"
              />
              <TypographySample
                name="Semibold (600)"
                className="text-base font-semibold"
                sample="Полужирное начертание"
              />
            </div>
          </div>

          {/* Шрифты */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Шрифты</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">Sans-serif (Основной)</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      var(--font-sans) / ui-sans-serif, system-ui, sans-serif
                    </p>
                    <p className="mt-2">
                      Используется для основного текста, заголовков и интерфейса
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Monospace</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      var(--font-mono) / ui-monospace, SFMono-Regular, Menlo, Monaco
                    </p>
                    <p className="mt-2 font-mono">
                      Используется для кода, технических данных и HEX-значений
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Секция: Иконки */}
        <section className="mb-16" id="icons">
          <h2 className="text-3xl font-semibold mb-6">Иконки (Icons)</h2>
          <p className="text-muted-foreground mb-6">
            Библиотека: lucide-react. Все иконки имеют размер по умолчанию 24px (w-6 h-6)
          </p>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
            {iconList.map(({ name, icon: Icon }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <Icon className="w-6 h-6" />
                <p className="text-xs text-center text-muted-foreground">{name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Секция: Кнопки */}
        <section className="mb-16" id="buttons">
          <h2 className="text-3xl font-semibold mb-6">Кнопки (Buttons)</h2>

          {/* Варианты */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Варианты (Variants)</h3>
            <div className="flex flex-wrap gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Default</p>
                <Button variant="default">Кнопка</Button>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Secondary</p>
                <Button variant="secondary">Кнопка</Button>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Outline</p>
                <Button variant="outline">Кнопка</Button>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Ghost</p>
                <Button variant="ghost">Кнопка</Button>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Link</p>
                <Button variant="link">Кнопка</Button>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Destructive</p>
                <Button variant="destructive">Удалить</Button>
              </div>
            </div>
          </div>

          {/* Размеры */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Размеры (Sizes)</h3>
            <div className="flex flex-wrap items-end gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Small</p>
                <Button size="sm">Маленькая</Button>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Default</p>
                <Button size="default">Обычная</Button>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Large</p>
                <Button size="lg">Большая</Button>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Icon</p>
                <Button size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Состояния */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Состояния (States)</h3>
            <div className="flex flex-wrap gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Normal</p>
                <Button>Обычная</Button>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Disabled</p>
                <Button disabled>Отключена</Button>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">With Icon</p>
                <Button>
                  <Star className="w-4 h-4 mr-2" />
                  С иконкой
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Секция: Формы */}
        <section className="mb-16" id="forms">
          <h2 className="text-3xl font-semibold mb-6">Формы (Forms)</h2>

          {/* Input */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Input (Текстовое поле)</h3>
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <label className="text-sm font-medium">Обычное поле</label>
                <Input placeholder="Введите текст..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">С ошибкой</label>
                <Input
                  placeholder="Некорректное значение"
                  aria-invalid="true"
                  defaultValue="неправильное значение"
                />
                <p className="text-xs text-destructive">
                  Поле содержит ошибку
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Disabled</label>
                <Input placeholder="Отключено" disabled />
              </div>
            </div>
          </div>

          {/* Textarea */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Textarea (Многострочное поле)</h3>
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <label className="text-sm font-medium">Обычное поле</label>
                <Textarea placeholder="Введите многострочный текст..." rows={4} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">С ошибкой</label>
                <Textarea
                  placeholder="Некорректное значение"
                  aria-invalid="true"
                  rows={4}
                />
                <p className="text-xs text-destructive">
                  Поле содержит ошибку
                </p>
              </div>
            </div>
          </div>

          {/* Select */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Select (Выпадающий список)</h3>
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <label className="text-sm font-medium">Обычный select</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите опцию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Опция 1</SelectItem>
                    <SelectItem value="option2">Опция 2</SelectItem>
                    <SelectItem value="option3">Опция 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Checkbox */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Checkbox (Чекбокс)</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Checkbox id="checkbox1" />
                <label htmlFor="checkbox1" className="text-sm">
                  Не выбран
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="checkbox2" defaultChecked />
                <label htmlFor="checkbox2" className="text-sm">
                  Выбран
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="checkbox3" disabled />
                <label htmlFor="checkbox3" className="text-sm text-muted-foreground">
                  Отключен
                </label>
              </div>
            </div>
          </div>

          {/* Radio */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Radio (Радиокнопка)</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Выберите опцию</label>
                <RadioGroup defaultValue="option1">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="option1" id="radio1" />
                    <label htmlFor="radio1" className="text-sm">
                      Опция 1
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="option2" id="radio2" />
                    <label htmlFor="radio2" className="text-sm">
                      Опция 2
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="option3" id="radio3" />
                    <label htmlFor="radio3" className="text-sm">
                      Опция 3
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Пример формы */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Пример формы</h3>
            <Card className="max-w-md">
              <CardHeader>
                <CardTitle>Контактная форма</CardTitle>
                <CardDescription>
                  Пример использования всех элементов формы
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Имя</label>
                  <Input placeholder="Ваше имя" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Сообщение</label>
                  <Textarea placeholder="Ваше сообщение..." rows={4} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Категория</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="support">Поддержка</SelectItem>
                      <SelectItem value="sales">Продажи</SelectItem>
                      <SelectItem value="other">Другое</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="agree" />
                  <label htmlFor="agree" className="text-sm">
                    Согласен с условиями
                  </label>
                </div>
                <Button className="w-full">Отправить</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Секция: Контейнеры и блоки */}
        <section className="mb-16" id="containers">
          <h2 className="text-3xl font-semibold mb-6">
            Контейнеры и блоки (Cards / Sections)
          </h2>

          {/* Card */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Card (Карточка)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Заголовок карточки</CardTitle>
                  <CardDescription>
                    Описание карточки с дополнительной информацией
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Содержимое карточки. Здесь может быть любой контент: текст,
                    изображения, формы и другие элементы.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Карточка с действием</CardTitle>
                  <CardDescription>Пример карточки с кнопкой</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Карточка может содержать различные элементы интерфейса.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm">Действие 1</Button>
                    <Button size="sm" variant="outline">
                      Действие 2
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Badge */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Badge (Значок)</h3>
            <div className="flex flex-wrap gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Default</p>
                <Badge>Значок</Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Secondary</p>
                <Badge variant="secondary">Вторичный</Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Outline</p>
                <Badge variant="outline">Контур</Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Destructive</p>
                <Badge variant="destructive">Ошибка</Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">With Icon</p>
                <Badge>
                  <Star className="w-3 h-3" />
                  С иконкой
                </Badge>
              </div>
            </div>
          </div>

          {/* Layout примеры */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Примеры компоновки</h3>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Заголовок секции</CardTitle>
                      <CardDescription>
                        Описание секции с дополнительной информацией
                      </CardDescription>
                    </div>
                    <Badge>Новое</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="p-4 border rounded-lg bg-muted/50"
                      >
                        <p className="text-sm font-medium mb-2">
                          Элемент {i}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Описание элемента
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Футер страницы */}
        <div className="mt-16 pt-8 border-t">
          <p className="text-sm text-muted-foreground text-center">
            Design System — справочная страница для дизайнеров и разработчиков
          </p>
        </div>
      </div>
    </div>
  );
}

