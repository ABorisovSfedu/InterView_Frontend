import React, { useState } from "react";
import { elementLibrary, getElementsByCategory } from "../lib/visualElementLibrary";
import { ElementCategory, VisualElement, ElementTemplate } from "../types/visualElements";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

// Компонент для рендеринга отдельного элемента
const ElementPreview = ({ element }: { element: VisualElement }) => {
  const renderElement = () => {
    // Определяем, нужно ли делать элемент полноразмерным
    const isFullWidthElement = ['header-site', 'footer-site', 'features', 'testimonials', 'pricing', 'team', 'faq', 'stats', 'newsletter', 'cta', 'navbar'].includes(element.type);
    
    const style: React.CSSProperties = {
      ...element.styles,
      // Для полноразмерных элементов используем 100% ширины и высоты
      width: isFullWidthElement ? '100%' : (element.width || 'auto'),
      height: isFullWidthElement ? '100%' : (element.height || 'auto'),
      minHeight: isFullWidthElement ? '200px' : (element.height || 'auto'),
      opacity: element.opacity,
      position: 'relative' as const,
      boxSizing: 'border-box' as const,
    };

    switch (element.type) {
      case 'header':
        const HeaderTag = `h${element.props?.level || 1}` as keyof JSX.IntrinsicElements;
        return (
          <HeaderTag style={style}>
            {element.content || `Заголовок H${element.props?.level || 1}`}
          </HeaderTag>
        );

      case 'text':
      case 'paragraph':
        return (
          <p style={style}>
            {element.content || 'Текстовый параграф'}
          </p>
        );

      case 'button':
        return (
          <button style={style}>
            {element.content || 'Кнопка'}
          </button>
        );

      case 'input':
        return (
          <input
            type={element.props?.type || 'text'}
            placeholder={element.props?.placeholder || 'Введите текст...'}
            style={style}
            disabled
          />
        );

      case 'textarea':
        return (
          <textarea
            placeholder={element.props?.placeholder || 'Введите текст...'}
            rows={element.props?.rows || 4}
            style={style}
            disabled
          />
        );

      case 'select':
        return (
          <select style={style} disabled>
            <option>{element.content || 'Выберите опцию'}</option>
            {element.props?.options?.map((opt: string, i: number) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <label style={style}>
            <input
              type="checkbox"
              checked={element.props?.checked || false}
              disabled
              style={{ marginRight: '8px' }}
            />
            {element.content || 'Чекбокс'}
          </label>
        );

      case 'radio':
        return (
          <label style={style}>
            <input
              type="radio"
              name={element.props?.name || 'radio'}
              value={element.props?.value || 'option1'}
              disabled
              style={{ marginRight: '8px' }}
            />
            {element.content || 'Радиокнопка'}
          </label>
        );

      case 'image':
        return (
          <div
            style={{
              ...style,
              backgroundColor: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed #d1d5db',
            }}
          >
            <span style={{ color: '#9ca3af' }}>🖼️ {element.content || 'Изображение'}</span>
          </div>
        );

      case 'video':
        return (
          <div
            style={{
              ...style,
              backgroundColor: '#1f2937',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #374151',
            }}
          >
            <span style={{ color: '#9ca3af' }}>▶️ {element.content || 'Видео'}</span>
          </div>
        );

      case 'divider':
        return (
          <hr style={style} />
        );

      case 'navbar':
        return (
          <nav style={style}>
            {element.props?.links?.map((link: string, i: number) => (
              <span key={i} style={{ marginRight: '16px' }}>
                {link}
              </span>
            )) || element.content}
          </nav>
        );

      case 'breadcrumb':
        return (
          <nav style={style}>
            {element.content || 'Главная > Раздел > Подраздел'}
          </nav>
        );

      case 'card':
        return (
          <div style={style}>
            {element.content || 'Содержимое карточки'}
          </div>
        );

      case 'list':
        const ListTag = element.props?.ordered ? 'ol' : 'ul';
        return (
          <ListTag style={style}>
            {element.props?.items?.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            )) || (
              <>
                <li>Элемент списка 1</li>
                <li>Элемент списка 2</li>
                <li>Элемент списка 3</li>
              </>
            )}
          </ListTag>
        );

      case 'table':
        return (
          <table style={style}>
            <thead>
              <tr>
                {element.props?.headers?.map((header: string, i: number) => (
                  <th key={i} style={{ padding: '8px', border: '1px solid #e5e7eb' }}>
                    {header}
                  </th>
                )) || (
                  <>
                    <th style={{ padding: '8px', border: '1px solid #e5e7eb' }}>Колонка 1</th>
                    <th style={{ padding: '8px', border: '1px solid #e5e7eb' }}>Колонка 2</th>
                    <th style={{ padding: '8px', border: '1px solid #e5e7eb' }}>Колонка 3</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              <tr>
                {element.props?.headers?.map((_: string, i: number) => (
                  <td key={i} style={{ padding: '8px', border: '1px solid #e5e7eb' }}>
                    Данные {i + 1}
                  </td>
                )) || (
                  <>
                    <td style={{ padding: '8px', border: '1px solid #e5e7eb' }}>Данные 1</td>
                    <td style={{ padding: '8px', border: '1px solid #e5e7eb' }}>Данные 2</td>
                    <td style={{ padding: '8px', border: '1px solid #e5e7eb' }}>Данные 3</td>
                  </>
                )}
              </tr>
            </tbody>
          </table>
        );

      case 'alert':
      case 'notification':
        return (
          <div style={style}>
            {element.content || 'Уведомление'}
          </div>
        );

      case 'container':
      case 'section':
        return (
          <div style={style}>
            {element.content || 'Секция контента'}
          </div>
        );

      case 'grid':
        return (
          <div
            style={{
              ...style,
              display: 'grid',
              gridTemplateColumns: `repeat(${element.props?.columns || 3}, 1fr)`,
              gap: element.props?.gap || '16px',
            }}
          >
            {Array.from({ length: element.props?.columns || 3 }).map((_, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#f3f4f6',
                  padding: '16px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                }}
              >
                Ячейка {i + 1}
              </div>
            ))}
          </div>
        );

      case 'flex':
        return (
          <div
            style={{
              ...style,
              display: 'flex',
              flexDirection: element.props?.direction || 'row',
              gap: element.props?.gap || '16px',
            }}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#f3f4f6',
                  padding: '16px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                }}
              >
                Элемент {i + 1}
              </div>
            ))}
          </div>
        );

      case 'header-site':
        const headerLogo = element.props?.logo || 'Логотип';
        const headerLinks = element.props?.links || ['Главная', 'О нас', 'Услуги', 'Контакты'];
        return (
          <div style={style}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', color: style.color || '#1f2937' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: style.color || '#1f2937' }}>{headerLogo}</div>
              <nav style={{ display: 'flex', gap: '20px' }}>
                {headerLinks.map((link: string, idx: number) => (
                  <a key={idx} href="#" style={{ textDecoration: 'none', color: style.color || '#1f2937' }}>{link}</a>
                ))}
              </nav>
              {element.props?.showButton && (
                <button style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '500' }}>
                  Войти
                </button>
              )}
            </div>
          </div>
        );

      case 'footer-site':
        const footerColumns = element.props?.columns || [];
        const copyright = element.props?.copyright || '© 2024 Компания. Все права защищены.';
        return (
          <div style={style}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginBottom: '30px' }}>
              {footerColumns.map((col: any, idx: number) => (
                <div key={idx}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>{col.title}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {col.links.map((link: string, linkIdx: number) => (
                      <li key={linkIdx} style={{ marginBottom: '8px' }}>
                        <a href="#" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '20px', textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
              {copyright}
            </div>
          </div>
        );

      case 'features':
        const featuresItems = element.props?.items || [];
        return (
          <div style={style}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', color: style.color || '#1f2937' }}>
              {featuresItems.map((item: any, idx: number) => (
                <div key={idx} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon || '⭐'}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: style.color || '#1f2937' }}>{item.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '14px' }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'testimonials':
        const testimonialsItems = element.props?.items || [];
        return (
          <div style={style}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', color: style.color || '#1f2937' }}>
              {testimonialsItems.map((item: any, idx: number) => (
                <div key={idx} style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', color: '#1f2937' }}>
                  <p style={{ fontStyle: 'italic', marginBottom: '12px', color: '#374151' }}>"{item.text}"</p>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#1f2937' }}>{item.author}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>{item.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'pricing':
        const pricingPlans = element.props?.plans || [];
        return (
          <div style={style}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', color: style.color || '#1f2937' }}>
              {pricingPlans.map((plan: any, idx: number) => (
                <div 
                  key={idx} 
                  style={{ 
                    backgroundColor: '#ffffff', 
                    padding: '24px', 
                    borderRadius: '8px', 
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    border: plan.featured ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                    color: '#1f2937'
                  }}
                >
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>{plan.name}</h3>
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937' }}>{plan.price}</span>
                    <span style={{ color: '#6b7280' }}>{plan.period}</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px' }}>
                    {plan.features.map((feature: string, fIdx: number) => (
                      <li key={fIdx} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: '#374151' }}>
                        <span style={{ color: '#10b981' }}>✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button style={{ 
                    width: '100%', 
                    padding: '12px', 
                    borderRadius: '6px', 
                    border: 'none',
                    backgroundColor: plan.featured ? '#3b82f6' : '#f3f4f6',
                    color: plan.featured ? 'white' : '#374151',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                    Выбрать план
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'team':
        const teamMembers = element.props?.members || [];
        return (
          <div style={style}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', color: style.color || '#1f2937' }}>
              {teamMembers.map((member: any, idx: number) => (
                <div key={idx} style={{ textAlign: 'center' }}>
                  <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                    borderRadius: '50%', 
                    margin: '0 auto 16px' 
                  }}></div>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px', color: style.color || '#1f2937' }}>{member.name}</h3>
                  <p style={{ color: '#3b82f6', marginBottom: '8px', fontWeight: '500' }}>{member.role}</p>
                  <p style={{ color: '#6b7280', fontSize: '14px' }}>{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'faq':
        const faqItems = element.props?.items || [];
        return (
          <div style={style}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: style.color || '#1f2937' }}>
              {faqItems.map((item: any, idx: number) => (
                <div key={idx} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', backgroundColor: '#ffffff' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>{item.question}</h3>
                  <p style={{ color: '#6b7280' }}>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'stats':
        const statsItems = element.props?.items || [];
        return (
          <div style={style}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px', textAlign: 'center' }}>
              {statsItems.map((item: any, idx: number) => (
                <div key={idx}>
                  <div style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '8px' }}>{item.value}</div>
                  <div style={{ fontSize: '16px', opacity: 0.9 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'newsletter':
        return (
          <div style={style}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px', textAlign: 'center', color: style.color || '#1f2937' }}>
              {element.props?.title || 'Подпишитесь на нашу рассылку'}
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '20px', textAlign: 'center' }}>
              {element.props?.description || 'Получайте последние новости и обновления'}
            </p>
            <div style={{ display: 'flex', gap: '12px', maxWidth: '400px', margin: '0 auto' }}>
              <input 
                type="email" 
                placeholder="Введите ваш email"
                style={{ 
                  flex: 1, 
                  padding: '12px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: '#ffffff',
                  color: '#1f2937'
                }}
              />
              <button style={{ 
                padding: '12px 24px', 
                backgroundColor: '#3b82f6', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Подписаться
              </button>
            </div>
          </div>
        );

      case 'social-links':
        const socialLinks = element.props?.links || [];
        return (
          <div style={style}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
              {socialLinks.map((link: any, idx: number) => (
                <a 
                  key={idx} 
                  href={link.url} 
                  style={{ fontSize: '24px', textDecoration: 'none' }}
                  title={link.name}
                >
                  {link.icon || '🔗'}
                </a>
              ))}
            </div>
          </div>
        );

      case 'cta':
        return (
          <div style={style}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '12px', textAlign: 'center' }}>
              {element.props?.title || 'Готовы начать?'}
            </h2>
            <p style={{ fontSize: '18px', marginBottom: '24px', textAlign: 'center', opacity: 0.9 }}>
              {element.props?.description || 'Начните использовать наш сервис уже сегодня'}
            </p>
            <div style={{ textAlign: 'center' }}>
              <button style={{ 
                padding: '16px 32px', 
                backgroundColor: '#ffffff', 
                color: '#3b82f6', 
                border: 'none', 
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                {element.props?.buttonText || 'Начать бесплатно'}
              </button>
            </div>
          </div>
        );

      case 'map':
        return (
          <div style={style}>
            <div style={{ 
              position: 'relative', 
              width: '100%', 
              height: '100%',
              background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
              opacity: 0.2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📍</div>
                <div style={{ fontWeight: 'bold' }}>{element.props?.address || 'Адрес не указан'}</div>
              </div>
            </div>
          </div>
        );

      case 'quote':
        return (
          <div style={style}>
            <blockquote style={{ margin: 0, padding: 0, fontStyle: 'italic', fontSize: '18px' }}>
              {element.content || 'Цитата'}
            </blockquote>
            {element.props?.author && (
              <cite style={{ marginTop: '12px', display: 'block', fontStyle: 'normal' }}>
                — {element.props.author}
              </cite>
            )}
          </div>
        );

      case 'progress':
        const progressValue = element.props?.value || 0;
        const progressMax = element.props?.max || 100;
        const progressPercent = (progressValue / progressMax) * 100;
        return (
          <div style={style}>
            <div style={{ 
              width: '100%', 
              height: '100%',
              backgroundColor: '#e5e7eb',
              borderRadius: '12px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{ 
                width: `${progressPercent}%`, 
                height: '100%',
                backgroundColor: '#3b82f6',
                borderRadius: '12px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        );

      case 'accordion':
        const accordionSections = element.props?.sections || [];
        return (
          <div style={style}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {accordionSections.map((section: string, idx: number) => (
                <div key={idx} style={{ 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '6px', 
                  padding: '12px',
                  backgroundColor: '#ffffff'
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{section}</div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div style={style}>
            {element.content || element.name || 'Элемент'}
          </div>
        );
    }
  };

  const isLargeElement = ['header-site', 'footer-site', 'features', 'testimonials', 'pricing', 'team', 'faq', 'stats', 'newsletter', 'cta', 'navbar'].includes(element.type);
  
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-xs shrink-0">
                {element.icon}
              </Badge>
              <CardTitle className="text-base font-semibold truncate">{element.name}</CardTitle>
            </div>
            <CardDescription className="text-xs text-muted-foreground line-clamp-2">
              {element.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4 pt-0">
        <div className="space-y-3 flex-1 flex flex-col min-h-0">
          {/* Предпросмотр элемента - полноразмерный */}
          <div className={`border-2 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 flex-1 flex items-center justify-center overflow-hidden shadow-inner ${
            isLargeElement ? 'min-h-[300px]' : 'min-h-[150px]'
          }`}>
            <div className="w-full h-full flex items-center justify-center p-4">
              {renderElement()}
            </div>
          </div>

          {/* Метаданные элемента */}
          <div className="space-y-2 text-xs pt-2 border-t">
            <div className="flex items-center justify-between">
              <span className="font-medium text-muted-foreground">Тип:</span>
              <code className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-mono">
                {element.type}
              </code>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-muted-foreground">Размер:</span>
              <span className="text-muted-foreground font-mono">
                {element.width} × {element.height}px
              </span>
            </div>
            {Object.keys(element.props || {}).length > 0 && (
              <details className="group">
                <summary className="cursor-pointer font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Свойства ({Object.keys(element.props).length})
                </summary>
                <pre className="mt-2 text-xs bg-muted/50 p-2 rounded overflow-x-auto border max-h-32 overflow-y-auto">
                  {JSON.stringify(element.props, null, 2)}
                </pre>
              </details>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Компонент для отображения шаблона
const TemplatePreview = ({ template }: { template: ElementTemplate }) => {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-xs shrink-0">
                {template.thumbnail}
              </Badge>
              <CardTitle className="text-base font-semibold">{template.name}</CardTitle>
            </div>
            <CardDescription className="text-xs text-muted-foreground line-clamp-2">
              {template.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Теги */}
        {template.tags && template.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {template.tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="text-xs px-2 py-0.5">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Элементы шаблона */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Элементы:
            </p>
            <Badge variant="outline" className="text-xs">
              {template.elements.length}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {template.elements.slice(0, 6).map((element) => (
              <div
                key={element.id}
                className="text-xs p-2 bg-muted/50 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <div className="font-medium truncate">{element.name}</div>
                <div className="text-muted-foreground text-[10px] truncate">{element.type}</div>
              </div>
            ))}
          </div>
          {template.elements.length > 6 && (
            <p className="text-xs text-muted-foreground text-center pt-1">
              + еще {template.elements.length - 6} {template.elements.length - 6 === 1 ? 'элемент' : 'элементов'}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function VisualLibraryShowcasePage() {
  const [selectedCategory, setSelectedCategory] = useState<ElementCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Получаем все категории
  const categories = Object.keys(elementLibrary.categories) as ElementCategory[];

  // Фильтрация элементов
  const getFilteredElements = () => {
    let elements: VisualElement[] = [];

    if (selectedCategory === "all") {
      // Все элементы из всех категорий
      categories.forEach((cat) => {
        elements = [...elements, ...elementLibrary.categories[cat].elements];
      });
    } else {
      elements = elementLibrary.categories[selectedCategory].elements;
    }

    // Поиск
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      elements = elements.filter(
        (el) =>
          el.name.toLowerCase().includes(query) ||
          el.description.toLowerCase().includes(query) ||
          el.type.toLowerCase().includes(query)
      );
    }

    return elements;
  };

  const filteredElements = getFilteredElements();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Заголовок страницы */}
        <div className="mb-10 sm:mb-12 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <span>🎨</span>
            <span>Визуальная библиотека</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Библиотека визуальных элементов
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto sm:mx-0">
            Визуальная библиотека всех элементов, которые используются системой
            для автоматической генерации макетов сайтов. Все элементы доступны
            для использования в конструкторе страниц.
          </p>
        </div>

        {/* Поиск и фильтры */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Input
                placeholder="🔍 Поиск элементов по названию, описанию или типу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 text-base shadow-sm border-2 focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          {/* Категории */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className="h-9 px-4 font-medium shadow-sm hover:shadow transition-shadow"
            >
              Все ({categories.reduce((sum, cat) => sum + elementLibrary.categories[cat].elements.length, 0)})
            </Button>
            {categories.map((category) => {
              const catData = elementLibrary.categories[category];
              if (catData.elements.length === 0 && category !== "templates") return null;
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="h-9 px-4 font-medium shadow-sm hover:shadow transition-shadow"
                >
                  <span className="mr-2 text-base">{catData.icon}</span>
                  {catData.name} ({catData.elements.length})
                </Button>
              );
            })}
          </div>
        </div>

        {/* Результаты поиска */}
        {searchQuery && (
          <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-sm font-medium">
              Найдено элементов: <strong className="text-primary">{filteredElements.length}</strong>
            </p>
          </div>
        )}

        {/* Секция: Элементы */}
        {selectedCategory !== "templates" && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold">
                {selectedCategory === "all"
                  ? "Все элементы"
                  : elementLibrary.categories[selectedCategory].name}
              </h2>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {filteredElements.length} {filteredElements.length === 1 ? 'элемент' : filteredElements.length < 5 ? 'элемента' : 'элементов'}
              </Badge>
            </div>
            {filteredElements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {filteredElements.map((element) => {
                  // Для больших элементов (header-site, footer-site и т.д.) используем полную ширину
                  const isLargeElement = ['header-site', 'footer-site', 'features', 'testimonials', 'pricing', 'team', 'faq', 'stats', 'newsletter', 'cta'].includes(element.type);
                  return (
                    <div 
                      key={element.id} 
                      className={`${isLargeElement ? 'md:col-span-2 lg:col-span-3' : ''} transition-transform hover:scale-[1.02]`}
                    >
                      <ElementPreview element={element} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? "Элементы не найдены по вашему запросу"
                      : "В этой категории пока нет элементов"}
                  </p>
                </CardContent>
              </Card>
            )}
          </section>
        )}

        {/* Секция: Шаблоны */}
        {elementLibrary.templates.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Готовые шаблоны
              </h2>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {elementLibrary.templates.length} {elementLibrary.templates.length === 1 ? 'шаблон' : 'шаблонов'}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {elementLibrary.templates.map((template) => (
                <div key={template.id} className="transition-transform hover:scale-[1.02]">
                  <TemplatePreview template={template} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Статистика */}
        <section className="mt-16 pt-8 border-t-2">
          <h2 className="text-2xl font-bold mb-6 text-center">Статистика библиотеки</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="hover:shadow-lg transition-shadow border-2">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
                  {categories.reduce(
                    (sum, cat) => sum + elementLibrary.categories[cat].elements.length,
                    0
                  )}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  Всего элементов
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow border-2">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
                  {categories.length}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  Категорий
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow border-2">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
                  {elementLibrary.templates.length}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  Шаблонов
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow border-2">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
                  {new Set(filteredElements.map((el) => el.type)).size}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  Типов элементов
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}



