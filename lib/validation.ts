import { REGEX_PATTERNS } from './constants';
import type { 
  PersonalInfo, 
  Project, 
  Skill, 
  TimelineEvent, 
  ContactInfo, 
  SocialLink,
  ContactFormData 
} from '@/types';

// 基础验证函数
export const validators = {
  // 必填字段验证
  required: (value: any, fieldName: string): string | null => {
    if (value === null || value === undefined || value === '') {
      return `${fieldName}是必填项`;
    }
    if (typeof value === 'string' && value.trim() === '') {
      return `${fieldName}不能为空`;
    }
    return null;
  },

  // 字符串长度验证
  length: (value: string, min: number, max?: number, fieldName?: string): string | null => {
    const length = value?.trim().length || 0;
    if (length < min) {
      return `${fieldName || '字段'}长度不能少于${min}个字符`;
    }
    if (max && length > max) {
      return `${fieldName || '字段'}长度不能超过${max}个字符`;
    }
    return null;
  },

  // 邮箱格式验证
  email: (value: string): string | null => {
    if (!value) return null;
    if (!REGEX_PATTERNS.EMAIL.test(value)) {
      return '邮箱格式不正确';
    }
    return null;
  },

  // URL格式验证
  url: (value: string): string | null => {
    if (!value) return null;
    if (!REGEX_PATTERNS.URL.test(value)) {
      return 'URL格式不正确';
    }
    return null;
  },

  // 数字范围验证
  range: (value: number, min: number, max: number, fieldName?: string): string | null => {
    if (value < min || value > max) {
      return `${fieldName || '数值'}必须在${min}-${max}之间`;
    }
    return null;
  },

  // 数组长度验证
  arrayLength: (value: any[], min: number, max?: number, fieldName?: string): string | null => {
    const length = value?.length || 0;
    if (length < min) {
      return `${fieldName || '数组'}至少需要${min}个元素`;
    }
    if (max && length > max) {
      return `${fieldName || '数组'}最多只能有${max}个元素`;
    }
    return null;
  },

  // 日期格式验证
  date: (value: string): string | null => {
    if (!value) return null;
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return '日期格式不正确';
    }
    return null;
  }
};

// 复合验证函数
export const validate = {
  // 验证个人信息
  personalInfo: (data: Partial<PersonalInfo>): Record<string, string> => {
    const errors: Record<string, string> = {};

    // 验证姓名
    const nameError = validators.required(data.name, '姓名') || 
                     validators.length(data.name || '', 1, 50, '姓名');
    if (nameError) errors.name = nameError;

    // 验证职位
    const titleError = validators.required(data.title, '职位') || 
                      validators.length(data.title || '', 1, 100, '职位');
    if (titleError) errors.title = titleError;

    // 验证座右铭
    if (data.motto && data.motto.length > 0) {
      const mottoError = validators.arrayLength(data.motto, 1, 10, '座右铭');
      if (mottoError) errors.motto = mottoError;
    }

    // 验证简介
    const bioError = validators.length(data.bio || '', 0, 500, '个人简介');
    if (bioError) errors.bio = bioError;

    // 验证地址
    const locationError = validators.length(data.location || '', 0, 100, '地址');
    if (locationError) errors.location = locationError;

    return errors;
  },

  // 验证项目信息
  project: (data: Partial<Project>): Record<string, string> => {
    const errors: Record<string, string> = {};

    // 验证项目名称
    const nameError = validators.required(data.name, '项目名称') || 
                     validators.length(data.name || '', 1, 100, '项目名称');
    if (nameError) errors.name = nameError;

    // 验证项目描述
    const descError = validators.required(data.description, '项目描述') || 
                     validators.length(data.description || '', 10, 500, '项目描述');
    if (descError) errors.description = descError;

    // 验证详细描述
    if (data.longDescription) {
      const longDescError = validators.length(data.longDescription, 0, 2000, '详细描述');
      if (longDescError) errors.longDescription = longDescError;
    }

    // 验证技术栈
    if (data.techStack) {
      const techStackError = validators.arrayLength(data.techStack, 1, 20, '技术栈');
      if (techStackError) errors.techStack = techStackError;
    }

    // 验证GitHub链接
    if (data.githubUrl) {
      const githubError = validators.url(data.githubUrl);
      if (githubError) errors.githubUrl = githubError;
    }

    // 验证在线链接
    if (data.liveUrl) {
      const liveUrlError = validators.url(data.liveUrl);
      if (liveUrlError) errors.liveUrl = liveUrlError;
    }

    // 验证分类
    const categoryError = validators.required(data.category, '项目分类') || 
                         validators.length(data.category || '', 1, 50, '项目分类');
    if (categoryError) errors.category = categoryError;

    // 验证开始日期
    const startDateError = validators.required(data.startDate, '开始日期') || 
                          validators.date(data.startDate || '');
    if (startDateError) errors.startDate = startDateError;

    // 验证结束日期
    if (data.endDate) {
      const endDateError = validators.date(data.endDate);
      if (endDateError) errors.endDate = endDateError;
      
      // 验证日期逻辑
      if (data.startDate && data.endDate) {
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
        if (endDate < startDate) {
          errors.endDate = '结束日期不能早于开始日期';
        }
      }
    }

    return errors;
  },

  // 验证技能信息
  skill: (data: Partial<Skill>): Record<string, string> => {
    const errors: Record<string, string> = {};

    // 验证技能名称
    const nameError = validators.required(data.name, '技能名称') || 
                     validators.length(data.name || '', 1, 50, '技能名称');
    if (nameError) errors.name = nameError;

    // 验证技能等级
    const levelError = validators.required(data.level, '技能等级') || 
                      validators.range(data.level || 0, 0, 100, '技能等级');
    if (levelError) errors.level = levelError;

    // 验证技能分类
    const categoryError = validators.required(data.category, '技能分类') || 
                         validators.length(data.category || '', 1, 50, '技能分类');
    if (categoryError) errors.category = categoryError;

    return errors;
  },

  // 验证时间轴事件
  timelineEvent: (data: Partial<TimelineEvent>): Record<string, string> => {
    const errors: Record<string, string> = {};

    // 验证日期
    const dateError = validators.required(data.date, '日期') || 
                     validators.date(data.date || '');
    if (dateError) errors.date = dateError;

    // 验证标题
    const titleError = validators.required(data.title, '标题') || 
                      validators.length(data.title || '', 1, 100, '标题');
    if (titleError) errors.title = titleError;

    // 验证描述
    const descError = validators.required(data.description, '描述') || 
                     validators.length(data.description || '', 1, 500, '描述');
    if (descError) errors.description = descError;

    // 验证类型
    const typeError = validators.required(data.type, '事件类型');
    if (typeError) errors.type = typeError;

    return errors;
  },

  // 验证联系信息
  contactInfo: (data: Partial<ContactInfo>): Record<string, string> => {
    const errors: Record<string, string> = {};

    // 验证类型
    const typeError = validators.required(data.type, '联系方式类型');
    if (typeError) errors.type = typeError;

    // 验证值
    const valueError = validators.required(data.value, '联系方式');
    if (valueError) {
      errors.value = valueError;
    } else if (data.type === 'email') {
      const emailError = validators.email(data.value || '');
      if (emailError) errors.value = emailError;
    }

    return errors;
  },

  // 验证社交链接
  socialLink: (data: Partial<SocialLink>): Record<string, string> => {
    const errors: Record<string, string> = {};

    // 验证平台
    const platformError = validators.required(data.platform, '社交平台') || 
                         validators.length(data.platform || '', 1, 50, '社交平台');
    if (platformError) errors.platform = platformError;

    // 验证链接
    const urlError = validators.required(data.url, '链接地址') || 
                    validators.url(data.url || '');
    if (urlError) errors.url = urlError;

    return errors;
  },

  // 验证联系表单
  contactForm: (data: Partial<ContactFormData>): Record<string, string> => {
    const errors: Record<string, string> = {};

    // 验证姓名
    const nameError = validators.required(data.name, '姓名') || 
                     validators.length(data.name || '', 2, 50, '姓名');
    if (nameError) errors.name = nameError;

    // 验证邮箱
    const emailError = validators.required(data.email, '邮箱') || 
                      validators.email(data.email || '');
    if (emailError) errors.email = emailError;

    // 验证主题
    const subjectError = validators.required(data.subject, '主题') || 
                        validators.length(data.subject || '', 5, 100, '主题');
    if (subjectError) errors.subject = subjectError;

    // 验证消息
    const messageError = validators.required(data.message, '消息内容') || 
                        validators.length(data.message || '', 10, 1000, '消息内容');
    if (messageError) errors.message = messageError;

    return errors;
  }
};

// 验证工具函数
export const validationUtils = {
  // 检查是否有错误
  hasErrors: (errors: Record<string, string>): boolean => {
    return Object.keys(errors).length > 0;
  },

  // 获取第一个错误消息
  getFirstError: (errors: Record<string, string>): string | null => {
    const keys = Object.keys(errors);
    return keys.length > 0 ? errors[keys[0]] : null;
  },

  // 合并错误对象
  mergeErrors: (...errorObjects: Record<string, string>[]): Record<string, string> => {
    return errorObjects.reduce((merged, errors) => ({ ...merged, ...errors }), {});
  },

  // 清理错误对象（移除空值）
  cleanErrors: (errors: Record<string, string>): Record<string, string> => {
    const cleaned: Record<string, string> = {};
    Object.entries(errors).forEach(([key, value]) => {
      if (value && value.trim()) {
        cleaned[key] = value;
      }
    });
    return cleaned;
  },

  // 验证数组中的所有项目
  validateArray: <T>(
    items: T[], 
    validator: (item: T) => Record<string, string>
  ): Record<string, Record<string, string>> => {
    const errors: Record<string, Record<string, string>> = {};
    
    items.forEach((item, index) => {
      const itemErrors = validator(item);
      if (validationUtils.hasErrors(itemErrors)) {
        errors[index] = itemErrors;
      }
    });
    
    return errors;
  }
};

export default validate;