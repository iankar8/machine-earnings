'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import type { GhostTag, GhostPost } from '@/types/ghost';
import debounce from 'lodash/debounce';
import Typewriter from 'typewriter-effect';
import PostCard from '@/components/PostCard';

export const BlogContent = ({ 
  initialPosts, 
  initialTags 
}: { 
  initialPosts: GhostPost[];
  initialTags: GhostTag[];
}): JSX.Element => {
  const [posts] = useState<GhostPost[]>(initialPosts);
  const [tags] = useState<GhostTag[]>(initialTags);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (hasVisited) {
      setShowOnboarding(false);
    } else {
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  const handleSubscribe = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setShowOnboarding(false), 2000);
  };

  const handleSearch = useCallback((value: string): void => {
    setSearchQuery(value);
  }, []);

  const debouncedSearch = useMemo(
    () => debounce(handleSearch, 300),
    [handleSearch]
  );

  const handleCategoryChange = useCallback((category: string): void => {
    setSelectedCategory(category);
    setIsCategoryDropdownOpen(false);
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = selectedCategory === "All Posts" || 
        (post.primary_tag && post.primary_tag.name === selectedCategory);
      const matchesSearch = searchQuery === "" ||
        post.tags?.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <main className="min-h-screen bg-black text-green-500 p-4 md:p-8">
      <AnimatePresence>
        {showOnboarding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-lg w-full bg-black border-2 border-green-500 p-12"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-press-start-2p mb-4 h-12">
                  <Typewriter
                    onInit={(typewriter): void => {
                      typewriter
                        .typeString('JOIN THE REVOLUTION')
                        .pauseFor(1500)
                        .deleteAll()
                        .typeString('MACHINE EARNINGS')
                        .start();
                    }}
                  />
                </h2>
                <div className="text-green-500/80 h-12 text-lg">
                  <Typewriter
                    onInit={(typewriter): void => {
                      typewriter
                        .pauseFor(4000)
                        .typeString('A new publication covering the business of Gen AI. Sign up for our daily newsletter')
                        .start();
                    }}
                  />
                </div>
                
                {!isSubscribed ? (
                  <form onSubmit={handleSubscribe} className="space-y-6">
                    <input
                      type="email"
                      value={email}
                      onChange={(e): void => setEmail(e.target.value)}
                      placeholder="Enter your email..."
                      className="w-full bg-black border-2 border-green-500 px-4 py-3 text-green-500 placeholder-green-500/50"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-green-500 text-black py-3 hover:bg-green-400 transition-colors font-press-start-2p text-sm"
                    >
                      SUBSCRIBE
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-green-500"
                  >
                    <div className="text-xl mb-2">✓</div>
                    <div>Welcome aboard!</div>
                  </motion.div>
                )}
                
                <div className="flex justify-center">
                  <button
                    onClick={(): void => setShowOnboarding(false)}
                    className="text-sm text-green-500/50 hover:text-green-500 transition-colors"
                  >
                    Skip for now →
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <header className="mb-12">
          <motion.h1 
            className="text-4xl md:text-6xl font-press-start-2p mb-4"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            MACHINE EARNINGS
          </motion.h1>
          <motion.div 
            className="h-1 w-32 bg-green-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
        </header>

        <div className="flex justify-between items-center mb-12">
          <div className="relative" ref={categoryRef}>
            <button
              onClick={(): void => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className="border border-green-500 px-4 py-2 flex items-center space-x-2 hover:bg-green-500/5"
            >
              <span>📅 WEEKLY COLUMN</span>
              <span className="text-xs">▼</span>
            </button>
            {isCategoryDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 mt-2 w-48 border border-green-500 bg-black z-10"
              >
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={(): void => handleCategoryChange(tag.name)}
                    className="w-full px-4 py-2 text-left hover:bg-green-500/10 text-sm"
                  >
                    {tag.name}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          <div className="relative" ref={searchRef}>
            <input
              type="text"
              placeholder="Search by tags or title..."
              className="w-64 bg-black border border-green-500 px-4 py-2 text-green-500 placeholder-green-500/50"
              onChange={(e): void => debouncedSearch(e.target.value)}
              onFocus={(): void => setIsSearchFocused(true)}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500/50">⌘K</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </motion.div>
    </main>
  );
}; 