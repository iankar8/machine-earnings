'use client';

import { MatrixRain } from '@/components/MatrixRain';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Loading() {
  const [showText, setShowText] = useState(false);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative">
      <MatrixRain onComplete={() => setShowText(true)} shouldFreeze={showText} />
      
      {showText && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="z-10 text-center"
        >
          <div className="text-4xl md:text-6xl glow-text mb-4">
            WELCOME TO THE MACHINE
          </div>
          <div className="font-mono text-green-500/80">
            INITIALIZING...
          </div>
        </motion.div>
      )}
    </div>
  );
} 