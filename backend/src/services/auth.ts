import { prisma } from '../config/prisma';
import { User } from '@prisma/client';
import { IService } from '../interfaces/service';
import { ISignIn, ISignUp } from '../interfaces/auth';
import bcrypt from 'bcrypt';
import { IPrismaError } from '../interfaces/prisma';
import { generateToken } from '../auth/jwtFunctions';

const signUp = async ({ username, email, password }: ISignUp): Promise<IService<Omit<User, 'password'> | string>> => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        displayName: username,
        username,
        email,
        password: hashedPassword,
      },
      omit: {
        password: true,
      }
    });

    const token = generateToken(user.id);

    return { type: 'CREATED', message: user, token };
  } catch (err) {
    const error = err as IPrismaError;

    if (error.code === 'P2002') {
      return { type: 'CONFLICT', message: 'Este email já está cadastrado' };
    }

    throw err;
  }
};

const signIn = async ({ email, password }: ISignIn): Promise<IService<Omit<User, 'password'> | string>> => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    return { type: 'NOT_FOUND', message: 'Usuário não encontrado' };
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return { type: 'UNAUTHORIZED', message: 'Senha inválida' };
  }
  const token = generateToken(user.id);

  const { password: _, ...userWithoutPassword } = user;

  return { type: 'OK', message: userWithoutPassword, token };
};

export default {
  signUp,
  signIn,
};
