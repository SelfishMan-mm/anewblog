'use client';

import { useEffect, useState } from 'react';

export function useIsLowPerformanceDevice() {
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 检测设备性能
      const checkPerformance = () => {
        // 1. 检查设备内存
        const lowMemory = (navigator as any).deviceMemory
          ? (navigator as any).deviceMemory < 4
          : false;

        // 2. 检查是否为移动设备
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

        // 3. 检查硬件并发数
        const lowConcurrency = navigator.hardwareConcurrency
          ? navigator.hardwareConcurrency < 4
          : false;

        return lowMemory || (isMobile && lowConcurrency);
      };

      setIsLowPerformance(checkPerformance());
    }
  }, []);

  return isLowPerformance;
}
