import { Request, Response } from 'express';
import userService from '../services/user';
import { mapStatus } from '../utils/mapStatus';

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { type, message } = await userService.getUserById(id);
  res.status(mapStatus(type)).json({ message });
};

export default {
  getUserById,
}