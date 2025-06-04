import { ArrowLeft, Send, UserCircle2 } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { IUserData } from '../interfaces/userData';
import { IFriend } from '../interfaces/friend';
import { useForm } from 'react-hook-form';

interface IChatSectionProps {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  selectedFriend: IFriend;
  user: IUserData;
}

interface IFormData {
  message: string;
}

const getHours = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export default function ChatSection({ setIsMenuOpen, selectedFriend, user }: IChatSectionProps) {
  const messageInitialState = useMemo(() => {
    const now = getHours();
    return [
      { id: 1, senderId: selectedFriend.id, sender: `${selectedFriend.name}`, text: `Hello! I am ${selectedFriend.name} How are you?`, time: now },
      { id: 2, senderId: user.id, sender: `${user.username}`, text: `Hello, I'm ${user.username}, I'm fine, thank you.`, time: now },
      { id: 3, senderId: selectedFriend.id, sender: `${selectedFriend.name}`, text: 'What about you?', time: now },
      { id: 4, senderId: user.id, sender: `${user.username}`, text: 'I am doing well!', time: now },
      { id: 5, senderId: selectedFriend.id, sender: `${selectedFriend.name}`, text: 'Great to hear!', time: now },
      { id: 6, senderId: user.id, sender: `${user.username}`, text: 'What are you up to?', time: now },
      { id: 7, senderId: selectedFriend.id, sender: `${selectedFriend.name}`, text: 'Just working on some projects.', time: now },
      { id: 8, senderId: user.id, sender: `${user.username}`, text: 'Sounds interesting!', time: now },
      { id: 9, senderId: selectedFriend.id, sender: `${selectedFriend.name}`, text: 'Yeah, I am learning a lot.', time: now },
      { id: 10, senderId: user.id, sender: `${user.username}`, text: 'That is awesome!', time: now },
      { id: 11, senderId: selectedFriend.id, sender: `${selectedFriend.name}`, text: `Now I have to go, goodbye ${user.username}`, time: now },
      { id: 12, senderId: user.id, sender: `${user.username}`, text: `see you later ${selectedFriend.name}`, time: now },
    ];
  }, [user, selectedFriend]);

  const [messages, setMessages] = useState(messageInitialState);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { register, handleSubmit, reset, setFocus } = useForm<IFormData>();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setMessages(messageInitialState);
    setFocus('message');
  }, [selectedFriend, messageInitialState, setFocus]);


  const sendMessage = (formData: IFormData) => {
    const message = formData.message.trim();
    if (!message) return;
    setMessages((prevState) => ([
      ...prevState,
      {
        id: prevState.length + 1,
        senderId: user.id,
        sender: `${user.username}`,
        text: message,
        time: getHours(),
      }
    ]));
    reset();
  };

  return (
    <section className='w-full flex flex-col'>
      <header className='flex items-center gap-2 p-4 border-b border-gray-800'>
        <ArrowLeft className='size-6 md:hidden cursor-pointer' onClick={() => setIsMenuOpen((prevState) => !prevState)} />
        <UserCircle2 className='size-12' />
        <h2 className='text-2xl font-bold'>{selectedFriend.name}</h2>
      </header>
      <section className="flex flex-1 flex-col gap-4 p-4 overflow-y-scroll scrollbar">
        {messages.map((message) => {
          const isCurrentUser = message.senderId === user.id;
          const messageAlignment = isCurrentUser ? 'justify-end' : 'justify-start';
          const messageStyles = isCurrentUser ? 'bg-blue-700 rounded-tr-none' : 'bg-gray-700 rounded-tl-none';
          const tailStyles = isCurrentUser ? 'border-t-blue-700 -right-2' : 'border-t-gray-700 -left-2';

          return (
            <article key={message.id} className={`flex ${messageAlignment} px-4 py-2`}>
              <div className={`relative ${messageStyles} text-white rounded-lg p-3 max-w-[60%]`}>
                <div className={`absolute top-0 w-0 h-0 ${tailStyles} border-t-8 border-l-8 border-r-8 border-l-transparent border-r-transparent`}></div>
                <p className="wrap-anywhere">{message.text}</p>
                <span className="text-xs text-white/80 block text-right mt-1">{message.time}</span>
              </div>
            </article>
          );
        })}
        <div ref={messagesEndRef} />
      </section>
      <form onSubmit={handleSubmit(sendMessage)} className='flex items-center gap-2 p-4 border-t border-gray-800'>
        <input
          type="text"
          {...register('message')}
          placeholder='Type a message...'
          autoComplete='off'
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
  );
}
