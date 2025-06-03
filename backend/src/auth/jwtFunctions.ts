import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.JWT_SECRET!;
const tokenConfig: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

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
