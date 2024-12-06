import GhostContentAPI from '@tryghost/content-api';
import { Post, Tag } from '@/types/ghost';
import { getConfig } from '@/utils/config';

const config = getConfig();

const api = GhostContentAPI({
  url: config.ghostUrl,
  key: config.ghostKey,
  version: config.ghostVersion,
});

export async function getPosts(): Promise<Post[]> {
  const posts = await api.posts.browse({
    limit: 'all',
    include: ['tags', 'authors'],
  });
  return posts;
}

export async function getPost(slug: string): Promise<Post> {
  const post = await api.posts.read({
    slug,
    include: ['tags', 'authors'],
  });
  return post;
}

export async function getTags(): Promise<Tag[]> {
  const tags = await api.tags.browse({
    limit: 'all',
  });
  return tags;
}

export async function getTag(slug: string): Promise<Tag> {
  const tag = await api.tags.read({
    slug,
  });
  return tag;
}
