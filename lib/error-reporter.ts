import { useState, useEffect } from 'react';

// 错误报告和监控系统

interface ErrorReport {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: number;
  userAgent: string;
  url: string;
  userId?: string;
}

class ErrorReporter {
  private errors: ErrorReport[] = [];
  private maxErrors = 50; // 最多保存50个错误

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeErrorHandling();
    }
  }

  private initializeErrorHandling() {
    // 捕获全局 JavaScript 错误
    window.addEventListener('error', (event) => {
      this.reportError({
        message: event.message,
        stack: event.error?.stack,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    });

    // 捕获未处理的 Promise 拒绝
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    });
  }

  // 报告错误
  reportError(error: Partial<ErrorReport>) {
    const fullError: ErrorReport = {
      message: error.message || 'Unknown error',
      stack: error.stack,
      componentStack: error.componentStack,
      timestamp: error.timestamp || Date.now(),
      userAgent: error.userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : ''),
      url: error.url || (typeof window !== 'undefined' ? window.location.href : ''),
      userId: error.userId
    };

    // 添加到错误列表
    this.errors.unshift(fullError);
    
    // 保持错误数量在限制内
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(0, this.maxErrors);
    }

    // 在开发环境下打印错误
    if (process.env.NODE_ENV === 'development') {
      console.error('Error reported:', fullError);
    }

    // 在生产环境下可以发送到错误监控服务
    // this.sendToErrorService(fullError);
  }

  // 获取所有错误
  getErrors(): ErrorReport[] {
    return [...this.errors];
  }

  // 清除错误
  clearErrors() {
    this.errors = [];
  }

  // 获取错误统计
  getErrorStats() {
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;
    const oneDayAgo = now - 24 * 60 * 60 * 1000;

    const recentErrors = this.errors.filter(error => error.timestamp > oneHourAgo);
    const dailyErrors = this.errors.filter(error => error.timestamp > oneDayAgo);

    return {
      total: this.errors.length,
      lastHour: recentErrors.length,
      lastDay: dailyErrors.length,
      mostCommon: this.getMostCommonError()
    };
  }

  private getMostCommonError(): string | null {
    if (this.errors.length === 0) return null;

    const errorCounts = this.errors.reduce((acc, error) => {
      acc[error.message] = (acc[error.message] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(errorCounts)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || null;
  }

  // 发送到错误监控服务（生产环境使用）
  private async sendToErrorService(error: ErrorReport) {
    try {
      // 这里可以集成 Sentry、LogRocket 等错误监控服务
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(error)
      // });
    } catch (e) {
      console.warn('Failed to send error to monitoring service:', e);
    }
  }
}

// 单例实例
export const errorReporter = new ErrorReporter();

// React Hook 用于错误监控
export function useErrorReporter() {
  const [errorStats, setErrorStats] = useState(errorReporter.getErrorStats());

  useEffect(() => {
    const updateStats = () => {
      setErrorStats(errorReporter.getErrorStats());
    };

    // 定期更新错误统计
    const interval = setInterval(updateStats, 10000); // 每10秒更新一次

    return () => clearInterval(interval);
  }, []);

  return {
    reportError: errorReporter.reportError.bind(errorReporter),
    getErrors: errorReporter.getErrors.bind(errorReporter),
    clearErrors: errorReporter.clearErrors.bind(errorReporter),
    errorStats
  };
}

export default errorReporter;