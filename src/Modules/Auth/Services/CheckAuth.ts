import { verify } from 'jsonwebtoken';

import TokenPayloadDTO from '@Modules/Auth/Dtos/TokenPayloadDTO';
import authConfig from '@Config/auth';
import { inject, injectable } from 'tsyringe';
import AuthRepositoryInterface from '@Modules/Auth/Repositories/AuthRepositoryInterface';
import AppError from '@Shared/Errors';

interface Request {
    authorization: string;
}

@injectable()
export default class CheckAuth {
  constructor(
    @inject('AuthRepository')
    private authRepository: AuthRepositoryInterface,
  ) {}

  private async checkAuth(token: string): Promise<TokenPayloadDTO> {
    const data = verify(token, authConfig.jwt.secret) as TokenPayloadDTO;

    const auth = await this.authRepository.findByUserId(data.id);

    if (!auth) {
      throw new AppError('Token inexistente', 403);
    }

    if (auth.token !== token) throw new AppError('Tokens incompatíveis', 403);

    return data;
  }

  public async execute({ authorization }: Request): Promise<TokenPayloadDTO> {
    if (!authorization) {
      throw new AppError('Sem header de autorização', 401);
    }

    const token = authorization.replace('Bearer ', '');

    let data = {} as TokenPayloadDTO;

    try {
      data = await this.checkAuth(token);
    } catch (e) {
      throw new AppError('Token inválido', 403);
    }

    return data;
  }
}
