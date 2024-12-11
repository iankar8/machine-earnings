'use client';

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Press_Start_2P } from 'next/font/google'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import { getPost } from '@/lib/ghost'
import { Post } from '@/types/ghost'
import { PostContentSkeleton } from '@/components/ui/post-skeleton'
import { ReadingProgress } from '@/components/ui/reading-progress'
import { TableOfContents, useHeadings } from '@/components/ui/table-of-contents'

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
})

export default function PostPage() {
  const router = useRouter()
  const params = useParams()
  const [post, setPost] = React.useState<Post | null>(null)
  const [loading, setLoading] = React.useState(true)
  const { headings, activeId } = useHeadings()

  React.useEffect(() => {
    async function fetchPost() {
      try {
        if (typeof params.slug === 'string') {
          const postData = await getPost(params.slug)
          setPost(postData)
        }
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-[var(--matrix-green)]">
        <ReadingProgress />
        <div className="container mx-auto px-6 py-16">
          <PostContentSkeleton />
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-[var(--matrix-green)] flex items-center justify-center">
        <div className="text-xl font-mono">POST NOT FOUND</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-[var(--matrix-green)]">
      <ReadingProgress />
      
      {/* Header */}
      <header className="border-b border-[var(--matrix-green)]/30 bg-black/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="hover:bg-[var(--matrix-green)]/5"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </Button>
            <h1 className={`text-xl glow-text ${pressStart2P.className}`}>
              MACHINE EARNINGS
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-black border-[var(--matrix-green)] shadow-lg shadow-[var(--matrix-green)]/5">
              <CardContent className="p-8">
                <div className="space-y-8">
                  {/* Post Header */}
                  <div className="space-y-4">
                    <h1 className="text-3xl font-mono text-[var(--matrix-green)] tracking-wide">
                      {post.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-[var(--matrix-green)]/70 font-mono">
                      {post.primary_author && (
                        <span>By {post.primary_author.name}</span>
                      )}
                      <span>
                        {new Date(post.published_at).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      {post.reading_time && (
                        <span>{post.reading_time} min read</span>
                      )}
                    </div>
                  </div>

                  {/* Feature Image */}
                  {post.feature_image && (
                    <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                      <img
                        src={post.feature_image}
                        alt={post.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}

                  {/* Post Content */}
                  <div 
                    className="prose prose-invert prose-green max-w-none font-mono"
                    dangerouslySetInnerHTML={{ __html: post.html || '' }}
                  />

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-8">
                      {post.tags.map(tag => (
                        <span
                          key={tag.id}
                          className="px-3 py-1 text-xs font-mono rounded-full border border-[var(--matrix-green)]/30 text-[var(--matrix-green)]/70"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Table of Contents */}
          {headings.length > 0 && (
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents headings={headings} activeId={activeId} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
} 