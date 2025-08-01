'use client';

import { AboutSection } from '@/components/sections/about-section';
import { ComponentErrorBoundary } from '@/components/error-boundary';
import { mockSiteData } from '@/config/mock-data';

export default function AboutPage() {
  const { personal, timeline } = mockSiteData;

  return (
    <ComponentErrorBoundary componentName="AboutPage">
      <main className="relative min-h-screen bg-background pt-20">
        {/* 关于我区域 */}
        <AboutSection 
          personalInfo={personal}
          timeline={timeline}
        />
      </main>
    </ComponentErrorBoundary>
  );
}