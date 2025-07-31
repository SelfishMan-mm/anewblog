'use client';

import { useParallax } from '@/hooks/use-animation-control';
import { useTheme } from '@/contexts/theme-context';

interface ParallaxBackgroundProps {
  children?: React.ReactNode;
}

export function ParallaxBackground({ children }: ParallaxBackgroundProps) {
  const offset1 = useParallax(0.2);
  const offset2 = useParallax(0.4);
  const offset3 = useParallax(0.6);
  const { animationsEnabled } = useTheme();

  if (!animationsEnabled) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* 背景层 1 - 最慢 */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{ transform: `translateY(${offset1}px)` }}
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-secondary/20 rounded-full blur-lg" />
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-accent/20 rounded-full blur-2xl" />
      </div>

      {/* 背景层 2 - 中等速度 */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{ transform: `translateY(${offset2}px)` }}
      >
        <div className="absolute top-60 right-10 w-20 h-20 bg-primary/30 rounded-full blur-md" />
        <div className="absolute bottom-60 left-20 w-28 h-28 bg-secondary/30 rounded-full blur-lg" />
        <div className="absolute top-1/3 left-1/2 w-16 h-16 bg-accent/30 rounded-full blur-sm" />
      </div>

      {/* 背景层 3 - 最快 */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ transform: `translateY(${offset3}px)` }}
      >
        <div className="absolute top-32 left-1/3 w-12 h-12 bg-primary/40 rounded-full blur-sm" />
        <div className="absolute bottom-32 right-1/3 w-16 h-16 bg-secondary/40 rounded-full blur-md" />
        <div className="absolute top-2/3 right-10 w-20 h-20 bg-accent/40 rounded-full blur-lg" />
      </div>

      {/* 内容 */}
      {children}
    </div>
  );
}