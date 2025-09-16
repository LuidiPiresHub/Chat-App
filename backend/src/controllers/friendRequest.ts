import { Request, Response } from 'express';
import friendRequest from '@services/friendRequest';
import { mapStatus } from '@utils/mapStatus';
import { User } from '@prisma/client';

const sendFriendRequest = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.body;
  const { id } = req.user as User;
  const { type, message } = await friendRequest.sendFriendRequest(username, id);
  res.status(mapStatus(type)).json({ message });
};

const denyFriendRequest = async (req: Request, res: Response): Promise<void> => {
  const { friendRequestId } = req.params;
  const { type, message } = await friendRequest.denyFriendRequest(friendRequestId);
  res.status(mapStatus(type)).json({ message });
};

const acceptFriendRequest = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.user as User;
  const { friendId } = req.body;
  const { friendRequestId } = req.params;
  const { type, message } = await friendRequest.acceptFriendRequest(friendRequestId, id, friendId);
  res.status(mapStatus(type)).json({ message });
};

export default {
  sendFriendRequest,
  denyFriendRequest,
  acceptFriendRequest
};
