import { Link } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';

export default function NotFound() {
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 100; i++) {
      const starSize = Math.random() * 5 + 1;
      stars.push(
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            width: `${starSize}px`,
            height: `${starSize}px`,
            backgroundColor: 'white',
            borderRadius: '50%',
            opacity: Math.random().toString(),
          }}
          className='animate-pulse'
        />
      );
    }
    return stars;
  };

  return (
    <main className='bg-zinc-900 w-full h-screen flex items-center justify-center'>
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden'>
        {generateStars()}
      </div>
      <section className='flex flex-col gap-4 items-center justify-center h-full text-white z-1 absolute'>
        <h1 className='text-6xl font-bold animate-ping mb-8'>404</h1>
        <h2 className='text-2xl'>Opa! Página não encontrada.</h2>
        <Link
          to="/"
          className='cursor-pointer mt-4 text-blue-500 hover:underline flex items-center'
        >
          <MoveLeft className='mr-2' />
          Voltar ao início
        </Link>
      </section>
    </main>
  )
}
