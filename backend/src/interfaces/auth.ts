import { FriendRequest, User } from '@prisma/client';

export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignUp extends ISignIn {
  username: string;
}

type SafeUser = Omit<User, 'password'>;

export interface ISafeUserData extends SafeUser {
  friends: SafeUser[];
  receivedRequests: (Omit<FriendRequest, 'sender'> & { sender: SafeUser })[];
  sentRequests: (Omit<FriendRequest, 'receiver'> & { receiver: SafeUser })[];
}
