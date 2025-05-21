import { useEffect, useRef } from 'react';
import { UserCircle2, Plus, Send } from 'lucide-react';

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


  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <main className='h-dvh flex'>
      <aside className='w-full max-w-60 flex flex-col gap-4 border-r border-gray-800 p-4 select-none'>
        <h1 className='text-4xl font-bold'>Chat</h1>
        <button className='bg-gray-700 rounded-lg py-3 px-3 gap-3 flex items-center w-[calc(100%-8px)]'>
          <Plus className='size-5' />
          Add Friend
        </button>
        <section className='flex flex-1 flex-col -m-4 p-4 gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 hover:scrollbar-thumb-gray-400 scrollbar-track-transparent'>
          {friends.map((friend) => (
            <div key={friend.id} className={`flex items-center gap-2 cursor-pointer rounded-lg p-2 ${friend.id === 1 ? 'bg-gray-700' : ''} hover:bg-gray-700`}>
              <UserCircle2 className='size-8' />
              <span>{friend.name}</span>
            </div>
          ))}
        </section>
        <section className='flex items-center gap-2 bg-gray-700 rounded-lg p-2'>
          <UserCircle2 className='size-8' />
          <span>Phantom</span>
        </section>
      </aside>
      <section className='w-full flex flex-col'>
        <header className='flex items-center gap-2 p-4 border-b border-gray-800'>
          <UserCircle2 className='size-12' />
          <h2 className='text-2xl font-bold'>Alice</h2>
        </header>
        <section className='flex flex-1 flex-col gap-4 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 hover:scrollbar-thumb-gray-400 scrollbar-track-transparent'>
          {messages.map((message) => (
            <div key={message.id} className={`flex items-center gap-2 ${message.sender === 'Alice' ? 'justify-end' : 'justify-start'}`}>
              <p className={`rounded-lg p-3 max-w-[45%] ${message.sender === 'Alice' ? 'bg-blue-700' : 'bg-gray-700'}`}>
                {message.text}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </section>
        <form className='flex items-center gap-2 p-4 border-t border-gray-800'>
          <input
            type="text"
            placeholder='Type a message...'
            className='bg-gray-700 rounded-lg py-3 px-5 flex-1 outline-none'
          />
          <button
            type="submit"
            className='bg-blue-700 rounded-lg py-3 px-5 flex items-center justify-center cursor-pointer'
          >
            <Send />
          </button>
        </form>
      </section>
    </main>
  )
}
