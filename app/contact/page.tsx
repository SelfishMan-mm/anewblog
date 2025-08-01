'use client';

import { ContactSection } from '@/components/sections/contact-section';
import { Meteors } from '@/components/magicui/meteors';
import { ComponentErrorBoundary } from '@/components/error-boundary';
import { mockSiteData } from '@/config/mock-data';

export default function ContactPage() {
  const { contacts, socialLinks } = mockSiteData;

  return (
    <ComponentErrorBoundary componentName="ContactPage">
      <main className="relative min-h-screen bg-background overflow-hidden pt-20">
        {/* 流星背景效果 */}
        <div className="absolute inset-0 z-0">
          <Meteors number={30} />
        </div>

        {/* 联系方式区域 */}
        <div className="relative z-10">
          <ContactSection 
            contacts={contacts}
            socialLinks={socialLinks}
          />
        </div>
      </main>
    </ComponentErrorBoundary>
  );
}