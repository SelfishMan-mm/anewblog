export const siteConfig = {
  name: "Meless",
  title: "Meless - My Website",
  description: "我是Meless，一个专注于数据分析和机器学习的数据分析师。",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://meless.dev",
  ogImage: "/avatar.jpg",
  keywords: ["Meless", "数据分析", "机器学习", "Python", "C++", "个人网站"],
  author: {
    name: "Meless",
    url: "https://meless.dev",
    email: "contact@meless.dev"
  },
  links: {
    github: "https://github.com/meless",
    twitter: "https://twitter.com/meless"
  }
} as const;

export type SiteConfig = typeof siteConfig;