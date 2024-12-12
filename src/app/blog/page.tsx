import React from 'react';
import { getPosts } from '@/lib/ghost';
import { Card, CardContent } from '@/components/ui/card';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogPage() {
  const { posts } = await getPosts();
  
  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="bg-black border-[var(--matrix-green)]/30">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-2 text-[var(--matrix-green)]">{post.title}</h2>
              <p className="text-[var(--matrix-green)]/70">{post.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
