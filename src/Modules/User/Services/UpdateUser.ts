import auth from '@Config/auth';
import AuthRepositoryInterface from '@Modules/Auth/Repositories/AuthRepositoryInterface';
import AppError from '@Shared/Errors';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import UpdateUserDTO from '../Dtos/UpdateUserDTO';
import UpdateUserResponseDTO from '../Dtos/UpdateUserResponseDTO';

import UsersRepositoryInterface from '../Repositories/UsersRepositoryInterface';

@injectable()
export default class UpdateUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,

    @inject('AuthRepository')
    private authRepository: AuthRepositoryInterface,
  ) {}

  async execute({ id, ...data }: UpdateUserDTO): Promise<UpdateUserResponseDTO> {
    const findUser = await this.usersRepository.findById(id);

    if (!findUser) throw new AppError('Não encontrado!', 404);

    const updatedUser = await this.usersRepository.update(findUser, { id, ...data });

    if (!updatedUser) throw new AppError('Usuário não encontrado', 404);

    await this.authRepository.delete(updatedUser.id);

    const token = sign(
      { username: updatedUser.username, id: updatedUser.id, is_admin: updatedUser.is_admin },
      auth.jwt.secret,
      {
        expiresIn: auth.jwt.expiresIn,
        subject: updatedUser.id,
      },
    );

    await this.authRepository.upsert({ token, userId: updatedUser.id });

    return { user: updatedUser, token };
  }
}
