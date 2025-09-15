import { createContext } from 'react';
import { IAuthContext } from '@interfaces/authContext';

export const AuthContext = createContext({} as IAuthContext);
