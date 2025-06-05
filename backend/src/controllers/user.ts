import { Request, Response } from 'express';
import userService from '../services/user';
import { mapStatus } from '../utils/mapStatus';
import { User } from '@prisma/client';

const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { type, message } = await userService.getUserById(id);
  res.status(mapStatus(type)).json({ message });
};

const updateDisplayName = async (req: Request, res: Response): Promise<void> => {
  const { displayName } = req.body;
  const { id } = req.user as User;
  const { type, message } = await userService.updateDisplayName(displayName, id);
  res.status(mapStatus(type)).json({ message });
};

export default {
  getUserById,
  updateDisplayName
};
