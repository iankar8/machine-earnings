'use client';

import React from 'react'
import { Press_Start_2P } from 'next/font/google'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronRightIcon, FileTextIcon, ReaderIcon } from "@radix-ui/react-icons"
import { useRouter } from 'next/navigation'
import { getPosts } from '@/lib/ghost'
import { Post } from '@/types/ghost'
import { PostSkeleton } from '@/components/ui/post-skeleton'
import { Search } from "@/components/ui/search"

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
})

export default function Dashboard() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [weeklyPosts, setWeeklyPosts] = React.useState<Post[]>([])
  const [essayPosts, setEssayPosts] = React.useState<Post[]>([])
  const [weeklyPage, setWeeklyPage] = React.useState(1)
  const [essayPage, setEssayPage] = React.useState(1)
  const [hasMoreWeekly, setHasMoreWeekly] = React.useState(true)
  const [hasMoreEssays, setHasMoreEssays] = React.useState(true)

  React.useEffect(() => {
    async function fetchPosts() {
      try {
        const [weeklyResponse, essayResponse] = await Promise.all([
          getPosts(1, 3, 'weekly'),
          getPosts(1, 3, 'essay')
        ])

        setWeeklyPosts(weeklyResponse.posts)
        setEssayPosts(essayResponse.posts)
        setHasMoreWeekly(!!weeklyResponse.meta.pagination.next)
        setHasMoreEssays(!!essayResponse.meta.pagination.next)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const loadMoreWeekly = async () => {
    if (!hasMoreWeekly) return
    try {
      const response = await getPosts(weeklyPage + 1, 3, 'weekly')
      setWeeklyPosts(prev => [...prev, ...response.posts])
      setWeeklyPage(prev => prev + 1)
      setHasMoreWeekly(!!response.meta.pagination.next)
    } catch (error) {
      console.error('Error loading more weekly posts:', error)
    }
  }

  const loadMoreEssays = async () => {
    if (!hasMoreEssays) return
    try {
      const response = await getPosts(essayPage + 1, 3, 'essay')
      setEssayPosts(prev => [...prev, ...response.posts])
      setEssayPage(prev => prev + 1)
      setHasMoreEssays(!!response.meta.pagination.next)
    } catch (error) {
      console.error('Error loading more essays:', error)
    }
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Logout failed')
      }

      localStorage.removeItem('userEmail')
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
      setIsLoggingOut(false)
    }
  }

  const handlePostClick = (slug: string) => {
    router.push(`/post/${slug}`)
  }

  const contentSections = [
    {
      id: 'weekly',
      title: 'WEEKLY ROUNDUP',
      description: 'Latest AI business insights',
      icon: <FileTextIcon className="h-6 w-6" />,
      items: weeklyPosts.map(post => ({
        title: post.title,
        date: new Date(post.published_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        slug: post.slug
      })),
      hasMore: hasMoreWeekly,
      loadMore: loadMoreWeekly
    },
    {
      id: 'essays',
      title: 'FEATURED ESSAYS',
      description: 'In-depth analysis',
      icon: <ReaderIcon className="h-6 w-6" />,
      items: essayPosts.map(post => ({
        title: post.title,
        date: new Date(post.published_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        slug: post.slug
      })),
      hasMore: hasMoreEssays,
      loadMore: loadMoreEssays
    }
  ]

  return (
    <div className="min-h-screen bg-black text-[var(--matrix-green)]">
      {/* Header */}
      <header className="border-b border-[var(--matrix-green)]/30 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className={`text-xl glow-text ${pressStart2P.className}`}>
              MACHINE EARNINGS
            </h1>
            <Search />
          </div>
          <nav className="space-x-6 font-mono">
            <Button 
              variant="ghost" 
              className="hover:text-[var(--matrix-green)] hover:bg-[var(--matrix-green)]/5"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? 'DISCONNECTING...' : 'DISCONNECT'}
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading ? (
            <>
              <PostSkeleton />
              <PostSkeleton />
            </>
          ) : (
            contentSections.map((section, i) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-black border-[var(--matrix-green)] hover:border-[var(--matrix-green)]/90 hover:shadow-[var(--matrix-green)]/10 transition-all duration-300 h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <div className="text-[var(--matrix-green)]">
                        {section.icon}
                      </div>
                      <CardTitle className="text-[var(--matrix-green)] font-mono text-xl tracking-wider">
                        {section.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-[var(--matrix-green)]/70 font-mono mt-4 text-sm">
                      {section.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-8">
                    <div className="space-y-6">
                      {section.items.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.1 + index * 0.1 }}
                        >
                          <Button
                            variant="ghost"
                            className="w-full justify-between text-left font-mono hover:bg-[var(--matrix-green)]/5 py-3 h-auto group"
                            onClick={() => handlePostClick(item.slug)}
                          >
                            <span className="text-[var(--matrix-green)] group-hover:text-[var(--matrix-green)] text-sm">
                              {item.title}
                            </span>
                            <div className="flex items-center gap-3 text-xs text-[var(--matrix-green)]/70">
                              <span>{item.date}</span>
                              <ChevronRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </Button>
                        </motion.div>
                      ))}
                      {'hasMore' in section && section.hasMore && (
                        <Button
                          variant="ghost"
                          className="w-full mt-4 hover:bg-[var(--matrix-green)]/5"
                          onClick={section.loadMore}
                        >
                          LOAD MORE
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </main>
    </div>
  )
} 