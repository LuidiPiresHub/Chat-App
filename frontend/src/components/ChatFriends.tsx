import { Dispatch, SetStateAction, useState } from 'react';
import { UserCircle2, UserPlus2 } from 'lucide-react';
import { IFriend } from '../interfaces/friend';
import { motion } from 'framer-motion';
import { createContainer, createItem } from '../utils/motionVariants';
import OnlineFriendsTab from './tabs/OnlineFriendsTab';
import AllFriendsTab from './tabs/AllFriendsTab';
import PendingFriendsTab from './tabs/PendingFriendsTab';
import AddFriendTab from './tabs/AddFriendTab';

interface IChatFriendsProps {
  friends: IFriend[];
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  isMenuOpen: boolean;
  setSelectedFriend: Dispatch<SetStateAction<IFriend | null>>;
}

type Tab = 'online' | 'all' | 'add' | 'pending';

export default function ChatFriends({ friends, setIsMenuOpen, isMenuOpen, setSelectedFriend }: IChatFriendsProps) {
  const [selectedTab, setSelectedTab] = useState<Tab>('online');

  const headerData = [
    { key: 'online', label: 'Disponível', special: false },
    { key: 'all', label: 'Todos', special: false },
    { key: 'pending', label: 'Pendentes', special: false },
    { key: 'add', label: 'Adicionar Amigo', special: true }
  ];

  const renderFriends = (friends: IFriend[]) => {
    return (
      <ul className='flex flex-col overflow-y-scroll scrollbar -my-1 -mx-4 px-4'>
        {friends.map((friend) => (
          <motion.li
            key={friend.id}
            variants={createItem(20)}
            onClick={() => setSelectedFriend(friend)}
            className='flex items-center gap-2 border-t border-gray-700 p-4 select-none hover:bg-gray-800 cursor-pointer'
          >
            <UserCircle2 className='size-8' />
            <span className='flex-1 truncate'>{friend.name}</span>
          </motion.li>
        ))}
      </ul>
    );
  };

  const handleMenuOpen = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    }
  };

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
            type='button'
            onClick={() => setSelectedTab(key as Tab)}
            className={`rounded-lg py-1 px-3 cursor-pointer transition-colors min-w-max ${special ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'text-gray-300 hover:bg-gray-700'} ${selectedTab === key ? 'bg-gray-700' : ''}`.trim()}
          >
            {label}
          </button>
        ))}
      </header>
      <motion.section
        key={selectedTab}
        variants={createContainer(0.05)}
        initial="hidden"
        animate="show"
        className='p-4 flex flex-col gap-5 flex-1 overflow-y-hidden'
      >
        {selectedTab === 'online' && <OnlineFriendsTab renderFriends={renderFriends} friends={friends} />}
        {selectedTab === 'all' && <AllFriendsTab renderFriends={renderFriends} friends={friends} />}
        {selectedTab === 'pending' && <PendingFriendsTab />}
        {selectedTab === 'add' && <AddFriendTab />}
      </motion.section>
    </section>
  );
}
