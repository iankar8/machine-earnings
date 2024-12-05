declare module '@tryghost/content-api' {
  interface GhostAPI {
    posts: {
      browse: (options?: any) => Promise<any[]>;
      read: (options: any, params?: any) => Promise<any>;
    };
    tags: {
      browse: (options?: any) => Promise<any[]>;
      read: (options: any) => Promise<any>;
    };
    authors: {
      browse: (options?: any) => Promise<any[]>;
      read: (options: any) => Promise<any>;
    };
  }

  interface GhostContentAPIOptions {
    url: string;
    key: string;
    version: string;
  }

  export default function GhostContentAPI(options: GhostContentAPIOptions): GhostAPI;
}
