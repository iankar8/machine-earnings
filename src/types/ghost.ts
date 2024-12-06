export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  html: string;
  feature_image?: string;
  tags?: Tag[];
}

export interface Tag {
  id: string;
  slug: string;
  name: string;
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
