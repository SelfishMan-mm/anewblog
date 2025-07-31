'use client';

import { useState } from 'react';
import { ThreeDMarquee } from '@/components/ui/3d-marquee';
import { PinContainer } from '@/components/ui/3d-pin';
import { ComponentErrorBoundary } from '@/components/error-boundary';
import { useAnimationControl, useBatchAnimation } from '@/hooks/use-animation-control';
import { projectUtils } from '@/lib/data-utils';
import { PROJECT_STATUS } from '@/lib/constants';
import type { Project, DisplayMode } from '@/types';
import Image from 'next/image';

interface PortfolioSectionProps {
  projects: Project[];
  displayMode?: DisplayMode;
}

export function PortfolioSection({ projects, displayMode = '3d-marquee' }: PortfolioSectionProps) {
  const [activeMode, setActiveMode] = useState<DisplayMode>(displayMode);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { ref: sectionRef, isVisible } = useAnimationControl({
    threshold: 0.2,
    triggerOnce: true
  });

  // 获取项目统计
  const projectStats = projectUtils.getProjectStats(projects);

  // 使用所有项目
  const filteredProjects = projects;

  const { ref: projectsRef, visibleItems } = useBatchAnimation(filteredProjects.length, 200);

  return (
    <ComponentErrorBoundary componentName="PortfolioSection">
      <section 
        id="projects" 
        ref={sectionRef}
        className="min-h-screen py-20 px-8 bg-card/20 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          {/* 标题区域 */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              项目作品
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              展示我的技术实力和创新能力，每个项目都是学习和成长的见证
            </p>
            
            {/* 项目统计 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
              <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                <div className="text-2xl font-bold text-primary">{projectStats.total}</div>
                <div className="text-sm text-muted-foreground">总项目</div>
              </div>
              <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                <div className="text-2xl font-bold text-green-500">{projectStats.completed}</div>
                <div className="text-sm text-muted-foreground">已完成</div>
              </div>
              <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                <div className="text-2xl font-bold text-yellow-500">{projectStats.inProgress}</div>
                <div className="text-sm text-muted-foreground">进行中</div>
              </div>
              <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                <div className="text-2xl font-bold text-secondary">{projectStats.featured}</div>
                <div className="text-sm text-muted-foreground">精选项目</div>
              </div>
            </div>
          </div>

          {/* 显示模式切换 */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-card/50 rounded-full p-1 border border-border/50">
              <button
                onClick={() => setActiveMode('3d-marquee')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeMode === '3d-marquee'
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                3D 跑马灯
              </button>
              <button
                onClick={() => setActiveMode('3d-pin')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeMode === '3d-pin'
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                3D 卡片
              </button>
            </div>
          </div>

          {/* 移除分类过滤栏 */}

          {/* 项目展示区域 */}
          <div className="relative" ref={projectsRef as any}>
            {activeMode === '3d-marquee' && (
              <ThreeDMarqueeProjects projects={filteredProjects} />
            )}
            
            {activeMode === '3d-pin' && (
              <ThreeDPinProjects projects={filteredProjects} />
            )}
          </div>

          {/* 项目详情弹窗 */}
          {selectedProject && (
            <ProjectModal 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
            />
          )}
        </div>
      </section>
    </ComponentErrorBoundary>
  );
}

// 3D 跑马灯展示组件
function ThreeDMarqueeProjects({ 
  projects
}: { 
  projects: Project[];
}) {
  return (
    <div className="h-[600px] relative">
      <ThreeDMarquee
        images={projects.map(project => project.image)}
      />
    </div>
  );
}

// 3D Pin 卡片展示组件
function ThreeDPinProjects({ 
  projects
}: { 
  projects: Project[];
}) {
  const handleProjectClick = (project: Project) => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank');
    } else if (project.githubUrl) {
      window.open(project.githubUrl, '_blank');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
      {projects.map((project) => (
        <div key={project.id} onClick={() => handleProjectClick(project)}>
          <PinContainer
            title={project.name}
            className="w-full"
          >
            <ProjectPinCard project={project} />
          </PinContainer>
        </div>
      ))}
    </div>
  );
}



// 3D Pin 项目卡片组件
function ProjectPinCard({ project }: { project: Project }) {
  const statusConfig = PROJECT_STATUS[project.status.toUpperCase() as keyof typeof PROJECT_STATUS];
  
  return (
    <div className="w-[20rem] h-[25rem] bg-black/90 border border-white/[0.1] rounded-xl overflow-hidden">
      {/* 项目图片 */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover"
          unoptimized={project.image.startsWith('data:')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        {/* 状态标签 */}
        <div className="absolute top-3 right-3">
          <span 
            className="px-2 py-1 text-xs font-medium rounded-full text-white"
            style={{ backgroundColor: statusConfig?.color }}
          >
            {statusConfig?.icon} {statusConfig?.label}
          </span>
        </div>

        {/* 特色标签 */}
        {project.featured && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500 text-black">
              ⭐ 精选
            </span>
          </div>
        )}
      </div>

      {/* 项目信息 */}
      <div className="p-4 text-white">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">
            {project.name}
          </h3>
          <span className="text-xs text-gray-400">{project.category}</span>
        </div>
        
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {project.description}
        </p>

        {/* 技术栈 */}
        <div className="flex flex-wrap gap-1 mb-3">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* 链接 */}
        <div className="flex gap-2">
          {project.githubUrl && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.githubUrl, '_blank');
              }}
              className="flex-1 px-3 py-1 bg-gray-800 text-gray-300 text-xs text-center rounded-full hover:bg-gray-700 transition-colors"
            >
              GitHub
            </button>
          )}
          {project.liveUrl && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.liveUrl, '_blank');
              }}
              className="flex-1 px-3 py-1 bg-cyan-600 text-white text-xs text-center rounded-full hover:bg-cyan-500 transition-colors"
            >
              预览
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// 项目详情弹窗
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const statusConfig = PROJECT_STATUS[project.status.toUpperCase() as keyof typeof PROJECT_STATUS];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* 关闭按钮 */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{project.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* 项目图片 */}
          <div className="relative aspect-video mb-6 rounded-lg overflow-hidden bg-muted">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              unoptimized={project.image.startsWith('data:')}
            />
          </div>

          {/* 项目信息 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold mb-4">项目描述</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {project.longDescription || project.description}
              </p>

              <h3 className="text-xl font-semibold mb-4">技术栈</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">项目信息</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-muted-foreground">状态</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span style={{ color: statusConfig?.color }}>
                      {statusConfig?.icon}
                    </span>
                    <span>{statusConfig?.label}</span>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">分类</span>
                  <div className="mt-1">{project.category}</div>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">开始时间</span>
                  <div className="mt-1">{new Date(project.startDate).toLocaleDateString('zh-CN')}</div>
                </div>

                {project.endDate && (
                  <div>
                    <span className="text-sm text-muted-foreground">完成时间</span>
                    <div className="mt-1">{new Date(project.endDate).toLocaleDateString('zh-CN')}</div>
                  </div>
                )}

                {project.featured && (
                  <div>
                    <span className="px-2 py-1 bg-yellow-500/10 text-yellow-600 text-sm rounded-full">
                      ⭐ 精选项目
                    </span>
                  </div>
                )}
              </div>

              {/* 链接按钮 */}
              <div className="mt-6 space-y-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-secondary text-secondary-foreground text-center rounded-lg hover:bg-secondary/90 transition-colors"
                  >
                    查看源码
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-primary text-primary-foreground text-center rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    在线预览
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}