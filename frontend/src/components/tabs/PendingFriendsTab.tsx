import { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import PendingList from '../PendingList';

export default function PendingFriendsTab() {
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');
  const [underlineProps, setUnderlineProps] = useState({ width: 0, left: 0 });
  const receivedRef = useRef<HTMLButtonElement>(null);
  const sentRef = useRef<HTMLButtonElement>(null);

  const auth = useAuth();
  const user = auth.user!;
  const { receivedRequests, sentRequests } = user;

  useEffect(() => {
    const currentRef = activeTab === 'received' ? receivedRef.current : sentRef.current;
    if (currentRef) {
      setUnderlineProps({
        width: currentRef.offsetWidth,
        left: currentRef.offsetLeft,
      });
    }
  }, [activeTab]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.h1
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="text-2xl font-bold"
        >
          {activeTab === 'received'
            ? `Recebidos - ${receivedRequests.length}`
            : `Enviados - ${sentRequests.length}`}
        </motion.h1>
      </AnimatePresence>

      <div className='-mx-0 border-b border-gray-800 font-medium relative flex'>
        <button
          type='button'
          ref={receivedRef}
          className='ml-0 p-4 cursor-pointer'
          onClick={() => setActiveTab('received')}
        >
          Recebidos
        </button>
        <button
          type='button'
          ref={sentRef}
          className='ml-0 p-4 cursor-pointer'
          onClick={() => setActiveTab('sent')}
        >
          Enviados
        </button>

        <motion.div
          className="absolute bottom-0 h-0.5 bg-indigo-600"
          animate={{ width: underlineProps.width, x: underlineProps.left }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>

      {activeTab === 'received'
        ? <PendingList type='received' data={receivedRequests} />
        : <PendingList type='sent' data={sentRequests} />
      }
    </>
  );
}
