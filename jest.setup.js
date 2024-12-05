import '@testing-library/jest-dom'

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      replace: jest.fn(),
    }
  },
}))

// Mock environment variables
process.env = {
  ...process.env,
  NEXT_PUBLIC_GHOST_URL: 'https://test.ghost.io',
  GHOST_CONTENT_API_KEY: 'test-key',
  NEXT_PUBLIC_GHOST_CONTENT_API_KEY: 'test-key',
  NEXT_PUBLIC_URL: 'http://localhost:3000',
} 