import { Router } from 'express';
import { validateToken } from '@middlewares/validateToken';
import { validateSchema } from '@middlewares/validateSchema';
import { userNicknameSchema } from '@schemas/user';
import userController from '@controllers/user';

const userRouter = Router();

userRouter.put('/nickname', validateToken, validateSchema(userNicknameSchema), userController.updateNickname);

export default userRouter;
