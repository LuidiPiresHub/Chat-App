import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import ChatSection from '../components/ChatSection';
import ChatSidebar from '../components/ChatSidebar';
import { IUserData } from '../interfaces/userData';
import ChatFriends from '../components/ChatFriends';
import { motion } from 'framer-motion';

export default function Chat() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedFriend, setSelectedFriend] = useState<IUserData | null>(null);
  const auth = useAuth();
  const user = auth.user!;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='h-dvh flex'
    >
      <ChatSidebar
        setIsMenuOpen={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
        user={user}
        setSelectedFriend={setSelectedFriend}
        selectedFriend={selectedFriend}
        friends={user.friends}
      />
      {selectedFriend ? (
        <ChatSection
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
          selectedFriend={selectedFriend}
          user={user}
        />
      ) : (
        <ChatFriends
          friends={user.friends}
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
          setSelectedFriend={setSelectedFriend}
        />
      )}
    </motion.main>
  );
}
