import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import ChatSection from '../components/ChatSection';
import ChatSidebar from '../components/ChatSidebar';
import { IFriend } from '../interfaces/friend';
import ChatFriends from '../components/ChatFriends';

export default function Chat() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedFriend, setSelectedFriend] = useState<IFriend | null>(null);
  const { user } = useAuth();
  if (!user) return;

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

  return (
    <main className='h-dvh flex'>
      <ChatSidebar
        setIsMenuOpen={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
        user={user}
        setSelectedFriend={setSelectedFriend}
        selectedFriend={selectedFriend}
        friends={friends}
      />
      {selectedFriend ? (
        <ChatSection
          setIsMenuOpen={setIsMenuOpen}
          selectedFriend={selectedFriend}
          user={user}
        />
      ) : (
        <ChatFriends
          friends={friends}
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
          setSelectedFriend={setSelectedFriend}
        />
      )}
    </main>
  )
}
