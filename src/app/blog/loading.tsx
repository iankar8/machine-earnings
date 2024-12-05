'use client';

import { motion } from 'framer-motion';

export default function BlogLoading() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Loading header */}
      <div className="mb-8">
        <motion.div
          className="h-8 w-48 bg-green-900/20 rounded"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      {/* Loading grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="border border-green-500/20 rounded-lg p-4 h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="space-y-4">
              <motion.div
                className="h-32 bg-green-900/20 rounded"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
              <motion.div
                className="h-4 w-3/4 bg-green-900/20 rounded"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
              <motion.div
                className="h-4 w-1/2 bg-green-900/20 rounded"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
