import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MatrixRain } from './MatrixRain';
import Typewriter from 'typewriter-effect';

interface Props {
  onComplete: () => void;
}

export default function IntroSequence({ onComplete }: Props): JSX.Element {
  const [showQuestion, setShowQuestion] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    // Show question after initial matrix effect
    const questionTimer = setTimeout(() => {
      setShowQuestion(true);
    }, 2000);

    // Start terminal sequence
    const terminalTimer = setTimeout(() => {
      setShowTerminal(true);
    }, 7000);

    // Complete sequence
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 15000);

    return () => {
      clearTimeout(questionTimer);
      clearTimeout(terminalTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="fixed inset-0">
        <MatrixRain />
      </div>

      {/* Question at Top */}
      <AnimatePresence>
        {showQuestion && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-20 bg-black/80 p-8 text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-4xl font-mono text-green-500 mb-4">
              OPEN QUESTION:
            </h1>
            <p className="text-xl md:text-3xl font-mono text-green-400">
              WHAT IMPACT IS GEN AI HAVING ON THE BUSINESS WORLD?
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Output */}
      <AnimatePresence>
        {showTerminal && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-20 bg-black/90 p-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-mono text-green-500 text-lg md:text-xl max-w-3xl mx-auto">
              <Typewriter
                options={{
                  delay: 30,
                  cursor: '▋',
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString('> Analysis complete.')
                    .pauseFor(500)
                    .typeString('<br/>> Key findings:')
                    .pauseFor(300)
                    .typeString('<br/>> Enterprise GTM challenges identified')
                    .pauseFor(300)
                    .typeString('<br/>> Revenue use-cases unclear')
                    .pauseFor(300)
                    .typeString('<br/>> Industry network gaps detected')
                    .pauseFor(500)
                    .typeString('<br/><br/>> Initializing Machine Earnings...')
                    .start();
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 