/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { getPosts, getPost, getTags, getTag, setTestApi } from '../ghost';
import { Post, Tag } from '@/types/ghost';

describe('Ghost API', () => {
  const mockPosts = {
    browse: jest.fn() as jest.Mock<Promise<Post[]>>,
    read: jest.fn() as jest.Mock<Promise<Post>>
  };

  const mockTags = {
    browse: jest.fn() as jest.Mock<Promise<Tag[]>>,
    read: jest.fn() as jest.Mock<Promise<Tag>>
  };

  const mockApi = {
    posts: mockPosts,
    tags: mockTags
  };

  beforeEach(() => {
    jest.clearAllMocks();
    setTestApi(mockApi);

    // Default success responses
    mockPosts.browse.mockResolvedValue([{
      id: '1',
      title: 'Test Post',
      slug: 'test-post',
      html: '<p>Test content</p>',
      tags: [{ id: '1', name: 'Test Tag' }],
      authors: [{ id: '1', name: 'Test Author' }]
    } as Post]);

    mockPosts.read.mockResolvedValue({
      id: '1',
      title: 'Test Post',
      slug: 'test-post',
      html: '<p>Test content</p>',
      tags: [{ id: '1', name: 'Test Tag' }],
      authors: [{ id: '1', name: 'Test Author' }]
    } as Post);

    mockTags.browse.mockResolvedValue([{
      id: '1',
      name: 'Test Tag',
      slug: 'test-tag',
      count: { posts: 5 }
    } as Tag]);

    mockTags.read.mockResolvedValue({
      id: '1',
      name: 'Test Tag',
      slug: 'test-tag',
      count: { posts: 5 }
    } as Tag);
  });

  describe('success cases', () => {
    it('fetches posts', async () => {
      const posts = await getPosts();
      expect(posts[0]).toMatchObject({
        id: '1',
        title: 'Test Post',
        slug: 'test-post',
        html: '<p>Test content</p>'
      });
      expect(mockPosts.browse).toHaveBeenCalledWith({
        limit: 'all',
        include: ['tags', 'authors']
      });
    });

    it('fetches posts with included relations', async () => {
      const posts = await getPosts();
      expect(posts[0].tags).toHaveLength(1);
      expect(posts[0].authors).toHaveLength(1);
    });

    it('fetches post with specific slug', async () => {
      mockPosts.read.mockResolvedValueOnce({
        id: '1',
        title: 'Test Post',
        slug: 'custom-slug',
        html: '<p>Test content</p>'
      });
      const post = await getPost('custom-slug');
      expect(post.slug).toBe('custom-slug');
      expect(mockPosts.read).toHaveBeenCalledWith({
        slug: 'custom-slug',
        include: ['tags', 'authors']
      });
    });

    it('fetches tag with post count', async () => {
      const tag = await getTag('test-tag');
      expect(tag).toHaveProperty('count.posts', 5);
      expect(mockTags.read).toHaveBeenCalledWith({
        slug: 'test-tag'
      });
    });

    it('fetches empty tag', async () => {
      mockTags.read.mockResolvedValueOnce({
        id: '2',
        name: 'Empty Tag',
        slug: 'empty-tag',
        count: { posts: 0 }
      });
      const tag = await getTag('empty-tag');
      expect(tag).toHaveProperty('count.posts', 0);
    });
  });

  describe('error cases', () => {
    it('handles failed post fetch', async () => {
      mockPosts.read.mockRejectedValueOnce(new Error('Post not found'));
      await expect(getPost('non-existent')).rejects.toThrow('Post not found');
    });

    it('handles failed tag fetch', async () => {
      mockTags.read.mockRejectedValueOnce(new Error('Tag not found'));
      await expect(getTag('non-existent')).rejects.toThrow('Tag not found');
    });

    it('handles invalid include parameter', async () => {
      mockPosts.browse.mockRejectedValueOnce(new Error('Invalid include parameter'));
      await expect(getPosts()).rejects.toThrow('Invalid include parameter');
    });
  });

  describe('edge cases', () => {
    it('handles empty tag list', async () => {
      mockTags.browse.mockResolvedValueOnce([]);
      const tags = await getTags();
      expect(tags).toHaveLength(0);
    });

    it('handles missing optional fields', async () => {
      mockPosts.read.mockResolvedValueOnce({
        id: '1',
        title: 'Test Post',
        slug: 'test-post'
      });
      const post = await getPost('test-post');
      expect(post.html).toBeUndefined();
      expect(post.tags).toBeUndefined();
      expect(post.authors).toBeUndefined();
    });
  });
}); 