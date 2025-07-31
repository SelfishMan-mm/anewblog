'use client';

import { useState } from 'react';
import { OrbitingCircles } from '@/components/magicui/orbiting-circles';
import { Marquee } from '@/components/magicui/marquee';
import { ComponentErrorBoundary } from '@/components/error-boundary';
import { useAnimationControl, useBatchAnimation } from '@/hooks/use-animation-control';
import { skillUtils } from '@/lib/data-utils';
import { SKILL_LEVELS } from '@/lib/constants';
import { mockSiteData } from '@/config/mock-data';
import type { Skill, SkillGroup, SkillDisplayMode } from '@/types';

interface SkillsSectionProps {
  skills: Skill[];
  displayMode?: SkillDisplayMode;
}

export function SkillsSection({ skills, displayMode = 'orbiting' }: SkillsSectionProps) {
  const { ref: sectionRef, isVisible } = useAnimationControl({
    threshold: 0.2,
    triggerOnce: true
  });

  // 获取技能统计
  const skillStats = skillUtils.getSkillStats(skills);

  return (
    <ComponentErrorBoundary componentName="SkillsSection">
      <section 
        id="skills" 
        ref={sectionRef}
        className="min-h-screen py-20 px-8 bg-background/50 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto">
          {/* 标题区域 */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              技能展示
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              掌握多种技术栈，专注于数据分析、机器学习和全栈开发
            </p>
            
            {/* 技能统计 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
              <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                <div className="text-2xl font-bold text-primary">{skillStats.total}</div>
                <div className="text-sm text-muted-foreground">总技能</div>
              </div>
              <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                <div className="text-2xl font-bold text-secondary">{skillStats.averageLevel}</div>
                <div className="text-sm text-muted-foreground">平均水平</div>
              </div>
              <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                <div className="text-2xl font-bold text-accent">{skillStats.levelDistribution.expert}</div>
                <div className="text-sm text-muted-foreground">专家级</div>
              </div>
              <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                <div className="text-2xl font-bold text-primary">{Object.keys(skillStats.categoryStats).length}</div>
                <div className="text-sm text-muted-foreground">技能分类</div>
              </div>
            </div>
          </div>





          {/* 技能展示区域 */}
          <div className="space-y-20">
            {/* 环绕展示 */}
            <div className="relative">
              <OrbitingSkills skills={skills} />
            </div>

            {/* 滚动展示 */}
            <div className="relative">
              <MarqueeSkills skillGroups={mockSiteData.skillGroups || []} />
            </div>
          </div>


        </div>
      </section>
    </ComponentErrorBoundary>
  );
}

// 环绕展示组件
function OrbitingSkills({ skills }: { skills: Skill[] }) {
  // 只显示编程语言类技能
  const programmingSkills = skills.filter(skill => skill.category === '编程语言');
  
  return (
    <div className="relative flex h-[500px] w-full items-center justify-center">
      {/* 中心内容 */}
      <div className="text-center">
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-4 mx-auto">
          <span className="text-2xl font-bold text-white">编程语言</span>
        </div>
        <p className="text-muted-foreground">核心技术栈</p>
      </div>

      {/* 环绕的技能 */}
      {programmingSkills.map((skill, index) => {
        const radius = 120 + (index % 3) * 40;
        const duration = 8 + (index % 3) * 2;
        
        return (
          <OrbitingCircles
            key={skill.name}
            className="size-[50px] border-none bg-transparent"
            duration={duration}
            delay={index * 2}
            radius={radius}
          >
            <SkillOrb skill={skill} />
          </OrbitingCircles>
        );
      })}
    </div>
  );
}

// 滚动展示组件
function MarqueeSkills({ skillGroups }: { skillGroups: SkillGroup[] }) {
  return (
    <div className="space-y-12">
      {skillGroups.map((group) => (
        <div key={group.group} className="space-y-4">
          <h3 className="text-xl font-semibold text-center mb-6">{group.group}</h3>
          <Marquee pauseOnHover className="[--duration:20s]">
            {group.skills.map((skill) => (
              <div key={skill.name} className="mx-4">
                <div className="group p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {skill.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{skill.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">
                        {skill.level}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      ))}
    </div>
  );
}



// 技能球组件
function SkillOrb({ skill }: { skill: Skill }) {
  const levelInfo = getSkillLevel(skill.level);
  
  return (
    <div 
      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg hover:scale-110 transition-transform duration-300"
      style={{ backgroundColor: levelInfo.color }}
      title={`${skill.name} - ${skill.level}%`}
    >
      {skill.icon ? (
        <img src={skill.icon} alt={skill.name} className="w-8 h-8" />
      ) : (
        skill.name.charAt(0)
      )}
    </div>
  );
}

// 技能卡片组件
function SkillCard({ skill, showProgress = false }: { skill: Skill; showProgress?: boolean }) {
  const levelInfo = getSkillLevel(skill.level);
  
  return (
    <div className="group p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div className="flex items-center gap-4 mb-3">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
          style={{ backgroundColor: levelInfo.color }}
        >
          {skill.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {skill.name}
          </h3>
          <p className="text-sm text-muted-foreground">{skill.category}</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold" style={{ color: levelInfo.color }}>
            {skill.level}%
          </div>
          <div className="text-xs text-muted-foreground">{levelInfo.label}</div>
        </div>
      </div>
      
      {showProgress && (
        <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: `${skill.level}%`,
              backgroundColor: levelInfo.color 
            }}
          />
        </div>
      )}
    </div>
  );
}

// 获取技能等级的辅助函数
function getSkillLevel(level: number) {
  for (const [key, config] of Object.entries(SKILL_LEVELS)) {
    if (level >= config.min && level <= config.max) {
      return { key, ...config };
    }
  }
  return SKILL_LEVELS.BEGINNER;
}