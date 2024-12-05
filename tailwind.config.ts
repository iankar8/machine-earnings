import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'press-start-2p': ['var(--font-press-start-2p)'],
        'share-tech-mono': ['var(--font-share-tech-mono)'],
      },
      colors: {
        green: {
          500: '#22c55e',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#22c55e',
            a: {
              color: '#22c55e',
              '&:hover': {
                color: '#16a34a',
              },
            },
            h1: {
              color: '#22c55e',
            },
            h2: {
              color: '#22c55e',
            },
            h3: {
              color: '#22c55e',
            },
            h4: {
              color: '#22c55e',
            },
            strong: {
              color: '#22c55e',
            },
            code: {
              color: '#22c55e',
              backgroundColor: '#042f1c',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
            },
            pre: {
              backgroundColor: '#042f1c',
              code: {
                backgroundColor: 'transparent',
                padding: 0,
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config; 