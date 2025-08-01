'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { STORAGE_KEYS } from '@/lib/constants';

type Theme = 'dark'; // 固定深色主题

interface ThemeContextType {
  theme: Theme;
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
  toggleAnimations: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [animationsEnabled, setAnimationsEnabledState] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  // 初始化动画设置
  useEffect(() => {
    try {
      const storedAnimations = localStorage.getItem(STORAGE_KEYS.ANIMATIONS_ENABLED);
      
      if (storedAnimations !== null) {
        setAnimationsEnabledState(JSON.parse(storedAnimations));
      }
    } catch (error) {
      console.warn('Failed to load animations setting from localStorage:', error);
    }
    setMounted(true);
  }, []);

  // 应用主题到 DOM
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    
    // 移除之前的主题类
    root.classList.remove('light', 'dark');
    
    // 添加当前主题类 - 固定为深色主题
    root.classList.add('dark');
    
    // 保存到 localStorage
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, [mounted]);

  // 应用固定深色主题和动画设置
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    
    // 固定应用深色主题
    root.classList.remove('light');
    root.classList.add('dark');
    
    // 应用动画设置
    if (animationsEnabled) {
      root.classList.remove('reduce-motion');
    } else {
      root.classList.add('reduce-motion');
    }
    
    // 保存动画设置到 localStorage
    try {
      localStorage.setItem(STORAGE_KEYS.ANIMATIONS_ENABLED, JSON.stringify(animationsEnabled));
    } catch (error) {
      console.warn('Failed to save animations setting to localStorage:', error);
    }
  }, [animationsEnabled, mounted]);

  const setAnimationsEnabled = (enabled: boolean) => {
    setAnimationsEnabledState(enabled);
  };

  const toggleAnimations = () => {
    setAnimationsEnabledState(prev => !prev);
  };

  const value: ThemeContextType = {
    theme: 'dark', // 固定深色主题
    animationsEnabled,
    setAnimationsEnabled,
    toggleAnimations,
  };

  // 避免服务端渲染不匹配
  if (!mounted) {
    return (
      <ThemeContext.Provider value={value}>
        <div className="opacity-0">
          {children}
        </div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// 动画切换按钮组件（替代主题切换）
export function AnimationToggle({ className }: { className?: string }) {
  const { animationsEnabled, toggleAnimations } = useTheme();

  return (
    <button
      onClick={toggleAnimations}
      className={`
        relative inline-flex h-10 w-10 items-center justify-center rounded-md
        border border-border bg-background text-foreground
        hover:bg-accent hover:text-accent-foreground
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
        transition-colors duration-200
        ${className}
      `}
      aria-label={`${animationsEnabled ? '禁用' : '启用'}动画效果`}
    >
      {animationsEnabled ? (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ) : (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}
    </button>
  );
}