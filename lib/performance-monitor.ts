// 性能监控工具

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage?: number;
  fps?: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    loadTime: 0,
    renderTime: 0
  };

  private fpsCounter = 0;
  private lastTime = 0;
  private frameCount = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMonitoring();
    }
  }

  private initializeMonitoring() {
    // 监控页面加载时间
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      this.metrics.loadTime = navigation.loadEventEnd - navigation.loadEventStart;
    });

    // 监控内存使用（如果支持）
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      this.metrics.memoryUsage = memory.usedJSHeapSize;
    }

    // 监控 FPS
    this.startFPSMonitoring();
  }

  private startFPSMonitoring() {
    const measureFPS = (currentTime: number) => {
      this.frameCount++;
      
      if (currentTime - this.lastTime >= 1000) {
        this.metrics.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
        this.frameCount = 0;
        this.lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    requestAnimationFrame(measureFPS);
  }

  // 测量组件渲染时间
  measureRenderTime<T>(componentName: string, renderFunction: () => T): T {
    const startTime = performance.now();
    const result = renderFunction();
    const endTime = performance.now();
    
    const renderTime = endTime - startTime;
    
    // 如果渲染时间过长，发出警告
    if (renderTime > 16) { // 超过一帧的时间
      console.warn(`Component ${componentName} took ${renderTime.toFixed(2)}ms to render`);
    }
    
    return result;
  }

  // 获取当前性能指标
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  // 检查是否应该减少动画
  shouldReduceAnimations(): boolean {
    const metrics = this.getMetrics();
    
    // 如果 FPS 低于 30 或内存使用过高，建议减少动画
    if (metrics.fps && metrics.fps < 30) {
      return true;
    }
    
    if (metrics.memoryUsage && metrics.memoryUsage > 100 * 1024 * 1024) { // 100MB
      return true;
    }
    
    return false;
  }

  // 检查用户偏好
  respectsReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}

// 单例实例
export const performanceMonitor = new PerformanceMonitor();

import { useState, useEffect } from 'react';

// React Hook 用于性能监控
export function usePerformanceMonitor() {
  const [shouldReduceAnimations, setShouldReduceAnimations] = useState(false);
  
  useEffect(() => {
    const checkPerformance = () => {
      const shouldReduce = performanceMonitor.shouldReduceAnimations() || 
                          performanceMonitor.respectsReducedMotion();
      setShouldReduceAnimations(shouldReduce);
    };
    
    // 初始检查
    checkPerformance();
    
    // 定期检查性能
    const interval = setInterval(checkPerformance, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return {
    shouldReduceAnimations,
    metrics: performanceMonitor.getMetrics(),
    measureRenderTime: performanceMonitor.measureRenderTime.bind(performanceMonitor)
  };
}

export default performanceMonitor;