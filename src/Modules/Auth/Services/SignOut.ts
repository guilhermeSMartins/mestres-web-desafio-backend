import UsersRepositoryInterface from '@Modules/User/Repositories/UsersRepositoryInterface';
import AppError from '@Shared/Errors';
import { inject, injectable } from 'tsyringe';
import AuthRepositoryInterface from '../Repositories/AuthRepositoryInterface';

@injectable()
export default class SignOut {
  constructor(
    @inject('AuthRepository')
    private authRepository: AuthRepositoryInterface,

    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,
  ) {}

  public async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('Usuário não encontrado!', 404);

    const auth = await this.authRepository.findByUserId(id);

    if (!auth) throw new AppError('Token não encontrado!', 404);

    await this.authRepository.delete(auth.userId);
  }
}
