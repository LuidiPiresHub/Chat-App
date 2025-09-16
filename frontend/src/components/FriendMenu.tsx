import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreVertical } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IUserData } from '@interfaces/userData';
import { AxiosError } from 'axios';
import { api } from '@config/axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

interface IFriedMenuProps {
  selectedFriend: IUserData;
  setSelectedFriend: Dispatch<SetStateAction<IUserData | null>>;
}

export default function FriendMenu({ selectedFriend, setSelectedFriend }: IFriedMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const { mutate: removeFriend } = useMutation({
    mutationKey: ['removeFriend', selectedFriend.id],
    onMutate: (selectedFriend) => {
      const previousData = queryClient.getQueryData(['auth']);
      queryClient.setQueryData<IUserData>(['auth'], (old) => {
        if (!old) return old;
        return {
          ...old,
          friends: old.friends.filter(({ id }) => id !== selectedFriend.id)
        };
      });

      setSelectedFriend(null);

      return { previousData };
    },
    mutationFn: async (selectedFriend: IUserData) => {
      const { data } = await api.delete(`/user/friend/${selectedFriend.id}`);
      return data;
    },
    onError: (error: AxiosError<{ message: string }>, selectedFriend, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['auth'], context.previousData);
      }

      setSelectedFriend(selectedFriend);

      const errorMessage = error.response?.data.message || 'Erro Interno do servidor';
      toast(errorMessage, {
        type: 'error',
        theme: 'colored'
      });
    }
  });

  const handleRemoveFriend = async (friend: IUserData) => {
    setIsOpen(false);
    const confirm1 = await Swal.fire({
      title: 'Tem certeza?',
      text: `Você vai perder a amizade e todo o histórico de mensagens com ${selectedFriend.nickname}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, remover',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#7C3AED',
      cancelButtonColor: '#EF4444',
      background: '#1E1B4B',
      color: '#E0E7FF',
      iconColor: '#F472B6',
      showCloseButton: true,
    });

    if (confirm1.isConfirmed) {
      const confirm2 = await Swal.fire({
        title: 'Última confirmação!',
        text: 'Isso é permanente. Tem certeza absoluta?',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Tenho certeza',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#7C3AED',
        cancelButtonColor: '#EF4444',
        background: '#1E1B4B',
        color: '#E0E7FF',
        iconColor: '#F472B6',
        showCloseButton: true,
      });

      if (confirm2.isConfirmed) {
        removeFriend(friend);
      }
    }
  };

  const options = [
    { title: 'Remover amigo', isEnable: true, onClick: handleRemoveFriend },
    { title: 'Silenciar notificações', isEnable: false, onClick: () => { } },
    { title: 'Bloquear usuário', isEnable: false, onClick: () => { } },
  ];

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={toggleMenu}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-700 cursor-pointer"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-800 shadow-lg ring-1 ring-black/10 overflow-hidden z-50"
          >
            {options.map(({ title, isEnable, onClick }) => (
              <button
                key={title}
                type="button"
                disabled={!isEnable}
                onClick={() => onClick(selectedFriend)}
                className={`w-full text-left p-4 text-sm hover:bg-gray-700 ${isEnable ? 'text-white cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}
              >
                {title}
              </button>
            ))}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
