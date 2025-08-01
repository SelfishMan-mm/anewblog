'use client';

import { useState } from 'react';
import { PinContainer } from '@/components/ui/3d-pin';
import { ComponentErrorBoundary } from '@/components/error-boundary';
import { useAnimationControl, useBatchAnimation } from '@/hooks/use-animation-control';
import { projectUtils } from '@/lib/data-utils';
import { PROJECT_STATUS } from '@/lib/constants';
import type { Project } from '@/types';
import Image from 'next/image';

interface PortfolioSectionProps {
  projects: Project[];
}

export function PortfolioSection({ projects }: PortfolioSectionProps) {
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

          {/* 项目展示区域 */}
          <div className="relative" ref={projectsRef as any}>
            <ThreeDPinProjects projects={filteredProjects} />
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
  
  // 为不同类型的项目生成不同的渐变色
  const getProjectGradient = (category: string, projectName: string) => {
    const gradients = {
      '机器学习': 'from-purple-500 via-purple-600 to-blue-600',
      '区块链': 'from-orange-500 via-red-500 to-pink-600', 
      '前端开发': 'from-blue-500 via-cyan-500 to-teal-600',
      '系统开发': 'from-gray-600 via-gray-700 to-gray-800',
      '数据分析': 'from-green-500 via-emerald-600 to-cyan-600',
      '数据工程': 'from-indigo-500 via-purple-600 to-pink-600',
    };
    return gradients[category as keyof typeof gradients] || 'from-gray-500 via-gray-600 to-gray-700';
  };
  
  return (
    <div className="w-[20rem] h-[25rem] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-white/[0.1] rounded-xl overflow-hidden shadow-2xl">
      {/* 项目图片或占位符 */}
      <div className="relative h-40 overflow-hidden">
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              unoptimized={project.image.startsWith('data:')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
          </>
        ) : (
          // 漂亮的占位符
          <div className={`w-full h-full bg-gradient-to-br ${getProjectGradient(project.category, project.name)} relative overflow-hidden`}>
            {/* 装饰性图案 */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white/30 rounded-full"></div>
              <div className="absolute top-8 right-8 w-8 h-8 border border-white/20 rotate-45"></div>
              <div className="absolute bottom-6 left-8 w-12 h-12 border border-white/25 rounded-lg rotate-12"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 bg-white/10 rounded-full"></div>
            </div>
            
            {/* 项目名称 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">
                  {project.name}
                </div>
                <div className="text-sm text-white/80">
                  敬请期待
                </div>
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
          </div>
        )}
        
        {/* 状态标签 */}
        <div className="absolute top-3 right-3">
          <span 
            className="px-2 py-1 text-xs font-medium rounded-full text-white shadow-lg"
            style={{ backgroundColor: statusConfig?.color }}
          >
            {statusConfig?.icon} {statusConfig?.label}
          </span>
        </div>

        {/* 特色标签 */}
        {project.featured && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500 text-black shadow-lg">
              ⭐ 精选
            </span>
          </div>
        )}
      </div>

      {/* 项目信息 */}
      <div className="p-4 text-white bg-gradient-to-b from-gray-800/50 to-gray-900/80 backdrop-blur-sm">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">
            {project.name}
          </h3>
          <span className="text-xs text-gray-300 bg-gray-700/50 px-2 py-1 rounded-full">
            {project.category}
          </span>
        </div>
        
        <p className="text-gray-200 text-sm mb-3 line-clamp-2">
          {project.description}
        </p>

        {/* 技术栈 */}
        <div className="flex flex-wrap gap-1 mb-3">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-400/20"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-1 bg-gray-600/30 text-gray-300 text-xs rounded-full border border-gray-500/20">
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
              className="flex-1 px-3 py-1 bg-gray-700/50 text-gray-200 text-xs text-center rounded-full hover:bg-gray-600/60 transition-colors border border-gray-600/30"
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
              className="flex-1 px-3 py-1 bg-blue-600/20 text-blue-300 text-xs text-center rounded-full hover:bg-blue-500/30 transition-colors border border-blue-500/30"
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