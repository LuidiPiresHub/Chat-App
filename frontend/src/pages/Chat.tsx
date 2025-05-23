import { useEffect, useRef, useState } from 'react';
import { UserCircle2, Plus, Send, Settings, ArrowLeft, Search } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Chat() {
  const friends = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'David' },
    { id: 5, name: 'Eve' },
    { id: 6, name: 'Frank' },
    { id: 7, name: 'Grace' },
    { id: 8, name: 'Heidi' },
    { id: 9, name: 'Ivan' },
    { id: 10, name: 'Judy' },
    { id: 11, name: 'Mallory' },
    { id: 12, name: 'Niaj' },
    { id: 13, name: 'Olivia' },
    { id: 14, name: 'Peggy' },
    { id: 15, name: 'Rupert' },
    { id: 16, name: 'Sybil' },
    { id: 17, name: 'Trent' },
    { id: 18, name: 'Victor' },
    { id: 19, name: 'Walter' },
    { id: 20, name: 'Xena' },
  ]

  const messages = [
    { id: 1, sender: 'Alice', text: 'Hello! How are you?' },
    { id: 2, sender: 'Bob', text: 'I am fine, thank you!' },
    { id: 3, sender: 'Alice', text: 'What about you?' },
    { id: 4, sender: 'Bob', text: 'I am doing well!' },
    { id: 5, sender: 'Alice', text: 'Great to hear!' },
    { id: 6, sender: 'Bob', text: 'What are you up to?' },
    { id: 7, sender: 'Alice', text: 'Just working on some projects.' },
    { id: 8, sender: 'Bob', text: 'Sounds interesting!' },
    { id: 9, sender: 'Alice', text: 'Yeah, I am learning a lot.' },
    { id: 10, sender: 'Bob', text: 'That is awesome!' },
    { id: 11, sender: 'Alice', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, minus laboriosam pariatur eos debitis id delectus, commodi aperiam rerum exercitationem earum nam doloribus quibusdam vel mollitia ipsa itaque! Impedit, quidem.' },
    { id: 12, sender: 'Bob', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, minus laboriosam pariatur eos debitis id delectus, commodi aperiam rerum exercitationem earum nam doloribus quibusdam vel mollitia ipsa itaque! Impedit, quidem.' },
  ]

  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const asideRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].clientX;
      if (touchStartX.current !== null && touchEndX.current !== null) {
        const diff = touchEndX.current - touchStartX.current;
        if (diff > 50) setIsMenuOpen(true);
        if (diff < -50) setIsMenuOpen(false);
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (asideRef.current && !asideRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  if (!user) return;

  const filteredFriends = friends.filter((friend) => friend.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <main className='h-dvh flex'>
      <aside ref={asideRef} className={`bg-[#141428] h-dvh absolute z-1 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition md:static md:translate-x-0 w-full max-w-70 flex flex-col gap-4 border-r border-gray-800 p-4 select-none`}>
        <h1 className='text-4xl font-bold'>Chat</h1>
        <button className='bg-gray-700 rounded-lg py-3 px-3 gap-3 flex items-center cursor-pointer'>
          <Plus className='size-5' />
          Add Friend
        </button>
        <label htmlFor="search" className='relative'>
          <input
            id='search'
            type="text"
            placeholder='Search a friend...'
            className='bg-gray-700 w-full p-3 rounded-lg outline-none'
            onChange={({ target: { value } }) => setSearch(value.trim())}
          />
          <Search className='absolute size-5 right-4 top-1/2 transform -translate-y-1/2' />
        </label>
        <ul className='flex flex-1 flex-col -mx-4 px-4 gap-1 overflow-y-scroll overflow-x-hidden scrollbar'>
          {filteredFriends.map((friend) => (
            <li
              key={friend.id}
              className={`w-[calc(100%+3px)] flex items-center gap-2 cursor-pointer rounded-lg p-2 ${friend.id === 1 ? 'bg-gray-700' : ''} hover:bg-gray-800`}
              onClick={() => setIsMenuOpen(false)}
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
      <section className='w-full flex flex-col'>
        <header className='flex items-center gap-2 p-4 border-b border-gray-800'>
          <ArrowLeft className='size-6 md:hidden cursor-pointer' onClick={() => setIsMenuOpen((prevState) => !prevState)} />
          <UserCircle2 className='size-12' />
          <h2 className='text-2xl font-bold'>Alice</h2>
        </header>
        <section className="flex flex-1 flex-col gap-4 p-4 overflow-y-scroll scrollbar">
          {messages.map((message, index) => {
            const isCurrentUser = message.sender === 'Alice';
            const messageAlignment = isCurrentUser ? 'justify-end' : 'justify-start';
            const messageStyles = isCurrentUser ? 'bg-blue-700 rounded-tr-none' : 'bg-gray-700 rounded-tl-none';
            const tailStyles = isCurrentUser ? 'border-t-blue-700 -right-2' : 'border-t-gray-700 -left-2';

            return (
              <div key={index} className={`flex ${messageAlignment} px-4 py-2`}>
                <div className={`relative ${messageStyles} text-white rounded-lg p-3 max-w-[60%]`}>
                  <div className={`absolute top-0 w-0 h-0 ${tailStyles} border-t-8 border-l-8 border-r-8 border-l-transparent border-r-transparent`}></div>
                  <p className="wrap-anywhere">{message.text}</p>
                  <span className="text-xs text-white/80 block text-right mt-1">11:39</span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </section>
        <form className='flex items-center gap-2 p-4 border-t border-gray-800'>
          <input
            type="text"
            placeholder='Type a message...'
            className='bg-gray-700 rounded-lg py-3 px-5 flex-1 outline-none w-full min-w-[170px]'
          />
          <button
            type="submit"
            className='bg-blue-700 rounded-lg py-3 px-5 cursor-pointer'
          >
            <Send />
          </button>
        </form>
      </section>
    </main>
  )
}
