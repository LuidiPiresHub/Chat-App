import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';
import astronaut from '../assets/astronaut.png';

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let stars: {
      x: number;
      y: number;
      size: number;
      opacity: number;
      delta: number;
    }[] = [];

    const generateStars = () => {
      stars = Array.from({ length: 100 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1,
        opacity: Math.random(),
        delta: (Math.random() * 0.02) + 0.005,
      }));
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateStars();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.opacity += star.delta;
        if (star.opacity >= 1 || star.opacity <= 0) star.delta *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <main className='bg-zinc-900 w-full h-dvh p-4 overflow-hidden relative flex items-center justify-center flex-wrap sm:flex-nowrap content-center'>
      <canvas ref={canvasRef} className='absolute left-0 top-0'></canvas>
      <img src={astronaut} alt="Astronauta flutuando" className='w-full max-w-60 relative z-1 animate-float' />
      <section className='relative z-1 flex flex-col gap-4'>
        <h1 className="text-6xl sm:text-7xl font-bold animate-pulse">404</h1>
        <h2 className="text-2xl sm:text-3xl">Opa! Página não encontrada.</h2>
        <Link
          to="/"
          className="mt-4 inline-flex items-center text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200"
        >
          <MoveLeft className="mr-2" />
          Voltar ao início
        </Link>
      </section>
    </main>
  );
}
