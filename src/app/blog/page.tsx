import React from 'react';
import { getPosts } from '@/lib/ghost';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogPage() {
  const { posts } = await getPosts();
  
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-[var(--matrix-green)] glow-text">Latest Posts</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id}>
            <Card className="bg-[var(--matrix-dark)] border-[var(--matrix-green)]/30 hover:border-[var(--matrix-green)] transition-all duration-300 h-full">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold text-[var(--matrix-green)] glow-text">{post.title}</h2>
                <div className="text-[var(--matrix-green)]/70 text-sm">
                  <time>{new Date(post.published_at).toLocaleDateString()}</time>
                  {post.reading_time && (
                    <span className="ml-4">{post.reading_time} min read</span>
                  )}
                </div>
                <p className="text-[var(--matrix-green)]/70 line-clamp-3">{post.excerpt}</p>
                <div className="pt-4 text-[var(--matrix-accent)] text-sm">Read more →</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
