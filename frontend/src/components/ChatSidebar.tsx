import { UserPlus2, Settings, UserCircle2 } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUserData } from '../interfaces/userData';
import SearchBar from './SearchBar';

interface IChatSidebarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  user: IUserData;
  setSelectedFriend: Dispatch<SetStateAction<IUserData | null>>;
  selectedFriend: IUserData | null;
  friends: IUserData[];
}

export default function ChatSidebar({ isMenuOpen, setIsMenuOpen, user, setSelectedFriend, selectedFriend, friends }: IChatSidebarProps) {
  const asideRef = useRef<HTMLDivElement | null>(null);
  const currentFriendRef = useRef<HTMLLIElement | null>(null);
  const [search, setSearch] = useState<string>('');
  const [translateX, setTranslateX] = useState(-100);
  const [withTransition, setWithTransition] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const draggingFromEdge = useRef(false);
  const isDraggingHorizontally = useRef(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      startX.current = e.touches[0].clientX;
      startY.current = e.touches[0].clientY;
      isDraggingHorizontally.current = false;

      if (!isMenuOpen && startX.current < 50) {
        draggingFromEdge.current = true;
      } else if (isMenuOpen) {
        draggingFromEdge.current = true;
      } else {
        draggingFromEdge.current = false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!draggingFromEdge.current) return;
      e.preventDefault();

      const diffX = e.touches[0].clientX - startX.current;
      const diffY = e.touches[0].clientY - startY.current;

      if (!isDraggingHorizontally.current) {
        if (Math.abs(diffX) > Math.abs(diffY)) {
          isDraggingHorizontally.current = true;
        } else {
          draggingFromEdge.current = false;
          return;
        }
      }

      setWithTransition(false);

      if (!isMenuOpen && diffX > 0) {
        setTranslateX(Math.min(0, -100 + (diffX / window.innerWidth) * 100));
      } else if (isMenuOpen && diffX < 0) {
        setTranslateX(Math.max(-100, (diffX / window.innerWidth) * 100));
      }
    };

    const handleTouchEnd = () => {
      if (!draggingFromEdge.current) return;

      setWithTransition(true);

      if (!isMenuOpen && translateX > -65) {
        setTranslateX(0);
        setIsMenuOpen(true);
      } else if (isMenuOpen && translateX < -35) {
        setTranslateX(-100);
        setIsMenuOpen(false);
      } else {
        setTranslateX(isMenuOpen ? 0 : -100);
      }

      draggingFromEdge.current = false;
      isDraggingHorizontally.current = false;
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [translateX, setIsMenuOpen, isMenuOpen]);

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

  useEffect(() => {
    if (isMenuOpen) setTranslateX(0);
    else setTranslateX(-100);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFriendClick = (friend: IUserData) => {
    if (friend.id === selectedFriend?.id) return;
    setSelectedFriend(friend);
    setIsMenuOpen(false);
  };

  const handleAddFriend = () => {
    setSelectedFriend(null);
    setIsMenuOpen(false);
  };

  const filteredFriends = friends.filter((friend) =>
    friend.nickname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside
      ref={asideRef}
      style={{
        transform: isMobile ? `translateX(${translateX}%)` : undefined,
        transition: isMobile ? (withTransition ? 'transform 0.3s ease' : 'none') : undefined,
      }}
      className="bg-[#141428] h-dvh absolute z-1 md:static w-full max-w-70 flex flex-col gap-4 border-r border-gray-800 p-4 select-none"
    >
      <h1 className="text-4xl font-bold">Chat App</h1>
      <button
        type="button"
        onClick={handleAddFriend}
        className="bg-gray-700 rounded-lg py-2 px-3 gap-3 flex items-center cursor-pointer"
      >
        <UserPlus2 className="size-5" />
        Amigos
      </button>
      <SearchBar id="sidebar" placeholder="Pesquise um amigo..." setSearch={setSearch} />
      <p className="text-gray-400 px-5 border-t border-t-gray-800 pt-2 -mx-4">
        Mensagens diretas
      </p>
      <ul className="flex flex-1 flex-col -mx-4 px-4 gap-1 overflow-y-auto overflow-x-hidden scrollbar-thin">
        {filteredFriends.map((friend) => (
          <li
            key={friend.id}
            ref={friend.id === selectedFriend?.id ? currentFriendRef : null}
            className={`w-[calc(100%+3px)] flex items-center gap-2 cursor-pointer rounded-lg p-2 ${friend.id === selectedFriend?.id ? 'bg-gray-700' : 'bg-transparent'} hover:bg-gray-800`}
            onClick={() => handleFriendClick(friend)}
          >
            <UserCircle2 className="size-8" />
            <span className="flex-1 truncate">{friend.nickname}</span>
          </li>
        ))}
      </ul>
      <section className="flex items-center justify-between gap-2 bg-gray-700 rounded-lg p-2">
        <div className="flex items-center gap-2 truncate flex-1">
          <UserCircle2 className="size-8" />
          <span className="truncate flex-1">{user.nickname}</span>
        </div>
        <Settings className="size-5 cursor-pointer" onClick={() => navigate('/settings')} />
      </section>
    </aside>
  );
}
