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
