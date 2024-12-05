import { getPost } from '@/lib/ghost';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-green-500 p-4 md:p-8">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-green-500/80">
            <time>{new Date(post.published_at).toLocaleDateString()}</time>
            {post.reading_time && (
              <span>• {post.reading_time} min read</span>
            )}
          </div>
        </header>

        {post.feature_image && (
          <div className="relative h-[400px] mb-8">
            <Image
              src={post.feature_image}
              alt={post.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-30" />
          </div>
        )}

        <div 
          className="prose prose-invert prose-green max-w-none"
          dangerouslySetInnerHTML={{ __html: post.html || '' }}
        />

        <div className="mt-8 pt-8 border-t border-green-500/20">
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag: { id: string; name: string }) => (
              <span 
                key={tag.id}
                className="text-sm border border-green-500/50 px-3 py-1 rounded-full"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
} 