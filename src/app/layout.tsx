import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Machine Earnings - AI Business Intelligence',
    template: '%s | Machine Earnings'
  },
  description: 'Stay ahead of AI business trends with Machine Earnings. Weekly insights, in-depth essays, and community discussions.',
  keywords: ['AI', 'business intelligence', 'machine learning', 'artificial intelligence', 'technology trends'],
  authors: [{ name: 'Machine Earnings' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://machineearnings.com',
    siteName: 'Machine Earnings',
    title: 'Machine Earnings - AI Business Intelligence',
    description: 'Stay ahead of AI business trends with Machine Earnings. Weekly insights, in-depth essays, and community discussions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Machine Earnings'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Machine Earnings - AI Business Intelligence',
    description: 'Stay ahead of AI business trends with Machine Earnings. Weekly insights, in-depth essays, and community discussions.',
    images: ['/og-image.png']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
