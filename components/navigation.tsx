'use client';

import { FloatingDock } from "@/components/ui/floating-dock";
import { navigationConfig } from "@/config/navigation";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useEffect } from "react";
import { useNavVisibility } from "@/hooks/use-nav-visibility";

export function Navigation() {
  // 获取所有导航项的href（去掉#号）
  const sectionIds = navigationConfig.map((item) => item.href.slice(1));
  
  // 使用useScrollSpy监听滚动
  const activeSection = useScrollSpy({
    sectionIds,
    offset: 100,
  });

  // 平滑滚动配置
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  // 准备导航项，添加高亮样式
  const items = navigationConfig.map((item) => ({
    ...item,
    icon: (props?: { className?: string }) =>
      item.icon({
        ...props,
        className: `${props?.className || ""} ${
          activeSection === item.href.slice(1)
            ? "text-blue-500 dark:text-blue-400"
            : "text-gray-500 dark:text-gray-400"
        }`,
      }),
  }));

  const isVisible = useNavVisibility(100);

  return (
    <div
      className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
      <FloatingDock
        items={items}
        desktopClassName="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        mobileClassName="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
      />
    </div>
  );
}
