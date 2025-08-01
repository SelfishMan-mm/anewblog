'use client';

import { Timeline } from '@/components/ui/timeline';
import { Boxes } from '@/components/ui/background-boxes';
import { ComponentErrorBoundary } from '@/components/error-boundary';
import { useAnimationControl } from '@/hooks/use-animation-control';
import { mockSiteData } from '@/config/mock-data';
import { motion } from 'motion/react';

export default function TimelinePage() {
  const { timeline } = mockSiteData;

  const { ref: sectionRef, isVisible } = useAnimationControl({
    threshold: 0.2,
    triggerOnce: true
  });

  // 转换timeline数据为Timeline组件需要的格式
  const timelineData = timeline.map((event) => ({
    title: event.date,
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-3 h-3 rounded-full ${getTypeColor(event.type)}`} />
          <span className="text-sm text-muted-foreground capitalize">
            {getTypeLabel(event.type)}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {event.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {event.description}
        </p>
      </div>
    )
  }));

  return (
    <ComponentErrorBoundary componentName="TimelinePage">
      <main className="relative min-h-screen bg-background pt-20">
        <section 
          ref={sectionRef}
          className="min-h-screen py-20 px-8 relative overflow-hidden"
        >
          {/* 背景装饰 */}
          <div className="absolute inset-0 w-full h-full bg-slate-900 flex items-center justify-center">
            <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            <Boxes />
          </div>

          <div className="max-w-7xl mx-auto relative z-30">
            {/* 标题区域 */}
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                成长经历
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                记录我的学习和成长历程，每一步都是向前的足迹
              </p>
            </motion.div>

            {/* 时间轴内容 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-900/50 backdrop-blur-sm rounded-xl overflow-hidden"
            >
              <Timeline data={timelineData} />
            </motion.div>
          </div>
        </section>
      </main>
    </ComponentErrorBoundary>
  );
}

// 辅助函数
function getTypeColor(type: string): string {
  const colors = {
    education: 'bg-blue-500',
    work: 'bg-green-500',
    project: 'bg-purple-500',
    achievement: 'bg-yellow-500'
  };
  return colors[type as keyof typeof colors] || 'bg-gray-500';
}

function getTypeLabel(type: string): string {
  const labels = {
    education: '教育',
    work: '工作',
    project: '项目',
    achievement: '成就'
  };
  return labels[type as keyof typeof labels] || type;
}