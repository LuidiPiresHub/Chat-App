import { IUserData } from './userData';

export interface IAuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isLoading: boolean;
  user?: IUserData;
}
