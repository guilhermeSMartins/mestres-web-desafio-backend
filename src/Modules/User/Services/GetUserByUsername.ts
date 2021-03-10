import { inject, injectable } from 'tsyringe';

import User from '../Infra/Typeorm/Entities/User';
import UsersRepositoryInterface from '../Repositories/UsersRepositoryInterface';

@injectable()
export default class GetUserByUsername {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,
  ) {}

  async execute(username: string): Promise<User> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) throw new Error('invalid credentials!');

    return user;
  }
}
