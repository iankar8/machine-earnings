'use client';

import React from 'react'
import { Press_Start_2P } from 'next/font/google'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRightIcon } from "@radix-ui/react-icons"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from 'next/navigation'

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
})

const features = [
  {
    id: 'weekly',
    title: 'WEEKLY ROUNDUP',
    description: 'Essential AI business updates'
  },
  {
    id: 'essays',
    title: 'ESSAYS',
    description: 'Deep dives on key trends'
  },
  {
    id: 'community',
    title: 'COMMUNITY',
    description: 'Connect with AI leaders'
  }
]

export default function Home() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = React.useState<'welcome' | 'main'>('welcome')
  const [email, setEmail] = React.useState('')
  const [mounted, setMounted] = React.useState(false)
  const [selectedFeatures, setSelectedFeatures] = React.useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isAccessGranted, setIsAccessGranted] = React.useState(false)
  const [error, setError] = React.useState('')

  // Matrix rain effect setup
  const [matrixColumns, setMatrixColumns] = React.useState<Array<{
    id: number;
    chars: string[];
    speed: number;
    opacity: number;
  }>>([])

  React.useEffect(() => {
    setMounted(true)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*'
    const columns = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      chars: Array.from({ length: 25 }, () => characters[Math.floor(Math.random() * characters.length)] || characters[0]),
      speed: 1 + Math.random() * 2,
      opacity: 0.1 + Math.random() * 0.5
    }))
    setMatrixColumns(columns)
  }, [])

  const handleEnter = () => {
    setCurrentStep('main')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          subscriptions: selectedFeatures
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to subscribe')
      }

      // Show "ACCESS GRANTED" briefly before redirect
      setIsAccessGranted(true)
      
      // Wait a moment to show the "ACCESS GRANTED" message
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Store email and redirect
      localStorage.setItem('userEmail', email)
      router.push('/dashboard')
    } catch (error) {
      setError('Error subscribing. Please try again.')
      setIsAccessGranted(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    )
  }

  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && currentStep === 'welcome') {
        handleEnter()
      }
    }
    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [currentStep])

  // Check if user is already subscribed
  React.useEffect(() => {
    const userEmail = localStorage.getItem('userEmail')
    if (userEmail) {
      router.push('/dashboard')
    }
  }, [router])

  if (!mounted) return null

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="fixed inset-0 opacity-20">
        {matrixColumns.map((col) => (
          <div
            key={col.id}
            className="absolute text-[var(--matrix-green)]"
            style={{
              left: `${(col.id / matrixColumns.length) * 100}%`,
              animation: `matrixRain ${col.speed}s linear infinite`,
              opacity: col.opacity
            }}
          >
            {col.chars.map((char, i) => (
              <div key={i} className="text-xl">{char}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {currentStep === 'welcome' ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen flex flex-col items-center justify-center p-4"
          >
            <div className="text-center space-y-12">
              <motion.h1 
                className={`text-6xl md:text-8xl glow-text tracking-wider ${pressStart2P.className}`}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
              >
                MACHINE<br />EARNINGS
              </motion.h1>
              <motion.div
                className="space-y-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button 
                  onClick={handleEnter}
                  variant="outline"
                  size="lg"
                  className="group border-[var(--matrix-green)] hover:border-[var(--matrix-green)] hover:bg-[var(--matrix-green)]/10 transition-all duration-300 text-lg px-8"
                >
                  <span className="glow-text group-hover:scale-105 transition-transform duration-300">INITIALIZE</span>
                  <ChevronRightIcon className="ml-2 h-4 w-4 glow-text" />
                </Button>
                <div className="text-sm text-[var(--matrix-green)]/70 font-mono">Press Enter to begin</div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative min-h-screen flex flex-col items-center justify-center p-4"
          >
            <div className="w-full max-w-4xl mx-auto space-y-8">
              <Card className="bg-black/80 border-[var(--matrix-green)] backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className={`text-4xl md:text-5xl glow-text text-center ${pressStart2P.className} leading-relaxed`}>
                    SYSTEM UPGRADE
                  </CardTitle>
                  <CardDescription className="text-[var(--matrix-green)]/80 text-lg md:text-xl text-center mt-4 font-mono">
                    Select your intelligence feeds
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-12">
                  <div className="grid md:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 + 0.5 }}
                        className="relative group"
                      >
                        <Card 
                          className={`bg-black/50 border-[var(--matrix-green)]/50 hover:border-[var(--matrix-green)] transition-colors duration-300 cursor-pointer h-[180px] flex flex-col`}
                          onClick={() => toggleFeature(feature.id)}
                        >
                          <div className="flex flex-col h-full pt-6">
                            <div className="flex-1">
                              <CardTitle className="text-[var(--matrix-green)] text-center font-mono text-sm">
                                {feature.title}
                              </CardTitle>
                              <div className="text-center text-[var(--matrix-green)]/70 font-mono text-xs mt-4">
                                {feature.description}
                              </div>
                            </div>
                            <div className="flex justify-center mb-6">
                              <Checkbox
                                checked={selectedFeatures.includes(feature.id)}
                                className="border-[var(--matrix-green)] data-[state=checked]:bg-[var(--matrix-green)] data-[state=checked]:text-black h-5 w-5"
                                onCheckedChange={() => toggleFeature(feature.id)}
                              />
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="max-w-md mx-auto space-y-4"
                  >
                    <div className="text-center">
                      <motion.h3 
                        key={isAccessGranted ? 'granted' : 'pending'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`text-xl glow-text ${pressStart2P.className} mb-6`}
                      >
                        ACCESS {isAccessGranted ? 'GRANTED' : 'PENDING'}
                      </motion.h3>
                    </div>
                    <form 
                      className="space-y-4" 
                      onSubmit={handleSubmit}
                    >
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter access key (email)"
                        className="bg-black/50 border-[var(--matrix-green)]/50 text-[var(--matrix-green)] placeholder-[var(--matrix-green)]/30 focus:border-[var(--matrix-green)] h-12 font-mono"
                        required
                        disabled={isSubmitting}
                      />
                      {error && (
                        <div className="text-red-500 text-sm text-center font-mono">
                          {error}
                        </div>
                      )}
                      <Button 
                        type="submit"
                        variant="outline"
                        size="lg"
                        className="w-full border-[var(--matrix-green)]/50 hover:border-[var(--matrix-green)] hover:bg-[var(--matrix-green)]/10 transition-all duration-300 h-12 font-mono"
                        disabled={!email || selectedFeatures.length === 0 || isSubmitting}
                      >
                        <span className="glow-text">
                          {isSubmitting ? 'CONNECTING...' : 'ESTABLISH CONNECTION'}
                        </span>
                      </Button>
                    </form>
                  </motion.div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
