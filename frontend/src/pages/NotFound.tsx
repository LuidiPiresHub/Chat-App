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
  speed: number;
}

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const createStars = (count: number, sizeRange: [number, number], speedRange: [number, number], opacityRange: [number, number]): IStar[] => {
      return Array.from({ length: count }, () => {
        const size = Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0];
        return {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size,
          opacity: Math.random() * (opacityRange[1] - opacityRange[0]) + opacityRange[0],
          delta: Math.random() * 0.02 + 0.005,
          speed: Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0],
        };
      });
    };

    let starsFar = createStars(60, [0.5, 1.2], [0.1, 0.3], [0.2, 0.6]);
    let starsMid = createStars(40, [1, 2], [0.3, 0.8], [0.4, 0.8]);
    let starsClose = createStars(20, [2, 3], [0.8, 1.5], [0.7, 1]);

    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      starsFar = createStars(60, [0.5, 1.2], [0.1, 0.3], [0.2, 0.6]);
      starsMid = createStars(40, [1, 2], [0.3, 0.8], [0.4, 0.8]);
      starsClose = createStars(20, [2, 3], [0.8, 1.5], [0.7, 1]);
    };

    const updateAndDraw = (stars: IStar[], color: string) => {
      stars.forEach((star) => {
        star.opacity += star.delta;
        if (star.opacity >= 1 || star.opacity <= 0) star.delta *= -1;

        star.y += star.speed;

        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${color}, ${star.opacity})`;
        ctx.fill();
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      updateAndDraw(starsFar, '200,200,255');
      updateAndDraw(starsMid, '255,255,255');
      updateAndDraw(starsClose, '255,230,200');

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
      <section className='relative z-1 flex flex-col gap-4 text-center'>
        <h1 className="text-6xl sm:text-7xl font-bold animate-pulse">404</h1>
        <h2 className="text-2xl sm:text-3xl">Opa! Página não encontrada.</h2>
        <Link to="/" className="mt-4 flex items-center text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200 max-[350px]:justify-center">
          <MoveLeft className="mr-2" />
          Voltar ao início
        </Link>
      </section>
    </main>
  );
}
