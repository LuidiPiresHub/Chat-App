import useLogout from '../hooks/useLogout';

export default function Chat() {
  const { mutate: logout } = useLogout();

  return (
    <main>
      <h1>Chat</h1>
      <button
        onClick={() => logout()}
        className='bg-red-500 text-white px-4 py-2 rounded'
      >
        Deslogar
      </button>
    </main>
  )
}
