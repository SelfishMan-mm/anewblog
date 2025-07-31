export const siteConfig = {
  name: "Meless",
  title: "Meless - 躺平大师 | 个人网站",
  description: "我是Meless，一个专注于数据分析和机器学习的躺平大师。这里展示我的项目作品、技术技能和成长历程。",
  url: "https://meless.dev", // 替换为实际域名
  ogImage: "/og-image.png",
  keywords: ["Meless", "数据分析", "机器学习", "Python", "C++", "个人网站"] as const,
  author: {
    name: "Meless",
    email: "779279397@qq.com",
    github: "https://github.com/SelfishMan-mm",
    bilibili: "https://space.bilibili.com/632873241?spm_id_from=333.1007.0.0"
  },
  links: {
    github: "https://github.com/SelfishMan-mm",
    bilibili: "https://space.bilibili.com/632873241?spm_id_from=333.1007.0.0"
  }
} as const;

export type SiteConfig = typeof siteConfig;