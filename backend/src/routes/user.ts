import { Router } from 'express';
import userController from '../controllers/user';
import { validateToken } from '../middlewares/validateToken';

const userRouter = Router();

userRouter.get('/:id', userController.getUserById);
userRouter.put('/displayName', validateToken, userController.updateDisplayName);

export default userRouter;
