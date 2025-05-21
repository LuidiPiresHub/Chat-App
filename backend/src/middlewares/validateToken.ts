import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth/jwtFunctions';
import userService from '../services/user';
import { mapStatus } from '../utils/mapStatus';

export const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: 'Token não fornecido' });
    return;
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).json({ message: 'Token inválido' });
    return;
  }

  const user = await userService.getUserById(decoded.id);

  if (user.type !== 'OK' || typeof user.message === 'string') {
    res.status(mapStatus(user.type)).json({ message: user.message });
    return;
  }

  req.user = user.message;

  next();
}