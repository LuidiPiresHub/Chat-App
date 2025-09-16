import { Router } from 'express';
import friendRequest from '@controllers/friendRequest';
import { validateToken } from '@middlewares/validateToken';

const friendRequestRouter = Router();

friendRequestRouter.post('/', validateToken, friendRequest.sendFriendRequest);
friendRequestRouter.delete('/:friendRequestId/deny', validateToken, friendRequest.denyFriendRequest);
friendRequestRouter.post('/:friendRequestId/accept', validateToken, friendRequest.acceptFriendRequest);

export default friendRequestRouter;
