'use client';
import { ReactNode } from 'react';
import { Navigation } from './navigation';

export default function ClientRoot({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Navigation />
    </>
  );
}
