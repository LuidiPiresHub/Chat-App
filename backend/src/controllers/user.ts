import { Request, Response } from 'express';
import userService from '@services/user';
import { User } from '@prisma/client';
import { mapStatus } from '@utils/mapStatus';

const updateNickname = async (req: Request, res: Response): Promise<void> => {
  const { nickname } = req.body;
  const { user } = req;
  const { type, message } = await userService.updateNickname(nickname, user as User);
  res.status(mapStatus(type)).json({ message });
};

export default {
  updateNickname
};
