'use client';

import { useEffect, useState } from 'react';
import { throttle } from '@/lib/utils';

interface UseScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
  throttleMs?: number;
}

export function useScrollSpy({ 
  sectionIds, 
  offset = 100, 
  throttleMs = 100 
}: UseScrollSpyOptions) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollPosition = window.scrollY + offset;
      
      // 找到当前可见的section
      let currentSection = '';
      
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = sectionId;
            break;
          }
        }
      }
      
      // 如果没有找到匹配的section，使用最后一个可见的section
      if (!currentSection) {
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const sectionId = sectionIds[i];
          const element = document.getElementById(sectionId);
          if (element && scrollPosition >= element.offsetTop) {
            currentSection = sectionId;
            break;
          }
        }
      }
      
      // 如果还是没有找到，使用第一个section
      if (!currentSection && sectionIds.length > 0) {
        currentSection = sectionIds[0];
      }
      
      setActiveSection(currentSection);
    }, throttleMs);

    // 初始化
    handleScroll();
    
    // 添加滚动监听
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset, throttleMs]);

  return activeSection;
}

// 平滑滚动到指定元素
export function scrollToElement(elementId: string, offset: number = 80) {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
}

// 检查元素是否在视口中
export function useInView(elementId: string, threshold: number = 0.1) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementId, threshold]);

  return isInView;
}

// 获取滚动进度
export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    }, 16); // ~60fps

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollProgress;
}