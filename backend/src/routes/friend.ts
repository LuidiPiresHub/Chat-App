import { Router } from 'express';
import friendController from '@controllers/friend';
import { validateToken } from '@middlewares/validateToken';

const friendRouter = Router();

friendRouter.delete('/:friendId', validateToken, friendController.deleteFriend);

export default friendRouter;

