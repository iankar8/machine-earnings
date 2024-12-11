'use client'

import React from 'react'

const MatrixRain = (): JSX.Element | null => {
  React.useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.className = 'matrix-rain'
    document.body.appendChild(canvas)
    const ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()'.split('')
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: Array<{ y: number; speed: number }> = []

    for (let i = 0; i < columns; i++) {
      drops[i] = {
        y: Math.random() * canvas.height,
        speed: 0.3 + Math.random() * 0.5
      }
    }

    function draw() {
      if (!ctx) return
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#0F0'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)] || ''
        const drop = drops[i];
        if (!drop?.y) continue;
        const opacity = (canvas.height - drop.y) / canvas.height
        ctx.globalAlpha = Math.min(0.8, opacity + 0.2)
        ctx.fillText(text, i * fontSize, drop.y)
        ctx.globalAlpha = 1
        
        if (drop.y > canvas.height) {
          drop.y = -fontSize * (5 + Math.random() * 10)
          drop.speed = 0.3 + Math.random() * 0.5
        }
        
        drop.y += drop.speed * fontSize
      }
    }

    const interval = setInterval(draw, 50)
    
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(interval)
      canvas.remove()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return null
}

export default MatrixRain 