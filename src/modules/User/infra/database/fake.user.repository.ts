import { CreateUserDTO } from '../../dtos/create-user-dto';
import User from './user.entity';
import UserRepositoryInterface from 'modules/User/user.repository.interface';
import { v4 as uuid } from 'uuid';

export default class FakeUserRepository implements UserRepositoryInterface {
  private users: User[] = [];

  public async create(createUserDTO: CreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), createUserDTO });

    this.users.push(user);

    return user;
  }
}
