import type { SiteConfig } from "@/types";

// 简单的占位符生成函数
function getProjectPlaceholder(projectName: string, seed: number = 1): string {
  const colors = [
    ['#3b82f6', '#1e40af'],
    ['#8b5cf6', '#7c3aed'],
    ['#06b6d4', '#0891b2'],
    ['#10b981', '#059669'],
    ['#f59e0b', '#d97706'],
    ['#ef4444', '#dc2626'],
  ];
  
  const colorPair = colors[seed % colors.length];
  const [color1, color2] = colorPair;
  
  const svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad${seed})" />
    <text x="50%" y="40%" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">${projectName}</text>
    <text x="50%" y="60%" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="14">Project Preview</text>
  </svg>`;
  
  try {
    const base64 = typeof window !== 'undefined' ? btoa(svg) : Buffer.from(svg).toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
  } catch {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }
}

function getAvatarPlaceholder(name: string, size: number = 128): string {
  const initial = name.charAt(0).toUpperCase();
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="hsl(${hue}, 65%, 50%)" />
    <text x="50%" y="50%" text-anchor="middle" dy="0.35em" fill="white" font-family="Arial, sans-serif" font-size="${size * 0.4}" font-weight="bold">${initial}</text>
  </svg>`;
  
  try {
    const base64 = typeof window !== 'undefined' ? btoa(svg) : Buffer.from(svg).toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
  } catch {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }
}

function getSkillIconPlaceholder(skillName: string, size: number = 32): string {
  const initial = skillName.charAt(0).toUpperCase();
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" rx="${size * 0.2}" fill="#6b7280" />
    <text x="50%" y="50%" text-anchor="middle" dy="0.35em" fill="white" font-family="Arial, sans-serif" font-size="${size * 0.5}" font-weight="bold">${initial}</text>
  </svg>`;
  
  try {
    const base64 = typeof window !== 'undefined' ? btoa(svg) : Buffer.from(svg).toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
  } catch {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }
}

// 开发测试用的示例数据
export const mockSiteData: SiteConfig = {
  personal: {
    name: "Meless",
    title: "啥都会一点的平凡程序员",
    motto: [
      "一路寒风身入絮，命海浮沉客独行",
      "惊鸿四散鱼逃尽，唯有残帆傲此间",
      "独帜入渊深未知，身似浮萍命难持",
      "身如柳絮随风扬，无论云泥意贯一",
    ],
    avatar: "/avatar.jpg",
    bio: "",
    location: "苏州",
    education: [
      {
        school: "苏州经贸职业技术学院",
        major: "大数据技术",
        period: "2023.9 - 2026.6",
        type: "education",
      },
    ],
    interests: ["Apex", "听音乐", "Coding"],
  },

  skills: [
    // 编程语言（用于环绕展示）
    {
      name: "Python",
      level: 90,
      category: "编程语言",
      icon: "/icons/python.svg",
    },
    {
      name: "C++",
      level: 85,
      category: "编程语言",
      icon: "/icons/c.svg",
    },
    {
      name: "React",
      level: 80,
      category: "编程语言",
      icon: "/icons/react.png",
    },
    // 深耕领域
    {
      name: "数据分析",
      level: 88,
      category: "深耕领域",
      icon: "/icons/data.svg",
    },
    {
      name: "Web3",
      level: 75,
      category: "深耕领域",
      icon: "/icons/web3.svg",
    },
    {
      name: "AI",
      level: 80,
      category: "深耕领域",
      icon: "/icons/ai.svg",
    },
  ],

  // 专业技能和数据库（用于滚动展示）
  skillGroups: [
    {
      group: "专业技能",
      skills: [
        {
          name: "Web3 生态研究 & 赛道扫描",
          level: 70,
          description: "区块链生态分析与趋势洞察",
        },
        {
          name: "智能合约原理与 DApp 交互流程",
          level: 60,
          description: "智能合约开发与去中心化应用交互",
        },
        {
          name: "链上数据抓取与可视化",
          level: 70,
          description: "区块链数据采集与图表展示",
        },
        {
          name: "AI-Agent",
          level: 80,
          description: "智能代理和自动化",
        },
        {
          name: "数据清洗 / Pandas",
          level: 80,
          description: "数据预处理和质量控制",
        },
        {
          name: "MySQL",
          level: 80,
          description: "关系型数据库管理",
        },
        {
          name: "Next.js / React",
          level: 85,
          description: "现代化全栈框架与前端开发",
        },
      ],
    },
  ],

  projects: [
    {
      id: "6",
      name: "个人网站",
      description: "基于 Next.js 14 的现代化个人展示网站，集成炫酷动效和响应式设计。",
      longDescription:
        "这是一个功能完整的现代化个人网站，采用 Next.js 14 App Router 架构，TypeScript 提供类型安全，TailwindCSS 构建现代 UI 风格。网站集成了丰富的交互动效，包括粒子背景、3D 卡片展示、轨道环绕技能展示、时间轴动画等。具备完整的页面结构：首页英雄区域、技能展示、项目作品集、关于我页面、成长经历时间轴、联系方式和留言板功能。采用 Framer Motion 实现流畅的页面过渡和元素动画，支持动画开关控制，适配移动端和桌面端。项目展示了我在现代前端开发、UI/UX 设计和动效实现方面的综合能力。",
      image: "/personal-website.png",
      techStack: [
        "Next.js 14",
        "TypeScript",
        "TailwindCSS",
        "Framer Motion",
        "React",
        "Vercel",
        "ESLint",
        "PostCSS",
      ],
      githubUrl: "https://github.com/SelfishMan-mm/anewblog",
      liveUrl: "https://meless.dev",
      category: "前端开发",
      featured: true,
      status: "completed",
      startDate: "2025-11-15",
      endDate: "2025-12-02",
    },
    {
      id: "1",
      name: "cpp-chatroom",
      description:
        "基于 C++ 开发的多人聊天室系统，支持实时消息传输和用户管理功能。",
      longDescription:
        "这是一个完整的多人聊天室系统，采用 C++ 开发，支持多客户端同时连接。系统实现了用户注册登录、实时消息传输、私聊和群聊功能。使用了 Socket 编程实现网络通信，多线程技术处理并发连接，确保系统的稳定性和高性能。项目展示了我在系统编程、网络编程和并发处理方面的技术能力。",
      image: "/cpp-chatroom.jpg",
      techStack: ["C++", "Socket编程", "多线程", "Linux", "网络编程"],
      githubUrl: "https://github.com/SelfishMan-mm/cpp-chatroom",
      category: "系统开发",
      featured: false,
      status: "completed",
      startDate: "2025-05-01",
      endDate: "2025-05-15",
    },
    {
      id: "3",
      name: "数据爬虫工具",
      description:
        "高效的网络数据爬取工具，支持多种网站和数据格式的自动化采集。",
      longDescription:
        "一个通用的网络数据爬取框架，支持多种网站的数据采集。集成了 Scrapy 框架的高性能爬取能力，BeautifulSoup 的灵活解析功能，以及 Selenium 的动态页面处理能力。数据存储支持 MongoDB，具有良好的扩展性。该工具已成功应用于多个数据采集项目。",
      image: "/数据爬虫工具.png",
      techStack: [
        "Python",
        "Scrapy",
        "BeautifulSoup",
        "Selenium",
        "MongoDB",
        "数据处理",
      ],
      githubUrl: "https://github.com/SelfishMan-mm/spider-tool",
      category: "数据工程",
      featured: false,
      status: "in-progress",
      startDate: "2025-06-01",
    },
  ],

  timeline: [
    {
      id: "1",
      date: "2023.6",
      title: "高考完成",
      description: "完成高中学业，为进入大学做准备",
      type: "education",
    },
    {
      id: "2",
      date: "2023.9",
      title: "进入苏州经贸职业技术学院",
      description: "开始大数据技术专业的学习，踏上技术之路",
      type: "education",
    },
    {
      id: "3",
      date: "2024.12",
      title: "开始学习C++",
      description: "踏入编程世界，开始系统性学习编程语言",
      type: "project",
    },
    {
      id: "4",
      date: "2025.1",
      title: "阅读蛊真人",
      description: "拓展知识面，培养阅读习惯和思维能力",
      type: "achievement",
    },
    {
      id: "5",
      date: "2025.4",
      title: "接触AI技术",
      description: "开始接触到最新AI技术，探索人工智能领域的无限可能",
      type: "project",
    },
    {
      id: "6",
      date: "2025.5",
      title: "完成C++聊天室项目",
      description: "成功开发并完成了第一个完整的系统级项目",
      type: "achievement",
    },
    {
      id: "7",
      date: "2025.6",
      title: "开始数据分析项目",
      description: "将学习重点转向数据分析和机器学习领域",
      type: "project",
    },
    {
      id: "8",
      date: "2025.7",
      title: "持续学习与反思",
      description: "不断学习新技术，发现自身弱点，持续改进和成长",
      type: "achievement",
    },
  ],

  contacts: [
    {
      type: "email",
      value: "2779279397@qq.com",
      label: "QQ邮箱",
    },
  ],

  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/SelfishMan-mm",
      icon: "/icons/github.svg",
    },
    {
      platform: "B站",
      url: "https://space.bilibili.com/632873241?spm_id_from=333.1007.0.0",
      icon: "/icons/bilibili.svg",
    },
  ],

  theme: {
    primaryColor: "#3b82f6",
    accentColor: "#3b82f6",
    secondaryAccent: "#8b5cf6",
    textColor: "#ffffff",
    backgroundStyle: "meteors",
    animationIntensity: "medium",
  },

  seo: {
    title: "Meless - 独游的小船 | 个人网站",
    description:
      "我是Meless，一个专注于数据分析和机器学习的数据分析师。这里展示我的项目作品、技术技能和成长历程。",
    keywords: [
      "Meless",
      "数据分析",
      "机器学习",
      "Python",
      "C++",
      "个人网站",
      "数据分析师",
      "苏州",
      "大数据技术",
    ],
  },

  story: {
    personalStory:
      "我只不过是个平凡人啊，努力的想要走出平凡深渊。",
    careerPlan:
      "未来躺平吧，后面可能会走数据分析师或者去干Web3或者去干大模型。虽然说是躺平，但其实是想找到真正适合自己的方向，然后专注地做下去。",
    learningPlan:
      "深入学习机器学习领域，特别是大语言模型和AI-Agent的开发。同时也会继续关注Web3和区块链技术的发展，保持技术的敏感度。",
  },
};

// 额外的测试数据
export const additionalMockData = {
  // 技能分类统计
  skillStats: {
    total: 15,
    categories: {
      编程语言: 4,
      数据工程: 3,
      机器学习: 2,
      区块链: 2,
      数据库: 2,
      前端框架: 2,
    },
    averageLevel: 73,
    topSkills: ["Python", "Pandas", "C++", "NumPy", "Scrapy"],
  },

  // 项目统计
  projectStats: {
    total: 6,
    completed: 2,
    inProgress: 3,
    planned: 1,
    featured: 4,
    categories: {
      系统开发: 1,
      数据分析: 1,
      数据工程: 1,
      机器学习: 1,
      区块链: 1,
      前端开发: 1,
    },
  },

  // 时间轴统计
  timelineStats: {
    total: 8,
    byType: {
      education: 2,
      project: 3,
      achievement: 3,
      work: 0,
    },
    byYear: {
      "2023": 2,
      "2024": 1,
      "2025": 5,
    },
  },
};

export default mockSiteData;
