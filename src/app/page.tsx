'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Press_Start_2P } from 'next/font/google';
import { useState } from 'react';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function Home(): JSX.Element {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-[#000000] text-green-500 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl w-full space-y-12 z-10"
      >
        <header className="text-center space-y-6">
          <motion.div 
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="border-2 border-green-500/50 bg-black/80 backdrop-blur-sm inline-block px-8 py-4">
              <div className={`glow-text ${pressStart2P.className} leading-relaxed`}>
                MACHINE<br />EARNINGS
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="text-lg md:text-xl text-green-400/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="font-mono text-green-400/80">
              A new publication exploring the business of Generative AI
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="max-w-md mx-auto pt-6"
          >
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full bg-black border-2 border-green-500/50 px-4 py-3 text-green-500 placeholder-green-500/50 focus:border-green-400 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-green-500 text-black py-3 hover:bg-green-400 transition-colors font-mono"
                >
                  SUBSCRIBE FOR UPDATES
                </button>
              </form>
            ) : (
              <div className="text-center text-green-500 font-mono">
                <div className="text-xl mb-2">✓</div>
                <div>Thanks for subscribing!</div>
              </div>
            )}
          </motion.div>
        </header>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Link href="/blog" className="group h-full">
            <div className="border-2 border-green-500/50 bg-black/80 backdrop-blur-sm p-8 hover:bg-green-500/5 hover:border-green-400 transition-all duration-300 h-full">
              <h2 className={`text-xl font-bold mb-4 group-hover:text-green-400 glow-text ${pressStart2P.className}`}>SEASON 1: COMING JANUARY 2025</h2>
              <p className="text-green-400/70 font-mono">
                A podcast interviewing business leaders on Gen AI.
              </p>
            </div>
          </Link>

          <Link href="/blog" className="group h-full">
            <div className="border-2 border-green-500/50 bg-black/80 backdrop-blur-sm p-8 hover:bg-green-500/5 hover:border-green-400 transition-all duration-300 h-full">
              <h2 className={`text-xl font-bold mb-4 group-hover:text-green-400 glow-text ${pressStart2P.className}`}>MACHINE EARNINGS DAILY</h2>
              <p className="text-green-400/70 font-mono">
                A daily newsletter written by AI Agents.
              </p>
            </div>
          </Link>
        </motion.div>

        <motion.div
          className="max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Link href="/blog" className="group block">
            <div className="border-2 border-green-500/50 bg-black/80 backdrop-blur-sm p-8 hover:bg-green-500/5 hover:border-green-400 transition-all duration-300">
              <h2 className={`text-xl font-bold mb-4 group-hover:text-green-400 glow-text ${pressStart2P.className} text-center`}>THE SWARM</h2>
              <p className="text-green-400/70 font-mono text-center mb-2">
                A private social network for builders.
              </p>
              <p className="text-sm text-green-400/50 text-center group-hover:text-green-400 group-hover:font-bold transition-all">
                Invite Only
              </p>
            </div>
          </Link>
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="inline-flex items-center space-x-2 text-sm text-green-400/50 font-mono">
            <span>[SYS]</span>
            <kbd className="px-2 py-1 border border-green-500/30 bg-black/50">CMD</kbd>
            <span>+</span>
            <kbd className="px-2 py-1 border border-green-500/30 bg-black/50">K</kbd>
            <span>TO INITIATE SEARCH PROTOCOL</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
