'use client';

import React from 'react';
import { useAnimationControl } from '@/hooks/use-animation-control';
import { useTypewriter } from '@/hooks/use-typewriter';
import { BoxReveal } from '@/components/magicui/box-reveal';
import { ComponentErrorBoundary } from '@/components/error-boundary';
import { mockSiteData } from '@/config/mock-data';
import Image from 'next/image';

interface HeroSectionProps {
  profile: {
    avatar: string;
    name: string;
    title: string;
    motto: string[];
  };
  backgroundEffect?: 'meteors' | 'particles' | 'orbiting';
}

export function HeroSection({ 
  profile, 
  backgroundEffect = 'particles' 
}: HeroSectionProps) {
  const { displayText, isTyping } = useTypewriter(profile.motto, {
    typeSpeed: 150,
    backSpeed: 80,
    backDelay: 4000,
    startDelay: 800,
    loop: true
  });

  const { ref: heroRef, isVisible } = useAnimationControl({
    threshold: 0.1,
    triggerOnce: false
  });

  return (
    <ComponentErrorBoundary componentName="HeroSection">
      <section 
        id="home" 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
          {/* 粒子背景效果在页面级别添加 */}

          {/* 主要内容 */}
          <div className="relative z-10 w-full h-screen">
            {/* 移动端堆叠布局 */}
            <div className="flex flex-col items-center justify-center h-full gap-8 p-8 lg:hidden">
              {/* 移动端打字机 */}
              <div className="text-center max-w-sm">
                <p className="text-xl md:text-2xl text-white font-serif leading-relaxed" style={{
                  fontFamily: "'KaiTi', '楷体', 'STKaiti', serif",
                  lineHeight: '1.4',
                  fontWeight: '400',
                  letterSpacing: '0.02em'
                }}>
                  {displayText}
                  <span 
                    className="inline-block w-1 bg-blue-400 ml-1 cursor-blink"
                    style={{
                      height: '0.9em',
                      verticalAlign: 'text-top'
                    }}
                  />
                </p>
              </div>
              
              {/* 移动端个人卡片 */}
              <div className="w-full max-w-xs bg-card/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-border/30">
                {/* 头像 */}
                <div className="w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl hover:scale-105 transition-transform duration-300 mb-5">
                  {profile.avatar ? (
                    <Image
                      src={profile.avatar}
                      alt={profile.name}
                      width={144}
                      height={144}
                      className="w-full h-full object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-4xl font-bold text-white">
                      {profile.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* 姓名和职位 */}
                <div className="space-y-2 text-center mb-5">
                  <h1 className="text-2xl font-bold gradient-text">{profile.name}</h1>
                  <p className="text-base text-muted-foreground">{profile.title}</p>
                </div>

                {/* 技能标签预览 */}
                <div className="space-y-3 mb-5">
                  <h2 className="text-sm font-semibold text-foreground/80 text-center">
                    核心技能
                  </h2>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {mockSiteData.skills.filter(skill => ['Python', 'C++'].includes(skill.name)).map((skill, index) => (
                      <div
                        key={skill.name}
                        className="px-2.5 py-1 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full text-xs hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105"
                      >
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 行动按钮 */}
                <div className="flex flex-col gap-2.5">
                  <a
                    href="#projects"
                    className="group px-5 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 text-center text-xs"
                  >
                    查看作品
                    <span className="inline-block ml-1.5 group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </a>
                  <a
                    href="#contact"
                    className="group px-5 py-2 bg-secondary text-secondary-foreground rounded-full font-medium hover:bg-secondary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/25 text-center text-xs"
                  >
                    联系我
                    <span className="inline-block ml-1.5 group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* 桌面端绝对定位布局 */}
            <div className="hidden lg:block relative w-full h-full">
              {/* 左侧打字机 - 使用 style 精确控制 */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-1/3 max-w-lg"
                style={{ left: 'clamp(12rem, 10vw, 10rem)' }}
              >
                <div className="text-left">
                  {/* 固定高度和宽度的容器，防止布局抖动 */}
                  <div className="min-h-[160px] flex items-center">
                    <div className="relative w-full">
                      <p className="text-3xl lg:text-4xl xl:text-5xl text-white font-serif leading-relaxed whitespace-nowrap" style={{
                        fontFamily: "'KaiTi', '楷体', 'STKaiti', serif",
                        lineHeight: '1.8',
                        fontWeight: '400',
                        letterSpacing: '0.02em',
                        minHeight: '1.2em'
                      }}>
                        <span style={{ minHeight: 'inherit', display: 'inline-block' }}>
                          {displayText}
                        </span>
                        <span 
                          className="inline-block w-1 bg-blue-400 ml-1 cursor-blink"
                          style={{
                            height: '0.9em',
                            verticalAlign: 'text-top'
                          }}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 右侧个人卡片 - 使用 style 精确控制 */}
              <div 
                className="absolute top-1/2 -translate-y-1/2"
                style={{ 
                  right: 'clamp(24rem, 8vw, 8rem)',
                  width: 'clamp(20rem, 21vw, 28rem)'
                }}
              >
                <div className="w-full bg-card/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-border/30">
                  {/* 头像 */}
                  <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl hover:scale-105 transition-transform duration-300 mb-6">
                    {profile.avatar ? (
                      <Image
                        src={profile.avatar}
                        alt={profile.name}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-4xl font-bold text-white">
                        {profile.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* 姓名和职位 */}
                  <div className="space-y-3 text-center mb-6">
                    <h1 className="text-2xl lg:text-3xl font-bold gradient-text">{profile.name}</h1>
                    <p className="text-lg text-muted-foreground">{profile.title}</p>
                  </div>

                  {/* 技能标签预览 */}
                  <div className="space-y-3 mb-6">
                    <h2 className="text-lg font-semibold text-foreground/80 text-center">
                      核心技能
                    </h2>
                    <div className="flex flex-wrap justify-center gap-2">
                      {mockSiteData.skills.filter(skill => ['Python', 'C++'].includes(skill.name)).map((skill, index) => (
                        <div
                          key={skill.name}
                          className="px-3 py-1.5 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full text-sm hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105"
                        >
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 行动按钮 */}
                  <div className="flex flex-col gap-3">
                    <a
                      href="#projects"
                      className="group px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 text-center text-sm"
                    >
                      查看作品
                      <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </a>
                    <a
                      href="#contact"
                      className="group px-6 py-2.5 bg-secondary text-secondary-foreground rounded-full font-medium hover:bg-secondary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/25 text-center text-sm"
                    >
                      联系我
                      <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 滚动提示 */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <span className="text-sm">向下滚动</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>
    </ComponentErrorBoundary>
  );
}