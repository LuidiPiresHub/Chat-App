import { useState } from 'react';
import { IFriend } from '../../interfaces/friend';
import SearchBar from '../SearchBar';

interface IOnlineFriendsTabProps {
  renderFriends: (friends: IFriend[]) => JSX.Element;
  friends: IFriend[];
}

export default function OnlineFriendsTab({ renderFriends, friends }: IOnlineFriendsTabProps) {
  const [search, setSearch] = useState<string>('');
  return (
    <>
      <h1 className='text-2xl font-bold'>Online - 5</h1>
      <SearchBar id='online' placeholder='Pesquise um amigo...' setSearch={setSearch} />
      {renderFriends(friends.slice(0, 5).filter((friend) => friend.name.toLowerCase().includes(search.toLowerCase())))}
    </>
  );
}
