import { Router } from 'express';
import userController from '../controllers/user';
import { validateToken } from '../middlewares/validateToken';
import { validateSchema } from '../middlewares/validateSchema';
import { userNicknameSchema } from '../schemas/user';

const userRouter = Router();

userRouter.get('/:id', userController.getUserById);
userRouter.put('/nickname', validateToken, validateSchema(userNicknameSchema), userController.updateNickname);

export default userRouter;
