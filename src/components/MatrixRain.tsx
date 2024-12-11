import React, { useEffect, useRef } from 'react';

interface Props {
  onComplete?: () => void;
}

interface Stream {
  x: number;
  y: number;
  speed: number;
  chars: string[];
}

export function MatrixRain({ onComplete }: Props): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamsRef = useRef<Stream[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const getRandomChar = (): string => {
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      return chars[Math.floor(Math.random() * chars.length)] || '0';
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStreams();
    };

    const initStreams = () => {
      const streams: Stream[] = [];
      const charWidth = 14; // Narrower character width
      const spacing = charWidth * 2; // Closer columns
      const streamCount = Math.floor(canvas.width / spacing);

      for (let i = 0; i < streamCount; i++) {
        const length = Math.floor(Math.random() * 35) + 25; // Longer streams
        streams.push({
          x: i * spacing,
          y: Math.random() * canvas.height * 2 - canvas.height,
          speed: 1.2, // Slower, more consistent speed
          chars: Array(length).fill('').map(() => getRandomChar())
        });
      }
      streamsRef.current = streams;
    };

    const draw = () => {
      // Darker fade for better contrast
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      streamsRef.current.forEach(stream => {
        stream.chars.forEach((char, i) => {
          const y = Math.floor(stream.y - i * 14); // Tighter vertical spacing
          if (y < canvas.height && y > 0) {
            if (i === 0) {
              // Much brighter lead character
              ctx.font = '14px monospace';
              ctx.fillStyle = 'rgba(220, 255, 220, 1)';
              ctx.fillText(char, stream.x, y);
            } else if (i < 5) {
              // First few characters are brighter
              ctx.font = '14px monospace';
              const alpha = 0.8 - (i * 0.15);
              ctx.fillStyle = `rgba(140, 255, 140, ${alpha})`;
              ctx.fillText(char, stream.x, y);
            } else {
              // Rest fade out more quickly
              ctx.font = '14px monospace';
              const alpha = Math.max(0.1, 1 - (i * 0.05));
              ctx.fillStyle = `rgba(0, 255, 70, ${alpha * 0.6})`;
              ctx.fillText(char, stream.x, y);
            }
          }
        });

        stream.y += stream.speed;
        if (stream.y - (stream.chars.length * 14) > canvas.height) {
          stream.y = -100 - Math.random() * 300; // More varied restart positions
          stream.chars = Array(stream.chars.length).fill('').map(() => getRandomChar());
        }

        // Occasional character changes
        if (Math.random() > 0.95) {
          const idx = Math.floor(Math.random() * stream.chars.length);
          stream.chars[idx] = getRandomChar();
        }
      });

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    draw();

    setTimeout(() => {
      onComplete?.();
    }, 7000);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full bg-black"
      style={{ zIndex: 0 }}
    />
  );
} 