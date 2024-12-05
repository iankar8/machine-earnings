import { Suspense } from 'react';
import BlogContent from './BlogContent';
import BlogLoading from './loading';
import { getPosts, getTags } from '@/lib/ghost';

export const revalidate = 60;

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([
    getPosts(),
    getTags()
  ]);

  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogContent initialPosts={posts} initialTags={tags} />
    </Suspense>
  );
}
