import { UserPlus2, Settings, UserCircle2 } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUserData } from '../interfaces/userData';
import { IFriend } from '../interfaces/friend';
import SearchBar from './SearchBar';

interface IChatSidebarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  user: IUserData;
  setSelectedFriend: Dispatch<SetStateAction<IFriend | null>>;
  selectedFriend: IFriend | null;
  friends: IFriend[];
}

export default function ChatSidebar({ isMenuOpen, setIsMenuOpen, user, setSelectedFriend, selectedFriend, friends }: IChatSidebarProps) {
  const asideRef = useRef<HTMLDivElement | null>(null);
  const currentFriendRef = useRef<HTMLLIElement | null>(null);
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (event: TouchEvent) => {
      if ((event.target as HTMLElement).closest('[data-ignore-touch]')) return;
      touchStartX = event.changedTouches[0].clientX;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      touchEndX = event.changedTouches[0].clientX;
      const diff = touchEndX - touchStartX;
      if (diff > 50) setIsMenuOpen(true);
      if (diff < -50) setIsMenuOpen(false);
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [setIsMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: TouchEvent) => {
      if (asideRef.current && !asideRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  useEffect(() => {
    if (selectedFriend) {
      currentFriendRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedFriend]);

  const handleFriendClick = (friend: IFriend) => {
    if (friend.id === selectedFriend?.id) return;
    setSelectedFriend(friend);
    setIsMenuOpen(false);
  };

  const handleAddFriend = () => {
    setSelectedFriend(null);
    setIsMenuOpen(false);
  };

  const filteredFriends = friends.filter((friend) => friend.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <aside ref={asideRef} className={`bg-[#141428] h-dvh absolute z-1 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition md:static md:translate-x-0 w-full max-w-70 flex flex-col gap-4 border-r border-gray-800 p-4 select-none`}>
      <h1 className='text-4xl font-bold'>Chat App</h1>
      <button
        onClick={handleAddFriend}
        className='bg-gray-700 rounded-lg py-2 px-3 gap-3 flex items-center cursor-pointer'
      >
        <UserPlus2 className='size-5' />
        Amigos
      </button>
      <SearchBar id='sidebar' placeholder='Pesquise um amigo...' setSearch={setSearch} />
      <p className='text-gray-400 px-5 border-t border-t-gray-800 pt-2 -mx-4'>Mensanges diretas</p>
      <ul className='flex flex-1 flex-col -mx-4 px-4 gap-1 overflow-y-scroll overflow-x-hidden scrollbar-thin'>
        {filteredFriends.map((friend) => (
          <li
            key={friend.id}
            ref={friend.id === selectedFriend?.id ? currentFriendRef : null}
            className={`w-[calc(100%+3px)] flex items-center gap-2 cursor-pointer rounded-lg p-2 ${friend.id === selectedFriend?.id ? 'bg-gray-700' : 'bg-transparent'} hover:bg-gray-800`}
            onClick={() => handleFriendClick(friend)}
          >
            <UserCircle2 className='size-8' />
            <span className='flex-1 truncate'>{friend.name}</span>
          </li>
        ))}
      </ul>
      <section className='flex items-center justify-between gap-2 bg-gray-700 rounded-lg p-2'>
        <div className='flex items-center gap-2 truncate flex-1'>
          <UserCircle2 className='size-8' />
          <span className='truncate flex-1'>{user.username}</span>
        </div>
        <Settings className='size-5 cursor-pointer' onClick={() => navigate('/settings')} />
      </section>
    </aside>
  );
}
