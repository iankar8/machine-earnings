import React from 'react';
import { getPost } from '@/lib/ghost';
import BlogPostContent from './BlogPostContent';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return <BlogPostContent post={post} />;
} 