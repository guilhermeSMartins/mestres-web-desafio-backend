import { InsertResult } from 'typeorm';
import { CreateUserDTO } from './dtos/create-user-dto';
import User from './infra/database/user.entity';

export default interface UserRepositoryInterface {
  create(createUserDto: CreateUserDTO): Promise<User>;
}
