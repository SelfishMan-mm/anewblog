'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to detect if device might have performance limitations
 * Uses various heuristics to determine if animations should be reduced
 */
export function useIsLowPerformanceDevice(): boolean {
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined') {
      return;
    }

    let lowPerformanceScore = 0;

    // Check navigator properties if available
    if (typeof navigator !== 'undefined') {
      // Check for mobile devices
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      
      if (isMobile) {
        lowPerformanceScore += 1;
      }

      // Check hardware concurrency (CPU cores)
      const hardwareConcurrency = (navigator as any).hardwareConcurrency;
      if (hardwareConcurrency && hardwareConcurrency <= 2) {
        lowPerformanceScore += 1;
      }

      // Check device memory if available
      const deviceMemory = (navigator as any).deviceMemory;
      if (deviceMemory && deviceMemory <= 2) {
        lowPerformanceScore += 1;
      }

      // Check connection if available
      const connection = (navigator as any).connection;
      if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
        lowPerformanceScore += 1;
      }
    }

    // Check window size (small screens might indicate lower performance devices)
    if (window.innerWidth < 768 && window.innerHeight < 1024) {
      lowPerformanceScore += 0.5;
    }

    // Consider it low performance if score >= 2
    setIsLowPerformance(lowPerformanceScore >= 2);
  }, []);

  return isLowPerformance;
}

export default useIsLowPerformanceDevice;
