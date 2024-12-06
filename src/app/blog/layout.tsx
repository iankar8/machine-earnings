import React from 'react';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Machine Earnings - Blog',
  description: 'The Business World of Gen AI',
}

interface BlogLayoutProps {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps): JSX.Element {
  return (
    <div className="min-h-screen bg-black text-green-500">
      {children}
    </div>
  );
}
