import { getPost } from '@/lib/ghost';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: PageProps): Promise<JSX.Element> {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="prose prose-invert prose-green mx-auto px-4 py-8">
      <h1>{post.title}</h1>
      {post.feature_image && (
        <img
          src={post.feature_image}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: post.html || '' }} />
    </article>
  );
} 