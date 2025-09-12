import { useState } from 'react';
import { IFriend } from '../../interfaces/friend';
import SearchBar from '../SearchBar';

interface IAllFriendsTabProps {
  renderFriends: (friends: IFriend[]) => JSX.Element;
  friends: IFriend[];
}

export default function AllFriendsTab({ renderFriends, friends }: IAllFriendsTabProps) {
  const [search, setSearch] = useState<string>('');
  return (
    <>
      <h1 className='text-2xl font-bold'>{`Todos os amigos - ${friends.length}`}</h1>
      <SearchBar id='all' placeholder='Pesquise um amigo...' setSearch={setSearch} />
      {renderFriends(friends.filter((friend) => friend.name.toLowerCase().includes(search.toLowerCase())))}
    </>
  );
}
