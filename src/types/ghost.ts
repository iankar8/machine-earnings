export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  profile_image?: string;
  bio?: string;
}

export interface Post {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html?: string;
  excerpt?: string;
  feature_image?: string;
  featured: boolean;
  published_at: string;
  updated_at?: string;
  tags?: Tag[];
  authors?: Author[];
  primary_author?: Author;
  primary_tag?: Tag;
  url: string;
  canonical_url?: string;
  meta_title?: string;
  meta_description?: string;
  og_image?: string;
  og_title?: string;
  og_description?: string;
  twitter_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  custom_excerpt?: string;
  codeinjection_head?: string;
  codeinjection_foot?: string;
  custom_template?: string;
  reading_time?: number;
}

export interface GhostAPI {
  posts: {
    browse: (options: { limit: string; include?: string[] }) => Promise<Post[]>;
    read: (options: { slug: string; include?: string[] }) => Promise<Post>;
  };
  tags: {
    browse: (options: { limit: string }) => Promise<Tag[]>;
    read: (options: { slug: string }) => Promise<Tag>;
  };
}
