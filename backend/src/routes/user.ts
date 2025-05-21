import { Router } from 'express';
import userController from '../controllers/user';

const userRouter = Router();

userRouter.get('/:id', userController.getUserById);

export default userRouter;
