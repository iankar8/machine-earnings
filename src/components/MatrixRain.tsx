import React, { useEffect, useRef } from 'react';

interface Props {
  onComplete?: () => void;
  shouldFreeze?: boolean;
}

interface Drop {
  x: number;
  y: number;
  char: string;
  speed: number;
}

export function MatrixRain({ onComplete, shouldFreeze = false }: Props): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<Drop[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas || !ctx) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDrops();
    };

    const initDrops = () => {
      if (!canvas) return;
      const drops: Drop[] = [];
      const columns = Math.floor(canvas.width / 20);
      
      for (let i = 0; i < columns; i++) {
        drops.push({
          x: i * 20,
          y: Math.random() * canvas.height,
          char: String.fromCharCode(0x30A0 + Math.random() * 96),
          speed: Math.random() * 2 + 1,
        });
      }
      dropsRef.current = drops;
    };

    const draw = () => {
      if (!canvas || !ctx) return;

      if (!shouldFreeze) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.fillStyle = '#0F0';
      ctx.font = '20px monospace';

      dropsRef.current.forEach((drop, i) => {
        const char = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillText(char, drop.x, drop.y);

        if (!shouldFreeze) {
          drop.y += drop.speed;
          if (drop.y > canvas.height) {
            drop.y = 0;
            drop.char = String.fromCharCode(0x30A0 + Math.random() * 96);
          }
        }
      });

      if (!shouldFreeze) {
        animationFrameRef.current = requestAnimationFrame(draw);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    draw();

    setTimeout(() => {
      onComplete?.();
    }, 2000);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [shouldFreeze, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
} 