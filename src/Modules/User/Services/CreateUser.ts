import AppError from '@Shared/Errors';
import { inject, injectable } from 'tsyringe';

import CreateUserDTO from '../Dtos/CreateUserDTO';
import User from '../Infra/Typeorm/Entities/User';
import UserRepositoryInterface from '../Repositories/UsersRepositoryInterface';

@injectable()
export default class CreateUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UserRepositoryInterface,
  ) {}

  async execute({
    password,
    username,
    is_admin,
  }: CreateUserDTO): Promise<User> {
    const findUser = await this.usersRepository.findByUsername(username);

    if (findUser) throw new AppError('Username já existente', 400);

    const user = await this.usersRepository.create({
      username,
      password,
      is_admin,
    });

    return user;
  }
}
