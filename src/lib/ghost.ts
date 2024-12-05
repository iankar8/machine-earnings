import GhostContentAPI from '@tryghost/content-api';
import { getConfig } from '@/utils/config';
import { GhostPost, GhostTag } from '@/types/ghost';

const api = GhostContentAPI({
  url: getConfig('NEXT_PUBLIC_GHOST_URL'),
  key: getConfig('GHOST_CONTENT_API_KEY'),
  version: 'v5.0',
});

async function handleGhostError<T>(promise: Promise<T>): Promise<T> {
  try {
    return await promise;
  } catch (error) {
    console.error('Ghost API Error:', error);
    throw new Error('Failed to fetch content from Ghost CMS');
  }
}

export async function getPosts(): Promise<GhostPost[]> {
  return handleGhostError(
    api.posts.browse({
      limit: 'all',
      include: ['tags', 'authors'],
    })
  );
}

export async function getPost(slug: string): Promise<GhostPost> {
  return handleGhostError(
    api.posts.read({
      slug,
      include: ['tags', 'authors'],
    })
  );
}

export async function getTags(): Promise<GhostTag[]> {
  return handleGhostError(
    api.tags.browse({
      limit: 'all',
    })
  );
}

export async function getTag(slug: string): Promise<GhostTag> {
  return handleGhostError(
    api.tags.read({
      slug,
    })
  );
}
