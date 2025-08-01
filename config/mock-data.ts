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
    title: "躺平大师",
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
    interests: ["玩Apex", "听音乐（周杰伦）", "Coding"],
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
      name: "TypeScript",
      level: 80,
      category: "编程语言",
      icon: "/icons/BxlTypescript.svg",
    },
  ],

  // 专业技能和数据库（用于滚动展示）
  skillGroups: [
    {
      group: "专业技能",
      skills: [
        {
          name: "数据爬取与分析",
          level: 88,
          description: "网络数据采集和处理",
        },
        {
          name: "WEB3",
          level: 75,
          description: "区块链和去中心化应用",
        },
        {
          name: "AI-Agent",
          level: 80,
          description: "智能代理和自动化",
        },
        {
          name: "数据可视化",
          level: 85,
          description: "数据图表和可视化展示",
        },
        {
          name: "数据清洗",
          level: 87,
          description: "数据预处理和质量控制",
        },
      ],
    },
    {
      group: "数据库",
      skills: [
        {
          name: "MySQL",
          level: 80,
          description: "关系型数据库管理",
        },
        {
          name: "MongoDB",
          level: 40,
          description: "NoSQL文档数据库",
        },
      ],
    },
  ],

  projects: [
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
      featured: true,
      status: "completed",
      startDate: "2025-05-01",
      endDate: "2025-05-15",
    },
    {
      id: "2",
      name: "CryptoDash",
      description: "加密货币数据分析仪表板，提供实时价格监控和技术分析工具。",
      longDescription:
        "一个专业的加密货币数据分析平台，集成了多个交易所的实时数据，提供价格监控、技术指标分析、投资组合管理等功能。使用 Python Flask 作为后端，Web3 技术获取区块链数据，Chart.js 实现数据可视化。该项目展示了我在数据分析、Web开发和区块链技术方面的综合能力。",
      image: "/CryptoDash.png",
      techStack: ["Python", "Flask", "Web3", "数据分析", "Chart.js", "API集成"],
      githubUrl: "https://github.com/SelfishMan-mm/CryptoDash",
      liveUrl: "https://cryptodash-demo.vercel.app",
      category: "数据分析",
      featured: true,
      status: "completed",
      startDate: "2025-06-10",
      endDate: "2025-07-20",
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
    {
      id: "4",
      name: "AI智能助手",
      description: "基于大语言模型的智能对话助手，支持多种任务处理。",
      longDescription:
        "一个集成了最新AI技术的智能助手项目，支持自然语言对话、代码生成、文档分析等多种功能。使用了Transformer架构和微调技术，能够理解用户意图并提供准确的回答。项目展示了我在AI-Agent开发和大模型应用方面的探索。",
      image: "",
      techStack: ["Python", "PyTorch", "Transformers", "FastAPI", "AI-Agent"],
      githubUrl: "https://github.com/SelfishMan-mm/ai-assistant",
      category: "机器学习",
      featured: true,
      status: "in-progress",
      startDate: "2025-04-15",
    },
    {
      id: "5",
      name: "DeFi数据分析平台",
      description: "去中心化金融数据分析平台，提供DeFi协议数据监控和分析。",
      longDescription:
        "专注于DeFi生态的数据分析平台，集成了主流DeFi协议的数据，提供流动性分析、收益率计算、风险评估等功能。使用Web3技术直接从区块链获取数据，确保数据的准确性和实时性。该项目结合了我在区块链和数据分析方面的技能。",
      image: "",
      techStack: ["Solidity", "Web3", "Python", "React", "DeFi协议"],
      githubUrl: "https://github.com/SelfishMan-mm/defi-analytics",
      category: "区块链",
      featured: false,
      status: "planned",
      startDate: "2025-08-01",
    },
    {
      id: "6",
      name: "个人网站",
      description: "现代化的个人展示网站，采用最新的前端技术栈构建。",
      longDescription:
        "这个个人网站项目采用了Next.js、TypeScript、TailwindCSS等现代前端技术，集成了丰富的动效组件和响应式设计。网站展示了我的项目作品、技术技能和成长历程，是我前端开发能力的综合体现。",
      image: "",
      techStack: [
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "Framer Motion",
        "Vercel",
      ],
      githubUrl: "https://github.com/SelfishMan-mm/personal-website",
      liveUrl: "https://meless.dev",
      category: "前端开发",
      featured: true,
      status: "in-progress",
      startDate: "2025-07-25",
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
      "我是Meless，一个专注于数据分析和机器学习的躺平大师。这里展示我的项目作品、技术技能和成长历程。",
    keywords: [
      "Meless",
      "数据分析",
      "机器学习",
      "Python",
      "C++",
      "个人网站",
      "躺平大师",
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
