export interface IUserData {
  id: string;
  nickname: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserResponse {
  message: IUserData;
}

export type IUsername = Pick<IUserData, 'username'>;

export interface IPendingFriends {
  id: string;
  nickname: string;
  friendRequestId: string
  createdAt: string;
}

export interface IPendingFriendsResponse {
  message: IPendingFriends[] | null
}
