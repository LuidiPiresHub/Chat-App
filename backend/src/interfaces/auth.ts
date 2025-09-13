import { User } from '@prisma/client';

export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignUp extends ISignIn {
  username: string;
}

export interface IGetuserDataResponse {
  isAuthenticated: boolean;
  user: Omit<User, 'password'> | null
}
