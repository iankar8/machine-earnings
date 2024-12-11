import * as React from "react"
import { Input } from "./input"
import { Card, CardContent } from "./card"
import { getPosts } from "@/lib/ghost"
import { Post } from "@/types/ghost"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Button } from "./button"

export function Search() {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<Post[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const searchRef = React.useRef<HTMLDivElement>(null)

  const searchPosts = React.useCallback(
    async (searchQuery: string) => {
      if (searchQuery.length < 2) {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const response = await getPosts(1, 5)
        const filtered = response.posts.filter(post =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setResults(filtered)
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  React.useEffect(() => {
    const handler = setTimeout(() => {
      searchPosts(query)
    }, 300)

    return () => clearTimeout(handler)
  }, [query, searchPosts])

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handlePostClick = (slug: string) => {
    router.push(`/post/${slug}`)
    setIsOpen(false)
    setQuery("")
  }

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Input
          type="search"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="w-[300px] pl-10 bg-black border-[var(--matrix-green)]/30 text-[var(--matrix-green)] placeholder-[var(--matrix-green)]/30"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--matrix-green)]/50" />
      </div>

      <AnimatePresence>
        {isOpen && (query.length > 1 || results.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 w-full z-50"
          >
            <Card className="bg-black border-[var(--matrix-green)]/30">
              <CardContent className="p-2">
                {isLoading ? (
                  <div className="p-4 text-center text-[var(--matrix-green)]/50">
                    Searching...
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-1">
                    {results.map((post) => (
                      <Button
                        key={post.id}
                        variant="ghost"
                        className="w-full justify-start font-mono text-left hover:bg-[var(--matrix-green)]/5"
                        onClick={() => handlePostClick(post.slug)}
                      >
                        <div className="truncate">
                          <div className="text-[var(--matrix-green)]">{post.title}</div>
                          {post.excerpt && (
                            <div className="text-xs text-[var(--matrix-green)]/50 truncate">
                              {post.excerpt}
                            </div>
                          )}
                        </div>
                      </Button>
                    ))}
                  </div>
                ) : query.length > 1 ? (
                  <div className="p-4 text-center text-[var(--matrix-green)]/50">
                    No results found
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 