import { Request, Response } from 'express';
import userService from '@services/user';
import { mapStatus } from '@utils/mapStatus';
import { User } from '@prisma/client';

const updateNickname = async (req: Request, res: Response): Promise<void> => {
  const { nickname } = req.body;
  const { user } = req;
  const { type, message } = await userService.updateNickname(nickname, user as User);
  res.status(mapStatus(type)).json({ message });
};

const sendFriendRequest = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.body;
  const { id } = req.user as User;
  const { type, message } = await userService.sendFriendRequest(username, id);
  res.status(mapStatus(type)).json({ message });
};

const denyFriendRequest = async (req: Request, res: Response): Promise<void> => {
  const { friendRequestId } = req.params;
  const { type, message } = await userService.denyFriendRequest(friendRequestId);
  res.status(mapStatus(type)).json({ message });
};

const acceptFriendRequest = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.user as User;
  const { friendId } = req.body;
  const { friendRequestId } = req.params;
  const { type, message } = await userService.acceptFriendRequest(friendRequestId, id, friendId);
  res.status(mapStatus(type)).json({ message });
};

export default {
  updateNickname,
  sendFriendRequest,
  denyFriendRequest,
  acceptFriendRequest
};
