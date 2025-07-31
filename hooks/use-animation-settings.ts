import { useReducedMotion } from './use-reduced-motion';
import { useIsLowPerformanceDevice } from './use-low-performance';
import { useEffect, useState } from 'react';

export function useAnimationSettings() {
  const prefersReducedMotion = useReducedMotion();
  const isLowPerformance = useIsLowPerformanceDevice();
  const [shouldReduceAnimations, setShouldReduceAnimations] = useState(false);

  useEffect(() => {
    // 自动降级条件：
    // 1. 用户系统开启了减少动画
    // 2. 或设备性能较低
    setShouldReduceAnimations(prefersReducedMotion || isLowPerformance);
  }, [prefersReducedMotion, isLowPerformance]);

  return {
    shouldReduceAnimations,
    isLowPerformance,
    prefersReducedMotion
  };
}
