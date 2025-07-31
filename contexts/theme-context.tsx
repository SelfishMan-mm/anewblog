'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { STORAGE_KEYS, DEFAULT_VALUES } from '@/lib/constants';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
  toggleAnimations: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_VALUES.THEME,
  storageKey = STORAGE_KEYS.THEME,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [animationsEnabled, setAnimationsEnabledState] = useState<boolean>(DEFAULT_VALUES.ANIMATIONS_ENABLED);
  const [mounted, setMounted] = useState(false);

  // 初始化主题
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem(storageKey) as Theme;
      const storedAnimations = localStorage.getItem(STORAGE_KEYS.ANIMATIONS_ENABLED);
      
      if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
        setThemeState(storedTheme);
      }
      
      if (storedAnimations !== null) {
        setAnimationsEnabledState(JSON.parse(storedAnimations));
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
    }
    setMounted(true);
  }, [storageKey]);

  // 应用主题到 DOM
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    
    // 移除之前的主题类
    root.classList.remove('light', 'dark');
    
    // 添加当前主题类
    root.classList.add(theme);
    
    // 保存到 localStorage
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, [theme, storageKey, mounted]);

  // 应用动画设置
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    
    if (animationsEnabled) {
      root.classList.remove('reduce-motion');
    } else {
      root.classList.add('reduce-motion');
    }
    
    // 保存到 localStorage
    try {
      localStorage.setItem(STORAGE_KEYS.ANIMATIONS_ENABLED, JSON.stringify(animationsEnabled));
    } catch (error) {
      console.warn('Failed to save animations setting to localStorage:', error);
    }
  }, [animationsEnabled, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setAnimationsEnabled = (enabled: boolean) => {
    setAnimationsEnabledState(enabled);
  };

  const toggleAnimations = () => {
    setAnimationsEnabledState(prev => !prev);
  };

  const value: ThemeContextType = {
    theme,
    setTheme,
    toggleTheme,
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

// 主题切换按钮组件
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex h-10 w-10 items-center justify-center rounded-md
        border border-border bg-background text-foreground
        hover:bg-accent hover:text-accent-foreground
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
        transition-colors duration-200
        ${className}
      `}
      aria-label={`切换到${theme === 'light' ? '深色' : '浅色'}模式`}
    >
      {theme === 'light' ? (
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