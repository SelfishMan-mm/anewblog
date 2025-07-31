'use client';

import { useTypewriter } from '@/hooks/use-animation-control';
import { useAnimationControl } from '@/hooks/use-animation-control';
import { BoxReveal } from '@/components/magicui/box-reveal';
import { Meteors } from '@/components/magicui/meteors';
import { ParallaxBackground } from '@/components/ui/parallax-background';
import { ThemeToggle } from '@/contexts/theme-context';
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
  backgroundEffect = 'meteors' 
}: HeroSectionProps) {
  const { displayText, isTyping } = useTypewriter(profile.motto, {
    typeSpeed: 80,
    backSpeed: 40,
    backDelay: 2000,
    startDelay: 1000,
    loop: true
  });

  const { ref: heroRef, isVisible } = useAnimationControl({
    threshold: 0.1,
    triggerOnce: false
  });

  // 移除不需要的产品数据

  return (
    <ComponentErrorBoundary componentName="HeroSection">
      <ParallaxBackground>
        <section 
          id="home" 
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* 背景动效 */}
          <div className="absolute inset-0 z-0">
            {backgroundEffect === 'meteors' && (
              <Meteors number={30} />
            )}
          </div>

          {/* 主题切换按钮 */}
          <div className="absolute top-6 right-6 z-20">
            <ThemeToggle />
          </div>

          {/* 主要内容 */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-screen p-8 gap-8">
            {/* 左侧打字机 */}
            <div className="flex-1 flex items-center justify-center md:justify-end w-full md:w-1/2">
              <BoxReveal boxColor="#8b5cf6" duration={0.5}>
                <div className="max-w-xl text-center md:text-left">
                  <p className="text-3xl md:text-4xl lg:text-5xl text-white font-serif tracking-wide whitespace-nowrap" style={{
                    fontFamily: "'KaiTi', '楷体', 'STKaiti', serif",
                    lineHeight: '1.8',
                    fontWeight: '400'
                  }}>
                    {displayText}
                    <span 
                      className={`inline-block w-1 h-8 bg-primary ml-2 align-middle ${
                        isTyping ? 'animate-blink' : ''
                      }`}
                    />
                  </p>
                </div>
              </BoxReveal>
            </div>
            
            {/* 右侧个人卡片 */}
            <div className="flex-1 flex items-center justify-center md:justify-start w-full md:w-1/2">
              <div className="max-w-md w-full bg-card/80 rounded-3xl shadow-2xl p-8 flex flex-col items-center space-y-6 border border-border/30">
                {/* 头像 */}
                <BoxReveal boxColor="#3b82f6" duration={0.5}>
                  <div className="mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl hover:scale-105 transition-transform duration-300">
                    {profile.avatar ? (
                      <Image
                        src={profile.avatar}
                        alt={profile.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-4xl font-bold text-white">
                        {profile.name.charAt(0)}
                      </div>
                    )}
                  </div>
                </BoxReveal>

                {/* 姓名和职位 */}
                <BoxReveal boxColor="#3b82f6" duration={0.5}>
                  <div className="space-y-2 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold gradient-text">{profile.name}</h1>
                    <p className="text-lg md:text-xl text-muted-foreground">{profile.title}</p>
                  </div>
                </BoxReveal>

                {/* 技能标签预览 */}
                <BoxReveal boxColor="#3b82f6" duration={0.5}>
                  <div className="space-y-4">
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground/80">
                      核心技能
                    </h2>
                    <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
                      {mockSiteData.skills.slice(0, 6).map((skill, index) => (
                        <div
                          key={skill.name}
                          className={`px-4 py-2 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full text-sm hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105 ${
                            isVisible ? 'animate-slide-up' : 'opacity-0'
                          }`}
                          style={{
                            animationDelay: `${index * 100}ms`
                          }}
                        >
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </BoxReveal>

                {/* 行动按钮 */}
                <BoxReveal boxColor="#8b5cf6" duration={0.5}>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <a
                      href="#projects"
                      className="group px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                    >
                      查看作品
                      <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </a>
                    <a
                      href="#contact"
                      className="group px-8 py-3 bg-secondary text-secondary-foreground rounded-full font-medium hover:bg-secondary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/25"
                    >
                      联系我
                      <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </a>
                  </div>
                </BoxReveal>
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
      </ParallaxBackground>
    </ComponentErrorBoundary>
  );
}