// Store для управления состоянием страницы
// Использует PageModel из page-engine и новые API клиенты

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { PageModel, Block, EditorMode, ComponentCatalogItem, DropZone } from '../page-engine/types';
import { convertVoiceToLayout, convertTextToLayout, VoiceToLayoutOptions, VoiceToLayoutResult } from '../flows/voiceToLayout';
import { webClient } from '../api/web';
import { mod3Client } from '../api/mod3';
import { mod2Client } from '../api/mod2';
import { debounce } from '../hooks/useDebounce';

interface PageStoreState {
  // Состояние страницы
  pageModel: PageModel | null;
  sessionId: string | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  lastSaved: string | null;
  
  // Состояние редактирования
  editorMode: EditorMode;
  selectedBlockId: string | null;
  isDirty: boolean;
  
  // Каталог компонентов
  componentCatalog: ComponentCatalogItem[];
  catalogLoading: boolean;
  
  // Состояние генерации
  isGenerating: boolean;
  generationProgress: number;
  generationStep: string | null;
  generationResult: VoiceToLayoutResult | null;
  
  // Действия базовые
  setSessionId: (sessionId: string) => void;
  setPageModel: (pageModel: PageModel) => void;
  setEditorMode: (mode: EditorMode) => void;
  loadLayout: (sessionId: string) => Promise<void>;
  saveLayout: () => Promise<void>;
  loadComponentCatalog: () => Promise<void>;
  
  // Новые действия генерации
  generateFromVoice: (audioFile: File, options?: Partial<VoiceToLayoutOptions>) => Promise<VoiceToLayoutResult>;
  generateFromText: (text: string, sessionId?: string) => Promise<VoiceToLayoutResult>;
  loadExisting: (sessionId: string) => Promise<void>;
  refreshMod3Layout: (sessionId: string) => Promise<void>;
  saveDebounced: () => void;
  
  // Управление блоками
  addBlock: (component: string, dropZone: DropZone, props?: Record<string, any>) => void;
  updateBlock: (blockId: string, updates: Partial<Block>) => void;
  removeBlock: (blockId: string) => void;
  moveBlock: (blockId: string, newLayout: DropZone) => void;
  resizeBlock: (blockId: string, newColSpan: number) => void;
  selectBlock: (blockId: string | null) => void;
  
  // Утилиты
  setLoading: (loading: boolean) => void;
  setSaving: (saving: boolean) => void;
  setError: (error: string | null) => void;
  markDirty: () => void;
  markSaved: () => void;
  reset: () => void;
  setGenerationProgress: (progress: number, step: string) => void;
}

export const usePageStore = create<PageStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        // Начальное состояние
        pageModel: null,
        sessionId: null,
        isLoading: false,
        isSaving: false,
        error: null,
        lastSaved: null,
        editorMode: 'view' as EditorMode,
        selectedBlockId: null,
        isDirty: false,
        componentCatalog: [],
        catalogLoading: false,
        isGenerating: false,
        generationProgress: 0,
        generationStep: null,
        generationResult: null,

        // Действия
        setSessionId: (sessionId: string) => {
          set({ sessionId }, false, 'setSessionId');
        },

        setPageModel: (pageModel: PageModel) => {
          set({ pageModel, isDirty: false }, false, 'setPageModel');
        },

        setEditorMode: (mode: EditorMode) => {
          set({ editorMode: mode }, false, 'setEditorMode');
        },

        loadLayout: async (sessionId: string) => {
          set({ isLoading: true, error: null }, false, 'loadLayout');
          try {
            const result = await webClient.loadLayout(sessionId);
            if (result.status === 'ok' && result.layout_data) {
              set({ 
                pageModel: result.layout_data, 
                sessionId, 
                isLoading: false, 
                isDirty: false,
                lastSaved: result.updated_at
              }, false, 'loadLayout');
            } else {
              set({ 
                error: result.error || 'Layout не найден',
                isLoading: false 
              }, false, 'loadLayout');
            }
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Ошибка загрузки данных',
              isLoading: false 
            }, false, 'loadLayout');
          }
        },

        saveLayout: async () => {
          const { pageModel, sessionId } = get();
          if (!pageModel || !sessionId) return;

          set({ isSaving: true }, false, 'saveLayout');
          try {
            const url = `/web/v1/session/${sessionId}/layout`;
            const headers = { 'Content-Type': 'application/json' };
            const body = JSON.stringify(pageModel);
            
            console.group('🔄 usePageStore.fetch [saveLayout]');
            console.log(`📍 URL: POST ${url}`);
            console.log(`📤 Headers:`, JSON.stringify(headers, null, 2));
            const bodyString = JSON.stringify(pageModel, null, 2);
            console.log(`📦 Body Type: JSON`);
            console.log(`📦 Body Size: ${bodyString.length} characters`);
            console.log(`📦 Body (полное содержимое):`);
            console.log(bodyString);
            console.log(`📦 Body (как объект):`, pageModel);
            
            const response = await fetch(url, {
              method: 'POST',
              headers,
              body
            });
            
            console.log(`📥 Status: ${response.status} ${response.statusText}`);
            
            if (!response.ok) {
              const errorText = await response.text();
              console.error('❌ Error:', errorText);
              console.groupEnd();
              throw new Error('Ошибка сохранения');
            }
            
            const result = await response.json();
            const responseString = JSON.stringify(result, null, 2);
            console.log(`✅ Response Size: ${responseString.length} characters`);
            console.log(`✅ Response data (полное содержимое):`);
            console.log(responseString);
            console.log(`✅ Response data (как объект):`, result);
            console.groupEnd();
            
            set({ 
              isSaving: false, 
              isDirty: false, 
              lastSaved: new Date().toISOString() 
            }, false, 'saveLayout');
          } catch (error) {
            console.error('❌ Save layout error:', error);
            set({ 
              error: error instanceof Error ? error.message : 'Ошибка сохранения',
              isSaving: false 
            }, false, 'saveLayout');
          }
        },

        loadComponentCatalog: async () => {
          set({ catalogLoading: true }, false, 'loadComponentCatalog');
          try {
            const url = '/web/v1/components';
            
            console.group('🔄 usePageStore.fetch [loadComponentCatalog]');
            console.log(`📍 URL: GET ${url}`);
            
            const response = await fetch(url);
            
            console.log(`📥 Status: ${response.status} ${response.statusText}`);
            
            if (!response.ok) {
              const errorText = await response.text();
              console.error('❌ Error:', errorText);
              console.groupEnd();
              throw new Error('Ошибка загрузки каталога');
            }
            
            const data = await response.json();
            const responseString = JSON.stringify(data, null, 2);
            console.log(`✅ Response Size: ${responseString.length} characters`);
            console.log(`✅ Response data (полное содержимое):`);
            console.log(responseString);
            console.log(`✅ Response data (как объект):`, data);
            console.groupEnd();
            
            set({ 
              componentCatalog: data.components || [], 
              catalogLoading: false 
            }, false, 'loadComponentCatalog');
          } catch (error) {
            console.error('❌ Load catalog error:', error);
            set({ 
              error: error instanceof Error ? error.message : 'Ошибка загрузки каталога',
              catalogLoading: false 
            }, false, 'loadComponentCatalog');
          }
        },

        // Управление блоками
        addBlock: (component: string, dropZone: DropZone, props?: Record<string, any>) => {
          const { pageModel, componentCatalog } = get();
          if (!pageModel) return;

          // Найти компонент в каталоге для получения example_props
          const catalogItem = componentCatalog.find(item => item.name === component);
          const finalProps = props || catalogItem?.example_props || {};
          const usingDefaults = !props && !!catalogItem?.example_props;

          const newBlock: Block = {
            id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            component,
            props: finalProps,
            layout: dropZone,
            metadata: {
              matchType: 'manual',
              usingDefaults
            }
          };

          const newPageModel: PageModel = {
            ...pageModel,
            blocks: [...pageModel.blocks, newBlock]
          };

          set({ pageModel: newPageModel, isDirty: true }, false, 'addBlock');
        },

        updateBlock: (blockId: string, updates: Partial<Block>) => {
          const { pageModel } = get();
          if (!pageModel) return;

          const newBlocks = pageModel.blocks.map(block => 
            block.id === blockId ? { ...block, ...updates } : block
          );

          set({ 
            pageModel: { ...pageModel, blocks: newBlocks }, 
            isDirty: true 
          }, false, 'updateBlock');
        },

        removeBlock: (blockId: string) => {
          const { pageModel } = get();
          if (!pageModel) return;

          const newBlocks = pageModel.blocks.filter(block => block.id !== blockId);
          
          set({ 
            pageModel: { ...pageModel, blocks: newBlocks },
            isDirty: true, 
            selectedBlockId: get().selectedBlockId === blockId ? null : get().selectedBlockId 
          }, false, 'removeBlock');
        },

        moveBlock: (blockId: string, newLayout: DropZone) => {
          const { pageModel } = get();
          if (!pageModel) return;

          const newBlocks = pageModel.blocks.map(block => 
            block.id === blockId ? { ...block, layout: newLayout } : block
          );

          set({ 
            pageModel: { ...pageModel, blocks: newBlocks }, 
            isDirty: true 
          }, false, 'moveBlock');
        },

        resizeBlock: (blockId: string, newColSpan: number) => {
          const { pageModel } = get();
          if (!pageModel) return;

          const newBlocks = pageModel.blocks.map(block => 
            block.id === blockId 
              ? { ...block, layout: { ...block.layout, colSpan: newColSpan } }
              : block
          );

          set({ 
            pageModel: { ...pageModel, blocks: newBlocks }, 
            isDirty: true 
          }, false, 'resizeBlock');
        },

        selectBlock: (blockId: string | null) => {
          set({ selectedBlockId: blockId }, false, 'selectBlock');
        },

        // Утилиты
        setLoading: (loading: boolean) => {
          set({ isLoading: loading }, false, 'setLoading');
        },

        setSaving: (saving: boolean) => {
          set({ isSaving: saving }, false, 'setSaving');
        },

        setError: (error: string | null) => {
          set({ error }, false, 'setError');
        },

        markDirty: () => {
          set({ isDirty: true }, false, 'markDirty');
        },

        markSaved: () => {
          set({ isDirty: false, lastSaved: new Date().toISOString() }, false, 'markSaved');
        },

        reset: () => {
          set({
            pageModel: null,
            sessionId: null,
            isLoading: false,
            isSaving: false,
            error: null,
            lastSaved: null,
            editorMode: 'view' as EditorMode,
            selectedBlockId: null,
            isDirty: false,
            componentCatalog: [],
            catalogLoading: false,
            isGenerating: false,
            generationProgress: 0,
            generationStep: null,
            generationResult: null
          }, false, 'reset');
        },

        // Новые методы генерации
        generateFromVoice: async (audioFile: File, options: Partial<VoiceToLayoutOptions> = {}) => {
          const { sessionId, setGenerationProgress } = get();
          
          set({ 
            isGenerating: true, 
            generationProgress: 0, 
            generationStep: 'Подготовка...',
            error: null 
          }, false, 'generateFromVoice');
          
          try {
            console.log('🎤 Начинаем генерацию из голоса...', {
              audioSize: audioFile.size,
              audioType: audioFile.type,
              sessionId: sessionId || 'новый'
            });
            
            const result = await convertVoiceToLayout(audioFile, {
              sessionId: sessionId || undefined,
              autoSave: true,
              template: 'hero-main-footer',
              ...options
            });
            
            // Обновляем прогресс
            if (result.steps.length > 0) {
              const lastStep = result.steps[result.steps.length - 1];
              setGenerationProgress(lastStep.progress, lastStep.message);
            }
            
            if (result.success && result.finalLayout) {
              set({
                pageModel: result.finalLayout,
                sessionId: result.sessionId,
                isGenerating: false,
                generationResult: result,
                isDirty: true
              }, false, 'generateFromVoice');
            } else {
              set({
                isGenerating: false,
                error: result.error || 'Генерация не удалась',
                generationResult: result
              }, false, 'generateFromVoice');
            }
            
            return result;
            
          } catch (error) {
            console.error('❌ Ошибка генерации из голоса:', error);
            set({
              isGenerating: false,
              error: error instanceof Error ? error.message : 'Неизвестная ошибка генерации',
              generationResult: null
            }, false, 'generateFromVoice');
            
            throw error;
          }
        },

        generateFromText: async (text: string, sessionId?: string) => {
          const { setGenerationProgress } = get();
          
          set({ 
            isGenerating: true, 
            generationProgress: 0, 
            generationStep: 'Анализ текста...',
            error: null 
          }, false, 'generateFromText');
          
          try {
            console.log('📝 Начинаем генерацию из текста...', {
              textLength: text.length,
              sessionId: sessionId || 'новый'
            });
            
            const result = await convertTextToLayout(text, sessionId);
            
            // Обновляем прогресс
            if (result.steps.length > 0) {
              const lastStep = result.steps[result.steps.length - 1];
              setGenerationProgress(lastStep.progress, lastStep.message);
            }
            
            if (result.success && result.finalLayout) {
              set({
                pageModel: result.finalLayout,
                sessionId: result.sessionId,
                isGenerating: false,
                generationResult: result,
                isDirty: true
              }, false, 'generateFromText');
            } else {
              set({
                isGenerating: false,
                error: result.error || 'Генерация из текста не удалась',
                generationResult: result
              }, false, 'generateFromText');
            }
            
            return result;
            
          } catch (error) {
            console.error('❌ Ошибка генерации из текста:', error);
            set({
              isGenerating: false,
              error: error instanceof Error ? error.message : 'Неизвестная ошибка генерации',
              generationResult: null
            }, false, 'generateFromText');
            
            throw error;
          }
        },

        loadExisting: async (sessionId: string) => {
          await get().loadLayout(sessionId);
        },

        refreshMod3Layout: async (sessionId: string) => {
          set({ isLoading: true, error: null }, false, 'refreshMod3Layout');
          try {
            const layout = await mod3Client.getLayout(sessionId);
            if (layout.status === 'ok') {
              // Конвертируем Mod3 layout в PageModel формат
              const { DataAdapters } = await import('../api/config');
              const pageModel = DataAdapters.fromMod3(layout);
              
              set({
                pageModel,
                sessionId,
                isLoading: false,
                error: null
              }, false, 'refreshMod3Layout');
            } else {
              set({
                isLoading: false,
                error: layout.error || 'Ошибка обновления layout от Mod3'
              }, false, 'refreshMod3Layout');
            }
          } catch (error) {
            set({
              isLoading: false,
              error: error instanceof Error ? error.message : 'Ошибка обновления layout'
            }, false, 'refreshMod3Layout');
          }
        },

        saveDebounced: debounce(() => {
          get().saveLayout();
        }, 500),
        
        // Утилиты для генерации
        setGenerationProgress: (progress: number, step: string) => {
          set({ generationProgress: progress, generationStep: step }, false, 'setGenerationProgress');
        }
      }),
      {
        name: 'page-store',
        partialize: (state) => ({
          pageModel: state.pageModel,
          lastSaved: state.lastSaved
        })
      }
    ),
    {
      name: 'page-store'
    }
  )
);
