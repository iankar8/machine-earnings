// Mock environment variables
process.env = {
  ...process.env,
  NEXT_PUBLIC_GHOST_URL: 'http://test.com',
  NEXT_PUBLIC_GHOST_KEY: '1234567890abcdef1234567890',
  NEXT_PUBLIC_GHOST_VERSION: 'v5.0',
  NEXT_PUBLIC_URL: 'http://localhost:3000',
}

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