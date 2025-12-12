export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

// 简化的导航配置，不使用图标
export const navigationConfig = [
  {
    id: 'home',
    label: '首页',
    href: '/',
  },
  {
    id: 'about',
    label: '关于我',
    href: '/about',
  },
  {
    id: 'doing',
    label: '我正在做什么',
    href: '/doing',
  },
  {
    id: 'contact',
    label: '联系我',
    href: '/contact',
  },
] as const;

export default navigationConfig;