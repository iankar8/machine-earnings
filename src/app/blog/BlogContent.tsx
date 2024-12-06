'use client';

import React, { useState } from 'react';
import { Post } from '@/types/ghost';
import PostCard from '@/components/PostCard';

interface BlogContentProps {
  initialPosts?: Post[];
}

export function BlogContent({ initialPosts = [] }: BlogContentProps): JSX.Element {
  const [posts] = useState<Post[]>(initialPosts);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
} 