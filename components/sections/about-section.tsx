'use client';

import { useState } from 'react';

import { Boxes } from '@/components/ui/background-boxes';
import { Timeline } from '@/components/ui/timeline';
import { ComponentErrorBoundary } from '@/components/error-boundary';
import { useAnimationControl } from '@/hooks/use-animation-control';
import { Meteors } from '@/components/magicui/meteors';
import type { PersonalInfo, TimelineEvent } from '@/types';
import { motion } from 'motion/react';

interface AboutSectionProps {
  personalInfo: PersonalInfo;
  timeline: TimelineEvent[];
}

export function AboutSection({ personalInfo, timeline }: AboutSectionProps) {
  // 移除标签页功能，只显示个人信息

  const { ref: sectionRef, isVisible } = useAnimationControl({
    threshold: 0.2,
    triggerOnce: true
  });



  return (
    <ComponentErrorBoundary componentName="AboutSection">
      <section 
        id="about" 
        ref={sectionRef}
        className="min-h-screen py-20 px-8 relative overflow-hidden bg-background"
      >
        {/* 背景装饰 */}
        <div className="absolute inset-0 w-full h-full bg-background flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-background z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
          <Boxes />
          <Meteors number={20} />
        </div>

        <div className="max-w-7xl mx-auto relative z-30">
          {/* 标题区域 */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              关于我
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              了解我的背景、经历和兴趣爱好
            </p>
          </motion.div>

          {/* 个人信息内容 */}
          <div className="relative">
            <PersonalInfoContent personalInfo={personalInfo} />
          </div>

          {/* 成长经历时间轴 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                成长经历
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                记录我的学习和成长历程，每一步都是向前的足迹
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden">
              <TimelineContent timeline={timeline} />
            </div>
          </motion.div>
        </div>
      </section>
    </ComponentErrorBoundary>
  );
}

// 个人信息内容组件
function PersonalInfoContent({ personalInfo }: { personalInfo: PersonalInfo }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12"
    >
      {/* 左侧：基本信息 */}
      <div className="space-y-8">
        {/* 个人简介 */}
        <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            个人简介
          </h3>
          <p className="text-slate-300 leading-relaxed">
            {personalInfo.bio}
          </p>
          <div className="mt-4 flex items-center gap-2 text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{personalInfo.location}</span>
          </div>
        </div>

        {/* 教育经历 */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            教育经历
          </h3>
          <div className="space-y-4">
            {personalInfo.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-green-500/30 pl-4">
                <h4 className="font-medium text-white">{edu.school}</h4>
                <p className="text-blue-400">{edu.major}</p>
                <p className="text-sm text-slate-400">{edu.period}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 右侧：兴趣爱好 */}
      <div className="space-y-8">
        {/* 兴趣爱好 */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            兴趣爱好
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {personalInfo.interests.map((interest, index) => (
              <motion.div
                key={interest}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {getInterestIcon(interest)}
                  </span>
                </div>
                <span className="text-slate-300">{interest}</span>
              </motion.div>
            ))}
          </div>
        </div>


      </div>
    </motion.div>
  );
}





function getInterestIcon(interest: string): string {
  if (interest.includes('Apex')) return '🎮';
  if (interest.includes('音乐') || interest.includes('周杰伦')) return '🎵';
  if (interest.includes('Coding')) return '💻';
  return '⭐';
}

// 时间轴内容组件
function TimelineContent({ timeline }: { timeline: TimelineEvent[] }) {
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

  return <Timeline data={timelineData} />;
}

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