import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';
import astronaut from '../assets/astronaut.png';

interface IStar {
  x: number;
  y: number;
  size: number;
  opacity: number;
  delta: number;
}

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const STARS_AMOUNT = 100;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const generateStars = (width: number, height: number): IStar[] => {
      return Array.from({ length: STARS_AMOUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3,
        opacity: Math.random(),
        delta: Math.random() * 0.02 + 0.005,
      }));
    };

    let stars = generateStars(window.innerWidth, window.innerHeight);
    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = generateStars(canvas.width, canvas.height);
    };

    const drawStars = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, stars: IStar[]) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.opacity += star.delta;
        if (star.opacity >= 1 || star.opacity <= 0) star.delta *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
    };

    const animate = () => {
      drawStars(ctx, canvas, stars);
      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <main className='bg-zinc-950 w-full h-dvh p-4 overflow-hidden relative flex items-center justify-center flex-wrap sm:flex-nowrap content-center'>
      <canvas ref={canvasRef} className='absolute left-0 top-0'></canvas>
      <img src={astronaut} alt="Astronauta flutuando" className='w-full max-w-60 relative z-1 animate-float' />
      <section className='relative z-1 flex flex-col gap-4'>
        <h1 className="text-6xl sm:text-7xl font-bold animate-pulse">404</h1>
        <h2 className="text-2xl sm:text-3xl">Opa! Página não encontrada.</h2>
        <Link to="/" className="mt-4 inline-flex items-center text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200">
          <MoveLeft className="mr-2" />
          Voltar ao início
        </Link>
      </section>
    </main>
  );
}
