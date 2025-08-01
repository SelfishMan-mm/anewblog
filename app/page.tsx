'use client';

import { HeroSection } from '@/components/sections/hero-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { PortfolioSection } from '@/components/sections/portfolio-section';
import { Particles } from '@/components/magicui/particles';
import { ComponentErrorBoundary } from '@/components/error-boundary';
import { mockSiteData } from '@/config/mock-data';

export default function Home() {
  const { personal, skills, projects } = mockSiteData;

  return (
    <ComponentErrorBoundary componentName="HomePage">
      <main className="relative min-h-screen bg-background overflow-hidden pt-20">
        {/* 粒子背景效果 */}
        <div className="fixed inset-0 z-0">
          <Particles
            className="absolute inset-0"
            quantity={80}
            ease={80}
            color="#3b82f6"
            refresh={false}
            size={1.2}
            staticity={30}
          />
        </div>

        {/* 页面内容 */}
        <div className="relative z-10">
          {/* Hero 首屏区域 */}
          <HeroSection 
            profile={{
              avatar: personal.avatar,
              name: personal.name,
              title: personal.title,
              motto: personal.motto
            }}
            backgroundEffect="particles"
          />

          {/* 技能展示区域 */}
          <SkillsSection 
            skills={skills}
            displayMode="orbiting"
          />

          {/* 作品集展示区域 */}
          <PortfolioSection 
            projects={projects}
          />
        </div>
      </main>
    </ComponentErrorBoundary>
  );
}
