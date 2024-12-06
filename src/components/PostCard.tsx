import React from 'react';
import Link from 'next/link';
import { Post } from '@/types/ghost';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps): JSX.Element {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="border border-green-500/20 rounded-lg p-4 hover:border-green-500/40 transition-colors">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-green-500/80">{post.excerpt}</p>
      </div>
    </Link>
  );
} 