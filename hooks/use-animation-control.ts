'use client';

import { useEffect, useState, useRef } from 'react';
import { useTheme } from '@/contexts/theme-context';

interface UseAnimationControlOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
}

export function useAnimationControl({
  threshold = 0.1,
  triggerOnce = true,
  delay = 0
}: UseAnimationControlOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const { animationsEnabled } = useTheme();

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !animationsEnabled) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              setHasTriggered(true);
            }, delay);
          } else {
            setIsVisible(true);
            setHasTriggered(true);
          }
        } else if (!triggerOnce) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, triggerOnce, delay, hasTriggered, animationsEnabled]);

  return {
    ref: elementRef,
    isVisible: animationsEnabled ? isVisible : true,
    hasTriggered
  };
}

// 批量动画控制
export function useBatchAnimation(count: number, staggerDelay: number = 100) {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(count).fill(false));
  const containerRef = useRef<HTMLElement>(null);
  const { animationsEnabled } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !animationsEnabled) {
      setVisibleItems(new Array(count).fill(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 逐个显示项目
          for (let i = 0; i < count; i++) {
            setTimeout(() => {
              setVisibleItems(prev => {
                const newState = [...prev];
                newState[i] = true;
                return newState;
              });
            }, i * staggerDelay);
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, [count, staggerDelay, animationsEnabled]);

  return {
    ref: containerRef,
    visibleItems: animationsEnabled ? visibleItems : new Array(count).fill(true)
  };
}

// 打字机效果 Hook - 优化版
export function useTypewriter(
  strings: string[],
  options: {
    typeSpeed?: number;
    backSpeed?: number;
    backDelay?: number;
    startDelay?: number;
    loop?: boolean;
  } = {}
) {
  const {
    typeSpeed = 100,
    backSpeed = 50,
    backDelay = 2000,
    startDelay = 500,
    loop = true
  } = options;

  const [displayText, setDisplayText] = useState('');
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const { animationsEnabled } = useTheme();

  useEffect(() => {
    if (!animationsEnabled || strings.length === 0) {
      setDisplayText(strings[0] || '');
      setIsInitialized(true);
      return;
    }

    // 初始延迟
    if (!isInitialized) {
      const initTimeout = setTimeout(() => {
        setIsInitialized(true);
      }, startDelay);
      return () => clearTimeout(initTimeout);
    }

    let timeout: NodeJS.Timeout;
    const currentString = strings[currentStringIndex];

    if (isTyping) {
      // 打字阶段
      if (displayText.length < currentString.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentString.slice(0, displayText.length + 1));
        }, typeSpeed);
      } else {
        // 打字完成，等待后开始删除
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, backDelay);
      }
    } else {
      // 删除阶段
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, backSpeed);
      } else {
        // 删除完成，切换到下一个字符串
        const nextIndex = (currentStringIndex + 1) % strings.length;
        if (loop || nextIndex !== 0) {
          setCurrentStringIndex(nextIndex);
          setIsTyping(true);
        }
      }
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    currentStringIndex,
    isTyping,
    strings,
    typeSpeed,
    backSpeed,
    backDelay,
    loop,
    animationsEnabled
  ]);

  return {
    displayText: animationsEnabled ? displayText : strings[0] || '',
    isTyping,
    currentStringIndex
  };
}

// 视差滚动效果
export function useParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0);
  const { animationsEnabled } = useTheme();

  useEffect(() => {
    if (!animationsEnabled) return;

    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, animationsEnabled]);

  return animationsEnabled ? offset : 0;
}

// 鼠标跟随效果
export function useMouseFollow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { animationsEnabled } = useTheme();

  useEffect(() => {
    if (!animationsEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [animationsEnabled]);

  return animationsEnabled ? mousePosition : { x: 0, y: 0 };
}