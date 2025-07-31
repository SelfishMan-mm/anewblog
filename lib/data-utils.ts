import { Project, Skill, TimelineEvent, FilterOptions, SearchOptions } from '@/types';

// 项目相关工具函数
export const projectUtils = {
  // 按分类过滤项目
  filterByCategory: (projects: Project[], category?: string): Project[] => {
    if (!category) return projects;
    return projects.filter(project => project.category === category);
  },

  // 按状态过滤项目
  filterByStatus: (projects: Project[], status?: Project['status']): Project[] => {
    if (!status) return projects;
    return projects.filter(project => project.status === status);
  },

  // 按技术栈过滤项目
  filterByTechStack: (projects: Project[], techStack?: string[]): Project[] => {
    if (!techStack || techStack.length === 0) return projects;
    return projects.filter(project => 
      techStack.some(tech => project.techStack.includes(tech))
    );
  },

  // 获取特色项目
  getFeaturedProjects: (projects: Project[]): Project[] => {
    return projects.filter(project => project.featured);
  },

  // 按日期排序项目
  sortByDate: (projects: Project[], order: 'asc' | 'desc' = 'desc'): Project[] => {
    return [...projects].sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
  },

  // 搜索项目
  searchProjects: (projects: Project[], options: SearchOptions): Project[] => {
    let filtered = [...projects];

    // 文本搜索
    if (options.query) {
      const query = options.query.toLowerCase();
      filtered = filtered.filter(project => 
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.techStack.some(tech => tech.toLowerCase().includes(query))
      );
    }

    // 应用过滤器
    if (options.filters) {
      const { category, status, featured, techStack } = options.filters;
      
      if (category) {
        filtered = projectUtils.filterByCategory(filtered, category);
      }
      
      if (status) {
        filtered = projectUtils.filterByStatus(filtered, status);
      }
      
      if (featured !== undefined) {
        filtered = filtered.filter(project => project.featured === featured);
      }
      
      if (techStack) {
        filtered = projectUtils.filterByTechStack(filtered, techStack);
      }
    }

    // 排序
    if (options.sortBy) {
      switch (options.sortBy) {
        case 'date':
          filtered = projectUtils.sortByDate(filtered, options.sortOrder);
          break;
        case 'name':
          filtered = filtered.sort((a, b) => {
            const comparison = a.name.localeCompare(b.name);
            return options.sortOrder === 'desc' ? -comparison : comparison;
          });
          break;
        case 'featured':
          filtered = filtered.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return 0;
          });
          break;
      }
    }

    return filtered;
  },

  // 获取项目统计信息
  getProjectStats: (projects: Project[]) => {
    const total = projects.length;
    const completed = projects.filter(p => p.status === 'completed').length;
    const inProgress = projects.filter(p => p.status === 'in-progress').length;
    const planned = projects.filter(p => p.status === 'planned').length;
    const featured = projects.filter(p => p.featured).length;

    // 获取所有技术栈
    const allTechStack = projects.flatMap(p => p.techStack);
    const techStackCount = allTechStack.reduce((acc, tech) => {
      acc[tech] = (acc[tech] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // 获取分类统计
    const categoryCount = projects.reduce((acc, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      completed,
      inProgress,
      planned,
      featured,
      techStackCount,
      categoryCount,
      completionRate: total > 0 ? (completed / total) * 100 : 0
    };
  }
};

// 技能相关工具函数
export const skillUtils = {
  // 按分类分组技能
  groupByCategory: (skills: Skill[]): Record<string, Skill[]> => {
    return skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, Skill[]>);
  },

  // 按熟练度排序
  sortByLevel: (skills: Skill[], order: 'asc' | 'desc' = 'desc'): Skill[] => {
    return [...skills].sort((a, b) => {
      return order === 'desc' ? b.level - a.level : a.level - b.level;
    });
  },

  // 获取顶级技能
  getTopSkills: (skills: Skill[], count: number = 5): Skill[] => {
    return skillUtils.sortByLevel(skills).slice(0, count);
  },

  // 计算平均技能水平
  getAverageLevel: (skills: Skill[]): number => {
    if (skills.length === 0) return 0;
    const total = skills.reduce((sum, skill) => sum + skill.level, 0);
    return Math.round(total / skills.length);
  },

  // 获取技能统计
  getSkillStats: (skills: Skill[]) => {
    const categoryStats = skillUtils.groupByCategory(skills);
    const averageLevel = skillUtils.getAverageLevel(skills);
    const topSkills = skillUtils.getTopSkills(skills);
    
    const levelDistribution = {
      expert: skills.filter(s => s.level >= 90).length,
      advanced: skills.filter(s => s.level >= 70 && s.level < 90).length,
      intermediate: skills.filter(s => s.level >= 50 && s.level < 70).length,
      beginner: skills.filter(s => s.level < 50).length
    };

    return {
      total: skills.length,
      categoryStats,
      averageLevel,
      topSkills,
      levelDistribution
    };
  }
};

// 时间轴相关工具函数
export const timelineUtils = {
  // 按日期排序事件
  sortByDate: (events: TimelineEvent[], order: 'asc' | 'desc' = 'desc'): TimelineEvent[] => {
    return [...events].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
  },

  // 按类型过滤事件
  filterByType: (events: TimelineEvent[], type: TimelineEvent['type']): TimelineEvent[] => {
    return events.filter(event => event.type === type);
  },

  // 按年份分组事件
  groupByYear: (events: TimelineEvent[]): Record<string, TimelineEvent[]> => {
    return events.reduce((acc, event) => {
      const year = new Date(event.date).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(event);
      return acc;
    }, {} as Record<string, TimelineEvent[]>);
  },

  // 获取最近的事件
  getRecentEvents: (events: TimelineEvent[], count: number = 3): TimelineEvent[] => {
    return timelineUtils.sortByDate(events).slice(0, count);
  }
};

// 通用工具函数
export const dataUtils = {
  // 深度克隆对象
  deepClone: <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
  },

  // 去重数组
  unique: <T>(array: T[]): T[] => {
    return Array.from(new Set(array));
  },

  // 随机打乱数组
  shuffle: <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  // 分页数据
  paginate: <T>(array: T[], page: number, pageSize: number): T[] => {
    const startIndex = (page - 1) * pageSize;
    return array.slice(startIndex, startIndex + pageSize);
  },

  // 计算分页信息
  getPaginationInfo: (total: number, page: number, pageSize: number) => {
    const totalPages = Math.ceil(total / pageSize);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;
    
    return {
      total,
      page,
      pageSize,
      totalPages,
      hasNext,
      hasPrev,
      startIndex: (page - 1) * pageSize,
      endIndex: Math.min(page * pageSize, total)
    };
  }
};

// 验证工具函数
export const validationUtils = {
  // 验证邮箱格式
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // 验证URL格式
  isValidUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // 验证必填字段
  isRequired: (value: any): boolean => {
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
  },

  // 验证字符串长度
  isValidLength: (value: string, min: number, max?: number): boolean => {
    const length = value.trim().length;
    if (length < min) return false;
    if (max && length > max) return false;
    return true;
  }
};