import { SiteConfig } from '@/types';

// 基于真实材料的完整网站数据配置
export const siteData: SiteConfig = {
  personal: {
    name: 'Meless',
    title: '躺平大师',
    motto: [
      '一路寒风身如絮，命海浮沉客独行',
      '独帜入渊深未知，身似浮萍命难持',
      '惊鸿四散鱼逃尽，唯有残帆傲此间',
      '身如柳絮随风扬，无论云泥意贯一'
    ],
    avatar: '/images/avatar.jpg',
    bio: '我只不过是个平凡人啊',
    location: '苏州',
    education: [
      {
        school: '苏州经贸职业技术学院',
        major: '大数据技术',
        period: '2023.9 - 2026.6',
        type: 'education'
      }
    ],
    interests: ['玩Apex', '听音乐（周杰伦）', 'Coding']
  },

  skills: [
    {
      name: 'C++',
      level: 85,
      category: '编程语言',
      icon: '/icons/c_original_logo_icon_146611.svg'
    },
    {
      name: 'Python',
      level: 90,
      category: '编程语言',
      icon: '/icons/python_original_logo_icon_146381.svg'
    },
    {
      name: 'Scrapy',
      level: 80,
      category: '数据工程',
      icon: '/icons/scrapy.svg'
    },
    {
      name: 'Pandas',
      level: 85,
      category: '数据工程',
      icon: '/icons/pandas.svg'
    },
    {
      name: 'NumPy',
      level: 80,
      category: '数据工程',
      icon: '/icons/numpy.svg'
    },
    {
      name: 'Matplotlib',
      level: 75,
      category: '数据工程',
      icon: '/icons/matplotlib.svg'
    },
    {
      name: 'Seaborn',
      level: 70,
      category: '数据工程',
      icon: '/icons/seaborn.svg'
    },
    {
      name: 'Power BI',
      level: 75,
      category: '数据工程',
      icon: '/icons/powerbi.svg'
    },
    {
      name: '机器学习',
      level: 75,
      category: '机器学习',
      icon: '/icons/ml.svg'
    },
    {
      name: '深度学习',
      level: 70,
      category: '机器学习',
      icon: '/icons/dl.svg'
    },
    {
      name: 'PyTorch',
      level: 70,
      category: '机器学习',
      icon: '/icons/pytorch.svg'
    },
    {
      name: 'AI-Agent开发',
      level: 65,
      category: '机器学习',
      icon: '/icons/ai-agent.svg'
    },
    {
      name: 'Web3.js',
      level: 65,
      category: '区块链',
      icon: '/icons/web3.svg'
    },
    {
      name: 'Solidity',
      level: 60,
      category: '区块链',
      icon: '/icons/solidity.svg'
    },
    {
      name: 'MySQL',
      level: 75,
      category: '数据库',
      icon: '/icons/mysql.svg'
    }
  ],

  projects: [
    {
      id: '1',
      name: 'cpp-chatroom',
      description: '基于 C++ 开发的多人聊天室系统，支持实时消息传输和用户管理功能。',
      longDescription: '这是一个完整的多人聊天室系统，采用 C++ 开发，支持多客户端同时连接。系统实现了用户注册登录、实时消息传输、私聊和群聊功能。使用了 Socket 编程实现网络通信，多线程技术处理并发连接，确保系统的稳定性和高性能。',
      image: '/images/projects/cpp-chatroom.jpg',
      techStack: ['C++', 'Socket编程', '多线程', 'Linux'],
      githubUrl: 'https://github.com/SelfishMan-mm/cpp-chatroom',
      category: '系统开发',
      featured: true,
      status: 'completed',
      startDate: '2025-05-01',
      endDate: '2025-05-15'
    },
    {
      id: '2',
      name: 'CryptoDash',
      description: '加密货币数据分析仪表板，提供实时价格监控和技术分析工具。',
      longDescription: '一个专业的加密货币数据分析平台，集成了多个交易所的实时数据，提供价格监控、技术指标分析、投资组合管理等功能。使用 Python Flask 作为后端，Web3 技术获取区块链数据，Chart.js 实现数据可视化。',
      image: '/images/projects/CryptoDash.png',
      techStack: ['Python', 'Flask', 'Web3', '数据分析', 'Chart.js'],
      githubUrl: 'https://github.com/SelfishMan-mm/CryptoDash',
      category: '数据分析',
      featured: true,
      status: 'completed',
      startDate: '2025-06-10',
      endDate: '2025-07-20'
    },
    {
      id: '3',
      name: '数据爬虫工具',
      description: '高效的网络数据爬取工具，支持多种网站和数据格式的自动化采集。',
      longDescription: '一个通用的网络数据爬取框架，支持多种网站的数据采集。集成了 Scrapy 框架的高性能爬取能力，BeautifulSoup 的灵活解析功能，以及 Selenium 的动态页面处理能力。数据存储支持 MongoDB，具有良好的扩展性。',
      image: '/images/projects/数据爬虫工具.png',
      techStack: ['Python', 'Scrapy', 'BeautifulSoup', 'Selenium', 'MongoDB'],
      githubUrl: 'https://github.com/SelfishMan-mm',
      category: '数据工程',
      featured: false,
      status: 'in-progress',
      startDate: '2025-06-01'
    }
  ],

  timeline: [
    {
      id: '1',
      date: '2023.6',
      title: '高考',
      description: '完成高中学业，迈向新的人生阶段',
      type: 'education'
    },
    {
      id: '2',
      date: '2023.9',
      title: '进入苏州经贸职业技术学院',
      description: '开始大数据技术专业的学习',
      type: 'education'
    },
    {
      id: '3',
      date: '2024.12',
      title: '开始学习C++',
      description: '踏入编程世界，开始系统性学习编程语言',
      type: 'project'
    },
    {
      id: '4',
      date: '2025.1',
      title: '阅读蛋疼真人',
      description: '拓展知识面，培养阅读习惯',
      type: 'achievement'
    },
    {
      id: '5',
      date: '2025.4',
      title: '接触AI技术',
      description: '开始接触到最新AI技术，探索人工智能领域',
      type: 'project'
    },
    {
      id: '6',
      date: '2025.7',
      title: '持续学习与反思',
      description: '不断学习，发现自身弱点，持续改进',
      type: 'achievement'
    }
  ],

  contacts: [
    {
      type: 'email',
      value: '779279397@qq.com',
      label: 'QQ邮箱'
    }
  ],

  socialLinks: [
    {
      platform: 'GitHub',
      url: 'https://github.com/SelfishMan-mm',
      icon: '/icons/github_original_wordmark_logo_icon_146506.svg'
    },
    {
      platform: 'B站',
      url: 'https://space.bilibili.com/632873241?spm_id_from=333.1007.0.0',
      icon: '/icons/bilibili.svg'
    }
  ],

  theme: {
    primaryColor: '#3b82f6', // 蓝色主色
    accentColor: '#3b82f6', // 蓝色点缀
    secondaryAccent: '#8b5cf6', // 紫色点缀
    textColor: '#ffffff', // 白色文字
    backgroundStyle: 'meteors',
    animationIntensity: 'medium'
  },

  seo: {
    title: 'Meless - 躺平大师 | 个人网站',
    description: '我是Meless，一个专注于数据分析和机器学习的躺平大师。这里展示我的项目作品、技术技能和成长历程。',
    keywords: ['Meless', '数据分析', '机器学习', 'Python', 'C++', '个人网站', '躺平大师']
  },

  story: {
    personalStory: '我只不过是个平凡人啊',
    careerPlan: '未来躺平吧，后面可能会走数据分析师或者去干Web3或者去干大模型',
    learningPlan: '深入学习机器学习领域'
  }
};

// 导航配置
export const navigationSections = [
  { id: 'hero', label: '首页', href: '#hero' },
  { id: 'about', label: '关于我', href: '#about' },
  { id: 'skills', label: '技能', href: '#skills' },
  { id: 'projects', label: '项目', href: '#projects' },
  { id: 'timeline', label: '经历', href: '#timeline' },
  { id: 'contact', label: '联系', href: '#contact' }
];

// 示例数据（用于开发测试）
export const mockData = {
  // 可以在这里添加一些测试数据
  testimonials: [
    {
      id: '1',
      name: '张三',
      role: '前端开发工程师',
      content: 'Meless 是一个非常有潜力的开发者，技术能力强，学习能力也很出色。',
      avatar: '/images/testimonials/avatar1.jpg'
    }
  ],
  
  // 技能分类
  skillCategories: [
    '编程语言',
    '数据工程', 
    '机器学习',
    '区块链',
    '数据库'
  ],
  
  // 项目分类
  projectCategories: [
    '系统开发',
    '数据分析',
    '数据工程',
    '机器学习',
    '区块链'
  ]
};

export default siteData;