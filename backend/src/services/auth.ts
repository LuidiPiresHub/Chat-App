import { prisma } from '../config/prisma';
import { IService } from '../interfaces/service';
import { ISafeUserData, ISignIn, ISignUp } from '../interfaces/auth';
import bcrypt from 'bcrypt';
import { generateToken } from '../auth/jwtFunctions';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { toSafeUser, userInclude } from '../utils/toSafeUser';

const signUp = async ({ username, email, password }: ISignUp): Promise<IService<ISafeUserData | string>> => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: { nickname: username, username, email, password: hashedPassword },
      include: userInclude,
    });

    const token = generateToken(user.id);

    const userData = toSafeUser(user);

    return { type: 'CREATED', message: userData, token };
  } catch (err) {
    const error = err as PrismaClientKnownRequestError;

    const { code, meta } = error;
    const target = (meta?.target as string) || '';

    if (code === 'P2002') {
      if (target.includes('email')) {
        return { type: 'CONFLICT', message: 'Este email já está cadastrado' };
      }

      if (target.includes('username')) {
        return { type: 'CONFLICT', message: 'Este username já está em uso' };
      }
    }

    throw err;
  }
};

const signIn = async ({ email, password }: ISignIn): Promise<IService<ISafeUserData | string>> => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: userInclude
  });

  if (!user) return { type: 'NOT_FOUND', message: 'Usuário não encontrado' };

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return { type: 'UNAUTHORIZED', message: 'Senha inválida' };

  const token = generateToken(user.id);

  const userData = toSafeUser(user);

  return { type: 'OK', message: userData, token };
};

export default {
  signUp,
  signIn,
};
