import AppError from '@Shared/Errors';
import { inject, injectable } from 'tsyringe';
import UsersRepositoryInterface from '../Repositories/UsersRepositoryInterface';

@injectable()
export default class DeleteUser {
  constructor(
      @inject('UsersRepository')
      private usersRepository: UsersRepositoryInterface,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('Usuário não encontrado!', 404);

    await this.usersRepository.delete(id);
  }
}
