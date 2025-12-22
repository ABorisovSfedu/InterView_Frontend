import React, { useMemo, useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import SharedHeader from "./SharedHeader";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import apiClient from "../api/client";

type Plan = "basic" | "pro" | "premium";
type Project = { 
  id: number; 
  name: string; 
  client?: string;
  description?: string;
  status: "draft" | "active" | "done"; 
  createdAt: string; 
  updatedAt: string;
  stats?: {
    total_sessions: number;
    completed_sessions: number;
    total_files: number;
    completed_files: number;
    total_duration: number;
  };
};


function PlanCard({ plan, isDark }: { plan: Plan; isDark: boolean }) {
  const limits = {
    basic: { sessions: "1 интервью/нед", minutes: "≤20 мин", pages: "1 страница" },
    pro: { sessions: "≤5 интервью/нед", minutes: "≤45 мин", pages: "до 3 страниц" },
    premium: { sessions: "без ограничений", minutes: "∞", pages: "без ограничений" },
  } as const;
  const l = limits[plan];

  return (
    <Card className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
      <CardHeader>
        <CardTitle className={isDark ? 'text-white' : 'text-gray-900'}>{plan === "basic" ? "Базовый план" : plan === "pro" ? "Расширенный план" : "Премиум план"}</CardTitle>
        <CardDescription className={isDark ? 'text-gray-300' : 'text-gray-600'}>Текущие лимиты вашего тарифа</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-3">
        <Badge variant="outline" className={`${isDark ? 'border-white/20 text-white' : 'border-gray-300 text-gray-700'}`}>Сессии: {l.sessions}</Badge>
        <Badge variant="outline" className={`${isDark ? 'border-white/20 text-white' : 'border-gray-300 text-gray-700'}`}>Длительность: {l.minutes}</Badge>
        <Badge variant="outline" className={`${isDark ? 'border-white/20 text-white' : 'border-gray-300 text-gray-700'}`}>Страницы: {l.pages}</Badge>
        <Button 
          className="ml-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white"
          onClick={() => {
            window.history.pushState({}, "", "/pricing");
            window.dispatchEvent(new Event("popstate"));
          }}
        >
          Изменить тариф
        </Button>
      </CardContent>
    </Card>
  );
}

const ProjectCard: React.FC<{ project: Project; onDelete: (id: number) => void; isDark: boolean; hasLayout?: boolean }> = ({ project, onDelete, isDark, hasLayout = false }) => {
  const getStatusLabel = (status: string, hasLayout: boolean) => {
    if (hasLayout) {
      return 'В работе';
    }
    switch (status) {
      case 'draft': return 'Черновик';
      case 'active': return 'В работе';
      case 'done': return 'Завершен';
      default: return status;
    }
  };

  const getStatusColor = (status: string, hasLayout: boolean) => {
    if (hasLayout) {
      return 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white';
    }
    switch (status) {
      case 'draft': return isDark ? 'bg-slate-500/20 text-slate-300 border-slate-500/30' : 'bg-slate-100 text-slate-700 border-slate-200';
      case 'active': return 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white';
      case 'done': return isDark ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-green-100 text-green-700 border-green-200';
      default: return isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className={`${isDark ? 'bg-white/5 border-white/10 hover:border-purple-400/40' : 'bg-white border-gray-200 hover:border-purple-300 shadow-sm hover:shadow-md'} transition-all`}>
      <CardHeader>
        <CardTitle className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.name}</CardTitle>
        <CardDescription className={isDark ? 'text-gray-300' : 'text-gray-600'}>
          {project.client && `${project.client} • `}
          Создано: {new Date(project.createdAt).toLocaleDateString('ru-RU')}
        </CardDescription>
        {project.description && (
          <CardDescription className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {project.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex items-center gap-3">
        <Badge className={getStatusColor(project.status, hasLayout)}>
          {getStatusLabel(project.status, hasLayout)}
        </Badge>
        {project.stats && (
          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {project.stats.total_sessions} сессий
          </div>
        )}
        <div className="ml-auto flex items-center gap-2">
          <Button asChild size="sm" className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white">
            <a href={`/projects/${project.id}`}>Открыть</a>
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className={`${isDark ? 'border-red-500/40 text-red-300 hover:bg-red-500/10' : 'border-red-300 text-red-600 hover:bg-red-50'}`} 
            onClick={() => onDelete(project.id)}
          >
            <Trash2 className="w-4 h-4 mr-1" /> Удалить
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CreateProjectModal({ onCreate }: { onCreate: (name: string) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button id="create" className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white"><Plus className="w-4 h-4 mr-2" /> Создать проект</Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 border-gray-600 text-white">
        <DialogHeader>
          <DialogTitle>Новый проект</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="project-name" className="block mb-4">Название проекта</label>
            <Input id="project-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Например, Лендинг студии" className="bg-black/50 border-white/10 text-white" />
          </div>
          <div className="flex justify-between gap-3 pt-2">
            <Button variant="outline" className="border-white/20" onClick={() => setOpen(false)}>Отмена</Button>
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              onClick={() => {
                if (!name.trim()) return;
                onCreate(name.trim());
                setName("");
                setOpen(false);
              }}
            >
              Создать
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ProjectsPage() {
  const { isDark, toggleTheme } = useTheme();
  const { user, stats, isLoading: authLoading } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectsWithLayout, setProjectsWithLayout] = useState<Set<number>>(new Set());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);

  // Загрузка проектов
  useEffect(() => {
    const loadProjects = async () => {
      if (authLoading) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await apiClient.getProjects();
        const projectsList = response.projects;
        setProjects(projectsList);
        
        // Проверяем наличие layout для сессий каждого проекта
        const layoutChecks = await Promise.allSettled(
          projectsList.map(async (project: Project) => {
            try {
              const sessionsData = await apiClient.getProjectSessions(project.id);
              const sessions = sessionsData.sessions || sessionsData;
              
              if (!sessions || sessions.length === 0) {
                return { projectId: project.id, hasLayout: false };
              }
              
              // Проверяем наличие layout хотя бы у одной сессии
              const sessionLayoutChecks = await Promise.allSettled(
                sessions.map(async (session: any) => {
                  try {
                    const layout = await apiClient.loadLayout(session.id);
                    console.log(`🔍 Проверка layout для сессии ${session.id} проекта ${project.id}:`, layout);
                    
                    // API возвращает объект с полем elements напрямую
                    // Проверяем наличие elements (может быть массивом или объектом)
                    const hasLayout = layout && 
                      !layout.error && 
                      (layout.elements !== undefined && layout.elements !== null ||
                       layout.layout_data !== undefined && layout.layout_data !== null ||
                       (layout.data && (layout.data.elements !== undefined || layout.data.layout_data !== undefined)));
                    
                    console.log(`✅ Сессия ${session.id} проекта ${project.id} имеет layout:`, hasLayout);
                    return !!hasLayout;
                  } catch (err: any) {
                    // Если layout не найден (404), это нормально - значит layout еще не создан
                    const errorMessage = err?.message || String(err);
                    // 404 или "не найден" - это нормально, layout просто еще не создан
                    if (errorMessage.includes('404') || 
                        errorMessage.includes('не найден') || 
                        errorMessage.includes('not found') ||
                        errorMessage.includes('Layout не найден')) {
                      console.log(`⚠️ Layout для сессии ${session.id} проекта ${project.id} не найден (это нормально)`);
                    } else {
                      // Другие ошибки (500, сетевые и т.д.) логируем, но не считаем критичными
                      console.warn(`⚠️ Ошибка при проверке layout для сессии ${session.id} проекта ${project.id}:`, errorMessage);
                    }
                    return false;
                  }
                })
              );
              
              const hasLayout = sessionLayoutChecks.some(
                result => result.status === 'fulfilled' && result.value === true
              );
              
              console.log(`📊 Проект ${project.id} имеет layout:`, hasLayout);
              return { projectId: project.id, hasLayout };
            } catch (err) {
              return { projectId: project.id, hasLayout: false };
            }
          })
        );
        
        const projectsWithLayoutSet = new Set<number>();
        layoutChecks.forEach((result) => {
          if (result.status === 'fulfilled' && result.value.hasLayout) {
            projectsWithLayoutSet.add(result.value.projectId);
          }
        });
        setProjectsWithLayout(projectsWithLayoutSet);
      } catch (error: any) {
        console.error('Ошибка загрузки проектов:', error);
        setError(error.message || 'Ошибка загрузки проектов');
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [authLoading]);

  const handleCreate = async (name: string) => {
    try {
      const response = await apiClient.createProject(name);
      setProjects([response.project, ...projects]);
    } catch (error: any) {
      console.error('Ошибка создания проекта:', error);
      setError(error.message || 'Ошибка создания проекта');
    }
  };

  const handleDelete = (id: number) => {
    setProjectToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    
    try {
      await apiClient.deleteProject(projectToDelete);
      setProjects(projects.filter(p => p.id !== projectToDelete));
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    } catch (error: any) {
      console.error('Ошибка удаления проекта:', error);
      setError(error.message || 'Ошибка удаления проекта');
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  return (
    <div className={`relative min-h-screen overflow-hidden ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-black/50 via-purple-900/20 to-black' : 'bg-gradient-to-b from-gray-100 to-white'}`} />
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`absolute w-2 h-2 rounded-full animate-float ${isDark ? 'bg-gradient-to-r from-cyan-400 to-purple-500' : 'bg-gradient-to-r from-blue-300 to-purple-300'}`} style={{ left: `${(i * 41) % 100}%`, top: `${(i * 59) % 100}%`, animationDelay: `${(i % 5) * 0.35}s`, animationDuration: `${4 + (i % 4)}s` }} />
        ))}
      </div>

      <div className="relative z-10">
        <SharedHeader 
          account={user ? { name: user.name, email: user.email } : { name: "Гость", email: "guest@example.com" }} 
          isDark={isDark} 
          onThemeToggle={toggleTheme}
          showBackButton={false}
        />

        <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">Личный кабинет / Проекты</h1>
          </div>

          {user && <PlanCard plan={user.plan} isDark={isDark} />}

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl">Мои проекты</h2>
              <CreateProjectModal onCreate={handleCreate} />
            </div>
            {isLoading ? (
              <Card className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} text-center py-12`}>
                <CardContent>
                  <div className="mb-4">Загрузка проектов...</div>
                </CardContent>
              </Card>
            ) : error ? (
              <Card className={`${isDark ? 'bg-red-500/10 border-red-500/30' : 'bg-red-50 border-red-200'} text-center py-12`}>
                <CardContent>
                  <div className="mb-4 text-red-500">{error}</div>
                  <Button onClick={() => window.location.reload()}>Попробовать снова</Button>
                </CardContent>
              </Card>
            ) : projects.length === 0 ? (
              <Card className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} text-center py-12`}>
                <CardContent>
                  <div className="mb-4">Пока нет проектов</div>
                  <CreateProjectModal onCreate={handleCreate} />
                </CardContent>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {projects.map((p) => (
                  <ProjectCard 
                    key={p.id} 
                    project={p} 
                    onDelete={handleDelete} 
                    isDark={isDark} 
                    hasLayout={projectsWithLayout.has(p.id)}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Модальное окно подтверждения удаления */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className={isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'}>
          <DialogHeader>
            <DialogTitle className={isDark ? 'text-white' : 'text-gray-900'}>
              Подтверждение удаления
            </DialogTitle>
            <DialogDescription className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              Вы уверены, что хотите удалить проект? Сессии проекта исчезнут.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setProjectToDelete(null);
              }}
              className={isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}
            >
              Отмена
            </Button>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


