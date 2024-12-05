import GhostContentAPI from '@tryghost/content-api';
import { GhostPost, GhostTag } from '@/types/ghost';

const api = new GhostContentAPI({
  url: process.env.NEXT_PUBLIC_GHOST_URL || '',
  key: process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY || '',
  version: 'v5.0',
});

export async function getPosts(): Promise<GhostPost[]> {
  try {
    const posts = await api.posts.browse({
      limit: 'all',
      include: ['tags', 'authors'],
    });
    return posts as GhostPost[];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPost(slug: string): Promise<GhostPost | null> {
  try {
    const post = await api.posts.read(
      { slug },
      { include: ['tags', 'authors'] }
    );
    return post as GhostPost;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function getTags(): Promise<GhostTag[]> {
  try {
    const tags = await api.tags.browse({
      limit: 'all',
      include: ['count.posts'],
    });
    return tags as GhostTag[];
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

export async function getTag(slug: string): Promise<GhostTag | null> {
  try {
    const tag = await api.tags.read({ slug });
    return tag as GhostTag;
  } catch (error) {
    console.error('Error fetching tag:', error);
    return null;
  }
}
