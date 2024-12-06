'use client';

import React, { useState } from 'react';
import { Post, Tag } from '@/types/ghost';
import PostCard from '@/components/PostCard';

interface BlogContentProps {
  initialPosts?: Post[];
  initialTags?: Tag[];
}

export function BlogContent({ initialPosts = [], initialTags = [] }: BlogContentProps): JSX.Element {
  const [posts] = useState<Post[]>(initialPosts);
  const [selectedTag] = useState<string | null>(null);

  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags?.some(tag => tag.slug === selectedTag))
    : posts;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
} 