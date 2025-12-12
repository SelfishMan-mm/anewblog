'use client';

import { useState } from 'react';
import { CoolMode } from '@/components/magicui/cool-mode';
import { ComponentErrorBoundary } from '@/components/error-boundary';
import { useAnimationControl } from '@/hooks/use-animation-control';
import { copyToClipboard } from '@/lib/utils';

import { Meteors } from '@/components/magicui/meteors';
import type { ContactInfo, SocialLink } from '@/types';
import { motion } from 'motion/react';
import Image from 'next/image';

interface ContactSectionProps {
  contacts: ContactInfo[];
  socialLinks: SocialLink[];
}

export function ContactSection({ contacts, socialLinks }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  
  const { ref: sectionRef, isVisible } = useAnimationControl({
    threshold: 0.2,
    triggerOnce: true
  });

  const handleEmailCopy = async (email: string) => {
    const success = await copyToClipboard(email);
    if (success) {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      console.error('Failed to copy email');
    }
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <ComponentErrorBoundary componentName="ContactSection">
      <section 
        id="contact" 
        ref={sectionRef}
        className="min-h-screen py-20 px-8 bg-black relative overflow-hidden"
      >
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_50%)]" />
        
        {/* 流星效果 */}
        <Meteors number={30} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          {/* 标题区域 */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              联系我
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              欢迎与我交流技术、分享想法或探讨合作机会
            </p>
          </motion.div>

          {/* 联系方式卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* 邮箱联系 */}
            {contacts.map((contact, index) => (
              <motion.div
                key={contact.type}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800/50 rounded-xl p-6 hover:bg-neutral-900/80 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center border border-neutral-700/50">
                    {getContactIcon(contact.type)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {contact.label || getContactLabel(contact.type)}
                    </h3>
                    <p className="text-neutral-400">点击复制到剪贴板</p>
                  </div>
                </div>
                
                <CoolMode options={{ particleCount: 6, speedHorz: 8, speedUp: 15 }}>
                  <button
                    onClick={() => handleEmailCopy(contact.value)}
                    className="w-full p-3 bg-neutral-800/50 hover:bg-neutral-800 rounded-lg text-neutral-300 hover:text-white transition-all duration-200 font-mono text-sm border border-neutral-700/50 hover:border-neutral-500/50"
                  >
                    {copiedEmail ? '✓ 已复制!' : contact.value}
                  </button>
                </CoolMode>
              </motion.div>
            ))}

            {/* 社交媒体 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800/50 rounded-xl p-6 hover:bg-neutral-900/80 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center border border-neutral-700/50">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">社交媒体</h3>
                  <p className="text-neutral-400">关注我的最新动态</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {socialLinks.map((social) => (
                  <CoolMode key={social.platform} options={{ particleCount: 4, speedHorz: 6, speedUp: 12 }}>
                    <button
                      onClick={() => handleSocialClick(social.url)}
                      className="w-full flex items-center gap-3 p-3 bg-neutral-800/50 hover:bg-neutral-800 rounded-lg text-neutral-300 hover:text-white transition-all duration-200 border border-neutral-700/50 hover:border-neutral-500/50 group"
                    >
                      <div className="w-8 h-8 relative flex items-center justify-center">
                        {getSocialIcon(social.platform, social.icon)}
                      </div>
                      <span className="font-medium">{social.platform}</span>
                      <svg className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </CoolMode>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 底部信息 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-neutral-900/30 backdrop-blur-sm border border-neutral-800/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                让我们一起创造些什么吧！
              </h3>
              <p className="text-neutral-300 mb-4">
                无论是技术交流、项目合作还是简单的问候，我都很乐意收到你的消息。
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-400">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  通常24小时内回复
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  杭州，中国
                </span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* 留言板区域已移除 */}

      </section>
    </ComponentErrorBoundary>
  );
}

// 辅助函数
function getContactIcon(type: string) {
  switch (type) {
    case 'email':
      return (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'phone':
      return (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      );
    case 'wechat':
      return (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.111.24-.248 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1 .134-.98c1.516-1.255 2.472-3.047 2.472-5.03 0-3.615-3.32-6.565-7.988-6.484zm-2.530 2.072c.535 0 .969.441.969.984 0 .544-.434.985-.969.985s-.969-.441-.969-.985c0-.543.434-.984.969-.984zm4.844 0c.535 0 .969.441.969.984 0 .544-.434.985-.969.985s-.969-.441-.969-.985c0-.543.434-.984.969-.984z"/>
        </svg>
      );
    default:
      return (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      );
  }
}

function getContactLabel(type: string): string {
  const labels = {
    email: '邮箱',
    phone: '电话',
    wechat: '微信'
  };
  return labels[type as keyof typeof labels] || type;
}

function getSocialIcon(platform: string, iconPath?: string) {
  // 如果有图标路径且不是bilibili，尝试使用图片
  if (iconPath && platform !== 'B站' && !iconPath.startsWith('/icons/')) {
    return (
      <Image
        src={iconPath}
        alt={platform}
        width={32}
        height={32}
        className="rounded-full"
        onError={(e) => {
          // 如果图片加载失败，显示默认图标
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
    );
  }

  // 为特定平台提供内联SVG图标
  switch (platform) {
    case 'GitHub':
      return (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      );
    case 'B站':
      return (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.249 1.524-3.76 1.56H5.333c-1.51-.036-2.769-.556-2.773-1.56V9.987c.004-1.511.263-2.765 1.56-3.76C5.124 5.231 6.38 4.707 7.893 4.653h.854L7.893 2.44c-.036-.216.07-.431.32-.646.25-.216.534-.322.854-.322.32 0 .604.106.854.322.25.215.356.43.32.646L9.387 4.653h5.226L13.76 2.44c-.036-.216.07-.431.32-.646.25-.216.534-.322.854-.322.32 0 .604.106.854.322.25.215.356.43.32.646l-.854 2.213zm-7.36 4.267c-.71 0-1.279.569-1.279 1.279 0 .71.569 1.279 1.279 1.279.71 0 1.279-.569 1.279-1.279 0-.71-.569-1.279-1.279-1.279zm7.36 0c-.71 0-1.279.569-1.279 1.279 0 .71.569 1.279 1.279 1.279.71 0 1.279-.569 1.279-1.279 0-.71-.569-1.279-1.279-1.279zM12 14.24c-1.279 0-2.56.427-2.56 1.279 0 .853 1.281 1.279 2.56 1.279s2.56-.426 2.56-1.279c0-.852-1.281-1.279-2.56-1.279z"/>
        </svg>
      );
    default:
      return (
        <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          {platform.charAt(0)}
        </div>
      );
  }
}