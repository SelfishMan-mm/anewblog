'use client';

import { HeroSection } from '@/components/sections/hero-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { PortfolioSection } from '@/components/sections/portfolio-section';
import { AboutSection } from '@/components/sections/about-section';
import { ContactSection } from '@/components/sections/contact-section';
import { mockSiteData } from '@/config/mock-data';

export default function Home() {
  const { personal, skills, projects, timeline, contacts, socialLinks } = mockSiteData;

  return (
    <main className="relative">
      {/* Hero 首屏区域 */}
      <HeroSection 
        profile={{
          avatar: personal.avatar,
          name: personal.name,
          title: personal.title,
          motto: personal.motto
        }}
        backgroundEffect="meteors"
      />

      {/* 技能展示区域 */}
      <SkillsSection 
        skills={skills}
        displayMode="orbiting"
      />

      {/* 作品集展示区域 */}
      <PortfolioSection 
        projects={projects}
        displayMode="3d-marquee"
      />

      {/* 关于我区域 */}
      <AboutSection 
        personalInfo={personal}
        timeline={timeline}
      />

      {/* 联系方式区域 */}
      <ContactSection 
        contacts={contacts}
        socialLinks={socialLinks}
      />
    </main>
  );
}
