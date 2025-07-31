'use client';

import { useState, useEffect } from 'react';
import { throttle } from '@/lib/utils';

export function useNavVisibility(threshold = 100) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      
      // 在页面顶部时总是显示
      if (currentScrollY < threshold) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // 向上滚动显示，向下滚动隐藏
      const isScrollingUp = currentScrollY < lastScrollY;
      setIsVisible(isScrollingUp);
      setLastScrollY(currentScrollY);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, threshold]);

  return isVisible;
}
