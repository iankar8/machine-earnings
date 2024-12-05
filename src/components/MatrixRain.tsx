import React, { useEffect, useRef, useState } from 'react';

interface Props {
  onComplete: () => void;
  shouldFreeze?: boolean;
}

export const MatrixRain: React.FC<Props> = ({ onComplete, shouldFreeze = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 20;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];
    const chars = "01";
    const frozenChars: { [key: string]: string } = {};
    let frameCount = 0;

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    function draw() {
      frameCount++;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px Courier, monospace`;
      ctx.textAlign = 'center';

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (shouldFreeze && frozenChars[`${x},${y}`]) {
          ctx.fillStyle = '#0f0';
          ctx.fillText(frozenChars[`${x},${y}`], x, y);
          continue;
        }

        const text = chars[Math.floor(Math.random() * chars.length)];
        
        if (shouldFreeze) {
          frozenChars[`${x},${y}`] = text;
        }

        const gradient = ctx.createLinearGradient(x, y - fontSize * 3, x, y);
        gradient.addColorStop(0, 'rgba(0, 255, 0, 0)');
        gradient.addColorStop(0.5, 'rgba(0, 255, 0, 0.5)');
        gradient.addColorStop(1, '#0f0');
        
        ctx.fillStyle = gradient;
        ctx.fillText(text, x, y);

        if (Math.random() > 0.95) {
          ctx.fillStyle = '#fff';
          ctx.fillText(text, x, y);
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        if (!shouldFreeze) {
          drops[i]++;
        }
      }

      if (frameCount === 60 && !isComplete) {
        setIsComplete(true);
        onComplete();
      }

      requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [onComplete, shouldFreeze, isComplete]);

  return <canvas ref={canvasRef} className="fixed inset-0" />;
}; 