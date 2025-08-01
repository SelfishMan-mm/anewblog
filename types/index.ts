// 基础类型定义
export interface PersonalInfo {
  name: string;
  title: string;
  motto: string[];
  avatar: string;
  bio: string;
  location: string;
  education: Education[];
  interests: string[];
}

export interface Education {
  school: string;
  major: string;
  period: string;
  type: 'education';
}

export interface Skill {
  name: string;
  level: number;
  category: string;
  icon?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  image: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  startDate: string;
  endDate?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'education' | 'work' | 'project' | 'achievement';
}

export interface ContactInfo {
  type: 'email' | 'phone' | 'wechat';
  value: string;
  label?: string;
  qrCode?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ThemeConfig {
  primaryColor: string;
  accentColor: string;
  secondaryAccent: string;
  textColor: string;
  backgroundStyle: 'meteors' | 'boxes' | 'gradient';
  animationIntensity: 'low' | 'medium' | 'high';
}

export interface SkillGroup {
  group: string;
  skills: Array<{
    name: string;
    level: number;
    description: string;
  }>;
}

export interface SiteConfig {
  personal: PersonalInfo;
  skills: Skill[];
  skillGroups?: SkillGroup[];
  projects: Project[];
  timeline: TimelineEvent[];
  contacts: ContactInfo[];
  socialLinks: SocialLink[];
  theme: ThemeConfig;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  story: {
    personalStory: string;
    careerPlan: string;
    learningPlan: string;
  };
}

// 组件 Props 类型
export interface NavigationProps {
  sections: NavigationSection[];
  activeSection: string;
}

export interface NavigationSection {
  id: string;
  label: string;
  href: string;
}

export interface HeroSectionProps {
  profile: {
    avatar: string;
    name: string;
    title: string;
    motto: string[];
  };
  backgroundEffect?: 'meteors' | 'particles' | 'orbiting';
}

export interface SkillsSectionProps {
  skills: Skill[];
  displayMode?: 'orbiting' | 'marquee';
}

export interface PortfolioSectionProps {
  projects: Project[];
}

export interface TimelineSectionProps {
  events: TimelineEvent[];
}

export interface ContactSectionProps {
  contacts: ContactInfo[];
  socialLinks: SocialLink[];
}

// Hook 类型
export interface UseScrollSpyProps {
  sectionIds: string[];
  offset?: number;
}

export interface UseThemeProps {
  defaultTheme?: 'light' | 'dark';
}

export interface UseAnimationControlProps {
  threshold?: number;
  triggerOnce?: boolean;
}

// 应用状态类型
export interface AppState {
  activeSection: string;
  theme: 'light' | 'dark';
  animationsEnabled: boolean;
  mobileMenuOpen: boolean;
}

// 动画相关类型
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
  repeat?: number;
}

export interface TypewriterConfig {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  startDelay?: number;
  loop?: boolean;
}

// 组件变体类型
export type SkillDisplayMode = 'orbiting' | 'marquee';
export type BackgroundEffect = 'meteors' | 'particles';

// 响应式断点类型
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// 主题相关类型
export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
}

// 表单相关类型
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// 错误处理类型
export interface ErrorInfo {
  message: string;
  code?: string;
  details?: any;
}

// 加载状态类型
export interface LoadingState {
  isLoading: boolean;
  progress?: number;
  message?: string;
}

// 搜索和过滤类型
export interface FilterOptions {
  category?: string;
  status?: Project['status'];
  featured?: boolean;
  techStack?: string[];
}

export interface SearchOptions {
  query: string;
  filters?: FilterOptions;
  sortBy?: 'date' | 'name' | 'featured';
  sortOrder?: 'asc' | 'desc';
}

// 性能监控类型
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
  memoryUsage?: number;
}

// 可访问性类型
export interface A11yConfig {
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large';
  screenReader: boolean;
}

// 国际化类型
export type Locale = 'zh-CN' | 'en-US';

export interface I18nConfig {
  locale: Locale;
  messages: Record<string, string>;
}

// 分析和统计类型
export interface AnalyticsEvent {
  name: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
}

// 导出所有类型的联合类型
export type AllTypes = 
  | PersonalInfo 
  | Education 
  | Skill 
  | Project 
  | TimelineEvent 
  | ContactInfo 
  | SocialLink 
  | ThemeConfig 
  | SiteConfig;