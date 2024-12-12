'use client'

import React from 'react';
import { ReadingProgress } from '@/components/ui/reading-progress';
import type { Post } from '@/types/ghost';
import Link from 'next/link';

export default function BlogPostContent({ post }: { post: Post }) {
  return (
    <article className="min-h-screen">
      <ReadingProgress />
      
      {/* Hero Section */}
      <div className="bg-[var(--matrix-dark)] border-b border-[var(--matrix-green)]/20 py-16">
        <div className="container mx-auto px-4">
          <Link href="/blog" className="text-[var(--matrix-accent)] mb-8 inline-block hover:text-[var(--matrix-green)]">
            ← Back to Blog
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[var(--matrix-green)] glow-text">
            {post.title}
          </h1>
          <div className="text-[var(--matrix-green)]/70 space-x-4">
            <time>{new Date(post.published_at).toLocaleDateString()}</time>
            {post.reading_time && (
              <span>· {post.reading_time} min read</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="prose prose-invert prose-green max-w-none md:max-w-3xl mx-auto">
          <div dangerouslySetInnerHTML={{ __html: post.html || '' }} />
        </div>
      </div>
    </article>
  );
} 