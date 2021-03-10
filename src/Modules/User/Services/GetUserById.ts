import AppError from '@Shared/Errors';
import { inject, injectable } from 'tsyringe';

import User from '../Infra/Typeorm/Entities/User';
import UsersRepositoryInterface from '../Repositories/UsersRepositoryInterface';

@injectable()
export default class GetUserById {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('Usuário não encontrado!', 404);

    return user;
  }
}
