import GhostContentAPI from '@tryghost/content-api';
import axios from 'axios';
import { Post, Tag } from '@/types/ghost';

// Create the API instance with axios adapter
let api = GhostContentAPI({
  url: process.env.NEXT_PUBLIC_GHOST_URL || '',
  key: process.env.GHOST_CONTENT_API_KEY || '',
  version: process.env.NEXT_PUBLIC_GHOST_VERSION || "v5.0",
  adapter: 'axios'
}) as {
  posts: {
    browse: (options: { limit: string; page?: number; filter?: string; include?: string[] }) => Promise<{
      posts: Post[];
      meta: {
        pagination: {
          page: number;
          limit: number;
          pages: number;
          total: number;
          prev: number | null;
          next: number | null;
        }
      }
    }>;
    read: (options: { slug: string; include?: string[] }) => Promise<Post>;
  };
  tags: {
    browse: (options: { limit: string }) => Promise<Tag[]>;
    read: (options: { slug: string }) => Promise<Tag>;
  };
};

export interface PostsResponse {
  posts: Post[];
  meta: {
    pagination: {
      page: number;
      limit: number;
      pages: number;
      total: number;
      prev: number | null;
      next: number | null;
    }
  }
}

// For testing purposes
export const setTestApi = (testApi: typeof api): void => {
  api = testApi;
};

export async function getPosts(page = 1, limit = 10, tag?: string): Promise<PostsResponse> {
  const options: any = {
    limit: limit.toString(),
    page,
    include: ['tags', 'authors'],
  }

  if (tag) {
    options.filter = `tag:${tag}`
  }

  const response = await api.posts.browse(options)
  return response
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
