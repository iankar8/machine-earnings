'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <motion.div
        className="text-green-500 font-mono text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center">
            <div className="mb-2">LOADING DATA</div>
            <div className="flex space-x-2">
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
              >
                ▮
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5, delay: 0.2 }}
              >
                ▮
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5, delay: 0.4 }}
              >
                ▮
              </motion.span>
            </div>
          </div>
          <div className="text-xs text-green-500/50">ESTABLISHING CONNECTION</div>
        </div>
      </motion.div>
    </div>
  );
}
