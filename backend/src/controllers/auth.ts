import { Request, Response } from 'express';
import authService from '../services/auth';
import { mapStatus } from '../utils/mapStatus';
import { cookieOptions } from '../config/token';

const signUp = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;
  const { type, message, token } = await authService.signUp({ username, email, password });
  if (token) {
    res.cookie('token', token, cookieOptions);
  }
  res.status(mapStatus(type)).json({ message });
};

const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const { type, message, token } = await authService.signIn({ email, password });
  if (token) {
    res.cookie('token', token, cookieOptions);
  }
  res.status(mapStatus(type)).json({ message });
};

const getUserData = async (req: Request, res: Response): Promise<void> => {
  const { user } = req;
  res.status(mapStatus('OK')).json({ message: user });
};

const logout = async (_req: Request, res: Response): Promise<void> => {
  const { maxAge: _, ...clearCookieOptions } = cookieOptions;
  res.clearCookie('token', clearCookieOptions);
  res.status(mapStatus('OK')).json({ message: 'Logout com sucesso' });
};

export default {
  signUp,
  signIn,
  getUserData,
  logout
};
