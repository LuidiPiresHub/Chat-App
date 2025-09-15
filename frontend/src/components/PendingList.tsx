import { useFriendRequest } from '@hooks/useFriendRequest';
import { IReceived, ISent } from '@interfaces/userData';
import { motion } from 'framer-motion';
import { createItem } from '@utils/motionVariants';
import { CheckIcon, UserCircle2, X } from 'lucide-react';

interface RenderListProps {
  data: IReceived[] | ISent[];
  type: 'received' | 'sent';
}

export default function PendingList({ data, type }: RenderListProps) {
  const { acceptFriendRequest, denyFriendRequest } = useFriendRequest();

  if (!data.length) return (
    <h1>{`Nenhum pedido ${type === 'received' ? 'recebido' : 'enviado'}!`}</h1>
  );

  return (
    <ul className="flex flex-col overflow-y-scroll scrollbar -my-1 -mx-4 px-4">
      {data.map((item) => {
        const friendRequestId = item.id;
        const friend = type === 'received' ? (item as IReceived).sender : (item as ISent).receiver;

        return (
          <motion.li
            key={friend.id}
            variants={createItem(20)}
            className="flex items-center gap-2 border-t border-gray-700 p-4 -mr-1 select-none hover:bg-gray-800 cursor-pointer"
          >
            <UserCircle2 className="size-8" />
            <span className="flex-1 truncate">{friend.nickname}</span>
            <div className="flex">
              {type === 'received' && (
                <CheckIcon
                  className="size-9 p-2 rounded-full hover:bg-gray-700"
                  onClick={() => acceptFriendRequest.mutate({ friendId: friend.id, friendRequestId })}
                />
              )}
              <X
                className="size-9 p-2 rounded-full hover:bg-gray-700"
                onClick={() => denyFriendRequest.mutate({ friendRequestId, type })}
              />
            </div>
          </motion.li>
        );
      })}
    </ul>
  );
}
