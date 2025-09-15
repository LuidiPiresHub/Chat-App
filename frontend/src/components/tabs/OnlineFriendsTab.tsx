import { useState } from 'react';
import { IUserData } from '@interfaces/userData';
import SearchBar from '@components/SearchBar';

interface IOnlineFriendsTabProps {
  renderFriends: (friends: IUserData[]) => JSX.Element;
  friends: IUserData[];
}

export default function OnlineFriendsTab({ renderFriends, friends }: IOnlineFriendsTabProps) {
  const [search, setSearch] = useState<string>('');
  return (
    <>
      <h1 className='text-2xl font-bold'>Online - 5</h1>
      <SearchBar id='online' placeholder='Pesquise um amigo...' setSearch={setSearch} />
      {renderFriends(friends.slice(0, 5).filter((friend) => friend.nickname.toLowerCase().includes(search.toLowerCase())))}
    </>
  );
}
