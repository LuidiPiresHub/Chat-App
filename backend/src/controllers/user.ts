import { Request, Response } from 'express';
import userService from '../services/user';
import { mapStatus } from '../utils/mapStatus';
import { User } from '@prisma/client';

const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { type, message } = await userService.getUserById(id);
  res.status(mapStatus(type)).json({ message });
};

const updateNickname = async (req: Request, res: Response): Promise<void> => {
  const { nickname } = req.body;
  const { user } = req;
  const { type, message } = await userService.updateNickname(nickname, user as User);
  res.status(mapStatus(type)).json({ message });
};

export default {
  getUserById,
  updateNickname
};
