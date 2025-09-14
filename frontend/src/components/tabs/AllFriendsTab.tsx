import { useState } from 'react';
import { IUserData } from '../../interfaces/userData';
import SearchBar from '../SearchBar';

interface IAllFriendsTabProps {
  renderFriends: (friends: IUserData[]) => JSX.Element;
  friends: IUserData[];
}

export default function AllFriendsTab({ renderFriends, friends }: IAllFriendsTabProps) {
  const [search, setSearch] = useState<string>('');
  return (
    <>
      <h1 className='text-2xl font-bold'>{`Todos os amigos - ${friends.length}`}</h1>
      <SearchBar id='all' placeholder='Pesquise um amigo...' setSearch={setSearch} />
      {renderFriends(friends.filter((friend) => friend.nickname.toLowerCase().includes(search.toLowerCase())))}
    </>
  );
}
