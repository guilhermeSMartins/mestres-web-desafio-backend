import { inject, injectable } from 'tsyringe';
import { CreateUserDTO } from '../dtos/create-user-dto';
import User from '../infra/database/user.entity';
import UserRepositoryInterface from '../user.repository.interface';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepo: UserRepositoryInterface,
  ) {}

  async execute({ password, username }: CreateUserDTO): Promise<User> {
    const user = await this.userRepo.create({
      username,
      password,
    });

    return user;
  }
}
