import { Router } from 'express';
import userController from '../controllers/user';
import { validateToken } from '../middlewares/validateToken';
import { validateSchema } from '../middlewares/validateSchema';
import { userDisplayNameSchema } from '../schemas/user';

const userRouter = Router();

userRouter.get('/:id', userController.getUserById);
userRouter.put('/display-name', validateToken, validateSchema(userDisplayNameSchema), userController.updateDisplayName);

export default userRouter;
