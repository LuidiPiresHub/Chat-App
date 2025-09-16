import { Request, Response } from 'express';
import friendService from '@services/friend';
import { mapStatus } from '@utils/mapStatus';

const deleteFriend = async (req: Request, res: Response): Promise<void> => {
  const { friendId } = req.params;
  const { id } = req.user!;
  const { type, message } = await friendService.deleteFriend(id, friendId);
  res.status(mapStatus(type)).json({ message });
};

export default {
  deleteFriend
};
