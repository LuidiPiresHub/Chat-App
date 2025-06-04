import useLogout from '../hooks/useLogout';
import useAuth from '../hooks/useAuth';
import { MoveLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { user } = useAuth();
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();

  if (!user) return;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <main className="min-h-dvh p-4 bg-[#141428] text-white">
      <div className='flex items-center gap-4 mb-12'>
        <MoveLeft className='cursor-pointer' onClick={() => navigate('/')} />
        <h1 className="text-2xl font-semibold">Configurações da Conta</h1>
      </div>
      <section className="max-w-md mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-800 flex items-center justify-center text-2xl font-bold">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-lg font-medium">{user.username}</p>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>
        </div>
        <section className="bg-neutral-800 rounded p-4 space-y-2">
          <p><span className="text-gray-400">ID:</span> {user.id}</p>
          <p><span className="text-gray-400">Criado em:</span> {formatDate(user.createdAt)}</p>
          <p><span className="text-gray-400">Atualizado em:</span> {formatDate(user.updatedAt)}</p>
        </section>
        <button
          className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          onClick={() => logout()}
        >
          Logout
        </button>
      </section>
    </main>
  );
}
