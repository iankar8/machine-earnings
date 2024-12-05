import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Machine Earnings - Blog',
  description: 'The Business World of Gen AI',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black">
      {children}
    </div>
  )
}
