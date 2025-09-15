import { useContext } from 'react';
import { AuthContext } from '@contexts/Auth/AuthContext';

export default function useAuth() {
  return useContext(AuthContext);
}
