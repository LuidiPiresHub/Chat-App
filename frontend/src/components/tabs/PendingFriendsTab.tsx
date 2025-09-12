import { motion } from 'framer-motion';
import { createItem } from '../../utils/motionVariants';
import { UserCircle2, X, CheckIcon } from 'lucide-react';
import { useFriendRequest } from '../../hooks/useFriendRequest';

export default function PendingFriendsTab() {
  const {
    getPendingRequests: { data: pendingFriends, isLoading },
    acceptFriendRequest,
    denyFriendRequest
  } = useFriendRequest();

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <h1 className='text-2xl font-bold'>{`Pendentes - ${pendingFriends?.length || 0}`}</h1>
      <ul className='flex flex-col overflow-y-scroll scrollbar -my-1 -mx-4 px-4'>
        {pendingFriends?.map(({ id, nickname, friendRequestId }) => (
          <motion.li
            key={id}
            variants={createItem(20)}
            className='flex items-center gap-2 border-t border-gray-700 p-4 select-none hover:bg-gray-800 cursor-pointer'
          >
            <UserCircle2 className='size-8' />
            <span className='flex-1 truncate'>{nickname}</span>
            <div className='flex'>
              <CheckIcon className='size-9 p-2 rounded-full hover:bg-gray-700' onClick={() => acceptFriendRequest.mutate({ friendId: id, friendRequestId })} />
              <X className='size-9 p-2 rounded-full hover:bg-gray-700' onClick={() => denyFriendRequest.mutate(friendRequestId)} />
            </div>
          </motion.li>
        ))}
      </ul>
    </>
  );
}
