import { Router } from 'express';
import userController from '@controllers/user';
import { validateToken } from '@middlewares/validateToken';
import { validateSchema } from '@middlewares/validateSchema';
import { userNicknameSchema } from '@schemas/user';

const userRouter = Router();

userRouter.put('/nickname', validateToken, validateSchema(userNicknameSchema), userController.updateNickname);
userRouter.post('/friend-request', validateToken, userController.sendFriendRequest);
userRouter.delete('/friend-request/:friendRequestId/deny', validateToken, userController.denyFriendRequest);
userRouter.post('/friend-request/:friendRequestId/accept', validateToken, userController.acceptFriendRequest);

export default userRouter;
