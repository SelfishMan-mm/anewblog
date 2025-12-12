'use client';

import { DoingSection } from '@/components/sections/doing-section';
import { ComponentErrorBoundary } from '@/components/error-boundary';

export default function DoingPage() {
  return (
    <ComponentErrorBoundary componentName="DoingPage">
      <main className="relative min-h-screen bg-background pt-20">
        <DoingSection />
      </main>
    </ComponentErrorBoundary>
  );
}
