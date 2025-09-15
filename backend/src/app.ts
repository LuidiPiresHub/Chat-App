import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from '@routes/index';
import { errorHandler } from '@middlewares/errorHandler';

const app = express();
app.use(json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use('/auth', routes.authRouter);
app.use('/user', routes.userRouter);
app.use(errorHandler);

export default app;
