import { Router } from 'express';
import authController from '../controllers/auth'
import { validateToken } from '../middlewares/validateToken';
import { validateSchema } from '../middlewares/validateSchema';
import { userSignUpSchema, userSignInSchema } from '../schemas/user';

const authRouter = Router();

authRouter.post('/sign-up', validateSchema(userSignUpSchema), authController.signUp);
authRouter.post('/sign-in', validateSchema(userSignInSchema), authController.signIn);
authRouter.get('/me', validateToken, authController.getUserData);
authRouter.post('/logout', validateToken, authController.logout);

export default authRouter;
