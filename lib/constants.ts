// 应用常量定义

// 动画配置常量
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000
} as const;

export const ANIMATION_EASING = {
  EASE_IN: 'ease-in',
  EASE_OUT: 'ease-out',
  EASE_IN_OUT: 'ease-in-out',
  BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  SMOOTH: 'cubic-bezier(0.4, 0, 0.2, 1)'
} as const;

// 打字机效果配置
export const TYPEWRITER_CONFIG = {
  TYPE_SPEED: 50,
  BACK_SPEED: 30,
  BACK_DELAY: 1500,
  START_DELAY: 500,
  CURSOR_CHAR: '|'
} as const;

// 响应式断点
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
} as const;

// 颜色常量
export const COLORS = {
  PRIMARY: '#3b82f6',
  SECONDARY: '#8b5cf6',
  ACCENT: '#06b6d4',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#3b82f6'
} as const;

// 技能等级定义
export const SKILL_LEVELS = {
  BEGINNER: { min: 0, max: 49, label: '初学者', color: '#ef4444' },
  INTERMEDIATE: { min: 50, max: 69, label: '中级', color: '#f59e0b' },
  ADVANCED: { min: 70, max: 89, label: '高级', color: '#3b82f6' },
  EXPERT: { min: 90, max: 100, label: '专家', color: '#10b981' }
} as const;

// 项目状态配置
export const PROJECT_STATUS = {
  COMPLETED: { label: '已完成', color: '#10b981', icon: '✅' },
  IN_PROGRESS: { label: '进行中', color: '#f59e0b', icon: '🚧' },
  PLANNED: { label: '计划中', color: '#6b7280', icon: '📋' }
} as const;

// 时间轴事件类型配置
export const TIMELINE_TYPES = {
  EDUCATION: { label: '教育经历', color: '#3b82f6', icon: '🎓' },
  WORK: { label: '工作经历', color: '#10b981', icon: '💼' },
  PROJECT: { label: '项目经历', color: '#8b5cf6', icon: '🚀' },
  ACHIEVEMENT: { label: '成就荣誉', color: '#f59e0b', icon: '🏆' }
} as const;

// 社交媒体配置
export const SOCIAL_PLATFORMS = {
  GITHUB: { name: 'GitHub', color: '#333', baseUrl: 'https://github.com/' },
  BILIBILI: { name: 'B站', color: '#00a1d6', baseUrl: 'https://space.bilibili.com/' },
  LINKEDIN: { name: 'LinkedIn', color: '#0077b5', baseUrl: 'https://linkedin.com/in/' },
  TWITTER: { name: 'Twitter', color: '#1da1f2', baseUrl: 'https://twitter.com/' },
  WECHAT: { name: '微信', color: '#07c160', baseUrl: '' },
  EMAIL: { name: '邮箱', color: '#ea4335', baseUrl: 'mailto:' }
} as const;

// 文件类型配置
export const FILE_TYPES = {
  IMAGE: {
    EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    MIME_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
  },
  DOCUMENT: {
    EXTENSIONS: ['.pdf', '.doc', '.docx', '.txt'],
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    MIME_TYPES: ['application/pdf', 'application/msword', 'text/plain']
  }
} as const;

// API 配置
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
} as const;

// 本地存储键名
export const STORAGE_KEYS = {
  THEME: 'meless-theme',
  LANGUAGE: 'meless-language',
  ANIMATIONS_ENABLED: 'meless-animations',
  VISITED_SECTIONS: 'meless-visited-sections',
  USER_PREFERENCES: 'meless-preferences'
} as const;

// 页面配置
export const PAGE_CONFIG = {
  ITEMS_PER_PAGE: 6,
  MAX_SEARCH_RESULTS: 50,
  DEBOUNCE_DELAY: 300,
  SCROLL_OFFSET: 80,
  LAZY_LOAD_THRESHOLD: 0.1
} as const;

// SEO 配置
export const SEO_CONFIG = {
  DEFAULT_TITLE: 'Meless - 躺平大师',
  TITLE_TEMPLATE: '%s | Meless',
  DEFAULT_DESCRIPTION: '我是Meless，一个专注于数据分析和机器学习的躺平大师。',
  DEFAULT_KEYWORDS: ['Meless', '数据分析', '机器学习', 'Python', 'C++', '个人网站'],
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://meless.dev',
  TWITTER_HANDLE: '@meless',
  AUTHOR: 'Meless'
} as const;

// 错误消息
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '网络连接失败，请检查网络设置',
  SERVER_ERROR: '服务器错误，请稍后重试',
  NOT_FOUND: '请求的资源不存在',
  VALIDATION_ERROR: '输入数据格式不正确',
  PERMISSION_DENIED: '权限不足，无法执行此操作',
  TIMEOUT_ERROR: '请求超时，请重试',
  UNKNOWN_ERROR: '未知错误，请联系管理员'
} as const;

// 成功消息
export const SUCCESS_MESSAGES = {
  FORM_SUBMITTED: '表单提交成功',
  DATA_SAVED: '数据保存成功',
  EMAIL_SENT: '邮件发送成功',
  SETTINGS_UPDATED: '设置更新成功'
} as const;

// 正则表达式
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^1[3-9]\d{9}$/,
  URL: /^https?:\/\/.+/,
  GITHUB_USERNAME: /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/,
  CHINESE_NAME: /^[\u4e00-\u9fa5]{2,4}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
} as const;

// 默认配置值
export const DEFAULT_VALUES = {
  THEME: 'dark' as const,
  LANGUAGE: 'zh-CN' as const,
  ANIMATIONS_ENABLED: true,
  SKILL_DISPLAY_MODE: 'orbiting' as const,
  PROJECT_DISPLAY_MODE: '3d-marquee' as const,
  BACKGROUND_EFFECT: 'meteors' as const
} as const;

// 性能监控阈值
export const PERFORMANCE_THRESHOLDS = {
  LOAD_TIME: 3000, // 3秒
  RENDER_TIME: 1000, // 1秒
  INTERACTION_TIME: 100, // 100毫秒
  MEMORY_USAGE: 50 * 1024 * 1024 // 50MB
} as const;

// 可访问性配置
export const A11Y_CONFIG = {
  FOCUS_VISIBLE_OUTLINE: '2px solid #3b82f6',
  MIN_CONTRAST_RATIO: 4.5,
  MIN_TOUCH_TARGET_SIZE: 44, // px
  MAX_LINE_LENGTH: 80, // characters
  ANIMATION_DURATION_THRESHOLD: 5000 // 5秒
} as const;

// 导出所有常量的类型
export type AnimationDuration = typeof ANIMATION_DURATION[keyof typeof ANIMATION_DURATION];
export type AnimationEasing = typeof ANIMATION_EASING[keyof typeof ANIMATION_EASING];
export type SkillLevel = keyof typeof SKILL_LEVELS;
export type ProjectStatusType = keyof typeof PROJECT_STATUS;
export type TimelineType = keyof typeof TIMELINE_TYPES;
export type SocialPlatform = keyof typeof SOCIAL_PLATFORMS;