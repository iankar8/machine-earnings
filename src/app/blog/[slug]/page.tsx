import React from 'react';
import { getPost } from '@/lib/ghost';
import { ReadingProgress } from '@/components/ui/reading-progress';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <article className="container mx-auto py-8 px-4">
      <ReadingProgress />
      <h1 className="text-4xl font-bold mb-4 text-[var(--matrix-green)]">{post.title}</h1>
      <div className="mb-8 text-[var(--matrix-green)]/70">
        <time>{new Date(post.published_at).toLocaleDateString()}</time>
        {post.reading_time && (
          <span className="ml-4">{post.reading_time} min read</span>
        )}
      </div>
      <div 
        className="prose prose-invert prose-green max-w-none"
        dangerouslySetInnerHTML={{ __html: post.html || '' }}
      />
    </article>
  );
} 