interface IRequest {
  id: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ISent extends IRequest {
  receiver: IUserData;
}

interface IReceived extends IRequest {
  sender: IUserData;
}

export interface IUserData {
  id: string;
  nickname: string;
  username: string;
  email: string;
  friends: IUserData[]
  sentRequests: ISent[];
  receivedRequests: IReceived[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserResponse {
  message: IUserData;
}

export type IUsername = Pick<IUserData, 'username'>;

export interface IPendingFriends {
  id: string;
  nickname: string;
  friendRequestId: string
  createdAt: Date;
}
