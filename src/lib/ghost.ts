import GhostContentAPI from '@tryghost/content-api';
import { Post, Tag } from '@/types/ghost';
import { getConfig } from '@/utils/config';

const config = getConfig();

const api = new GhostContentAPI({
  url: config.ghostUrl,
  key: config.ghostKey,
  version: config.ghostVersion,
});

export async function getPosts(): Promise<Post[]> {
  const posts = await api.posts.browse({
    limit: 'all',
    include: ['tags', 'authors'],
  });
  return posts as Post[];
}

export async function getPost(slug: string): Promise<Post> {
  const post = await api.posts.read({
    slug,
    include: ['tags', 'authors'],
  });
  return post as Post;
}

export async function getTags(): Promise<Tag[]> {
  const tags = await api.tags.browse({
    limit: 'all',
  });
  return tags as Tag[];
}

export async function getTag(slug: string): Promise<Tag> {
  const tag = await api.tags.read({
    slug,
  });
  return tag as Tag;
}
