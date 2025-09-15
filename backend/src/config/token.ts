import { CookieOptions } from 'express';
import { SignOptions } from 'jsonwebtoken';

const DAYS = 7;
const MS_IN_DAY = 24 * 60 * 60 * 1000;

const isProd = process.env.NODE_ENV === 'production';

export const secretKey = process.env.JWT_SECRET!;

export const tokenConfig: SignOptions = {
  algorithm: 'HS256',
  expiresIn: `${DAYS}d`,
};

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? 'none' : 'lax',
  maxAge: DAYS * MS_IN_DAY,
};
