declare module '@tryghost/content-api' {
  import { GhostPost, GhostTag, GhostAuthor } from './ghost';

  interface BrowseParams {
    limit?: number | 'all';
    page?: number;
    order?: string;
    include?: string[];
    filter?: string;
  }

  interface ReadParams {
    slug: string;
    include?: string[];
  }

  interface ApiOptions {
    url: string;
    key: string;
    version: string;
  }

  interface Api {
    posts: {
      browse(params?: BrowseParams): Promise<GhostPost[]>;
      read(params: ReadParams, options?: { include: string[] }): Promise<GhostPost>;
    };
    tags: {
      browse(params?: BrowseParams): Promise<GhostTag[]>;
      read(params: ReadParams): Promise<GhostTag>;
    };
    authors: {
      browse(params?: BrowseParams): Promise<GhostAuthor[]>;
      read(params: ReadParams): Promise<GhostAuthor>;
    };
  }

  export default function GhostContentAPI(options: ApiOptions): Api;
}
