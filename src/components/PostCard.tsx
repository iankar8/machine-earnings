import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GhostPost } from '@/types/ghost';

interface PostCardProps {
  post: GhostPost;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="border border-green-500/20 rounded-lg overflow-hidden hover:border-green-500/40 transition-colors"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48">
          {post.feature_image && (
            <Image
              src={post.feature_image}
              alt={post.title}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black opacity-30" />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>
          <p className="text-green-500/80 text-sm mb-4">
            {post.excerpt?.slice(0, 120)}...
          </p>
          <div className="flex justify-between items-center text-sm text-green-500/60">
            <time>{new Date(post.published_at).toLocaleDateString()}</time>
            {post.reading_time && <span>{post.reading_time} min read</span>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 