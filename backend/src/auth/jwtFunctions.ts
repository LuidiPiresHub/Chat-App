import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { secretKey, tokenConfig } from '@config/token';
dotenv.config();

export const generateToken = (userId: string): string => {
  const token = jwt.sign({ id: userId }, secretKey, tokenConfig);
  return token;
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secretKey) as { id: string };
  } catch {
    return null;
  }
};
