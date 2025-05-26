import { Dispatch, SetStateAction, useState } from 'react'
import { UserCircle2, UserPlus2 } from 'lucide-react'
import { IFriend } from '../interfaces/friend'
import SearchBar from './SearchBar';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

interface IChatFriendsProps {
  friends: IFriend[];
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  isMenuOpen: boolean;
  setSelectedFriend: Dispatch<SetStateAction<IFriend | null>>;
}

type Tab = 'online' | 'all' | 'add' | 'pending'

interface IFormData {
  friendRequest: string;
}

export default function ChatFriends({ friends, setIsMenuOpen, isMenuOpen, setSelectedFriend }: IChatFriendsProps) {
  const [selectedTab, setSelectedTab] = useState<Tab>('online')
  const [search, setSearch] = useState<string>('')
  const { register, handleSubmit, reset } = useForm<IFormData>();
  
  const headerData = [
    { key: 'online', label: 'Disponível', special: false },
    { key: 'all', label: 'Todos', special: false },
    { key: 'pending', label: 'Pendentes', special: false },
    { key: 'add', label: 'Adicionar Amigo', special: true }
  ]

  const renderFriends = (friends: IFriend[]) => {
    return (
      <ul className='flex flex-col overflow-y-scroll scrollbar -my-1 -mx-4 px-4'>
        {friends.map((friend) => (
          <li
            key={friend.id}
            onClick={() => setSelectedFriend(friend)}
            className='flex items-center gap-2 border-t border-gray-700 p-4 select-none hover:bg-gray-800 cursor-pointer'
          >
            <UserCircle2 className='size-8' />
            <span className='flex-1 truncate'>{friend.name}</span>
          </li>
        ))}
      </ul>
    )
  }

  const handleMenuOpen = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    }
  }

  const sendFriendRequest = (formData: IFormData) => {
    const friendNick = formData.friendRequest.trim();
    if (!friendNick) return;
    Swal.fire({
      title: 'Pedido de amizade enviado',
      text: `Você enviou um pedido de amizade para "${friendNick}".`,
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#7C3AED',
      background: '#1E1B4B',
      color: '#E0E7FF',
      iconColor: '#F472B6',
      showCloseButton: true,
    })
    reset();
  }

  return (
    <section className='flex flex-col flex-1 overflow-x-hidden'>
      <header data-ignore-touch className='flex items-center gap-4 border-b border-b-gray-800 py-3 px-4 text-gray-300 overflow-x-scroll scrollbar-thin'>
        <div className='flex items-center gap-2 min-w-max' onClick={handleMenuOpen}>
          <UserPlus2 className='size-6 text-gray-400' />
          <span>Amigos</span>
        </div>
        {headerData.map(({ key, label, special }) => (
          <button
            key={key}
            onClick={() => setSelectedTab(key as Tab)}
            className={`rounded-lg py-1 px-3 cursor-pointer transition-colors min-w-max ${special ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'text-gray-300 hover:bg-gray-700'} ${selectedTab === key ? 'bg-gray-700' : ''}`.trim()}
          >
            {label}
          </button>
        ))}
      </header>
      <section className='p-4 flex flex-col gap-5 flex-1 overflow-y-hidden'>
        {selectedTab === 'online' && (
          <>
            <h1 className='text-2xl font-bold'>Online - 5</h1>
            <SearchBar id='online' placeholder='Pesquise um amigo...' setSearch={setSearch} />
            {renderFriends(friends.slice(0, 5).filter((friend) => friend.name.toLowerCase().includes(search.toLowerCase())))}
          </>
        )}

        {selectedTab === 'all' && (
          <>
            <h1 className='text-2xl font-bold'>{`Todos os amigos - ${friends.length}`}</h1>
            <SearchBar id='all' placeholder='Pesquise um amigo...' setSearch={setSearch} />
            {renderFriends(friends.filter((friend) => friend.name.toLowerCase().includes(search.toLowerCase())))}
          </>
        )}

        {selectedTab === 'add' && (
          <div className='flex flex-col gap-4'>
            <div className='space-y-1'>
              <h1 className='text-2xl font-bold text-white'>Adicionar amigo</h1>
              <p className='text-sm text-gray-400'>
                Você pode adicionar amigos com o nome de usuário e tag. Exemplo: <span className='font-mono'>Username#1234</span>
              </p>
            </div>

            <form onSubmit={handleSubmit(sendFriendRequest)} className='flex gap-2 items-center'>
              <SearchBar
                id='add'
                placeholder='Digite o nick e tag do amigo...'
                setSearch={setSearch}
                labelClass='flex-1'
                inputClass='pr-13'
                register={register('friendRequest')}
              />
              <button className='bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition'>
                Enviar
              </button>
            </form>
          </div>
        )}
      </section>
    </section>
  )
}
