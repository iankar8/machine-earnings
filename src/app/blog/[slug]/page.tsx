import React from 'react';
import Image from 'next/image';
import { getPost } from '@/lib/ghost';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps): Promise<JSX.Element> {
  const post = await getPost(params.slug);

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      
      {post.feature_image && (
        <div className="relative w-full h-[400px] mb-8">
          <Image
            src={post.feature_image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div 
        className="prose prose-invert prose-green max-w-none"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
} 