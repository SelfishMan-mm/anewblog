'use client';

import { useState } from 'react';

import { Boxes } from '@/components/ui/background-boxes';
import { ComponentErrorBoundary } from '@/components/error-boundary';
import { useAnimationControl } from '@/hooks/use-animation-control';
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              关于我
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              了解我的背景、经历和兴趣爱好
            </p>
          </motion.div>

          {/* 个人信息内容 */}
          <div className="relative">
            <PersonalInfoContent personalInfo={personalInfo} />
          </div>
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
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
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