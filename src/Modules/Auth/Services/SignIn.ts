import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import argon2 from 'argon2';

import UsersRepositoryInterface from '@Modules/User/Repositories/UsersRepositoryInterface';
import AppError from '@Shared/Errors';
import auth from '@Config/auth';
import User from '@Modules/User/Infra/Typeorm/Entities/User';
import SignInDTO from '../Dtos/SignInDTO';
import AuthRepositoryInterface from '../Repositories/AuthRepositoryInterface';

interface Response {
  user: User;
  token: string;
}

@injectable()
export default class SignIn {
  constructor(
    @inject('AuthRepository')
    private authRepository: AuthRepositoryInterface,

    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,
  ) {}

  public async execute({ password, username }: SignInDTO): Promise<Response> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) throw new AppError('Usuário não encontrado!', 404);

    const matchedPasswords = await argon2.verify(user.password, password);

    if (!matchedPasswords) throw new AppError('Usuário ou senha incorretos!', 403);

    const token = sign(
      { username, id: user.id, is_admin: user.is_admin },
      auth.jwt.secret,
      {
        expiresIn: auth.jwt.expiresIn,
        subject: user.id,
      },
    );

    await this.authRepository.upsert({ token, userId: user.id });

    return { token, user };
  }
}
