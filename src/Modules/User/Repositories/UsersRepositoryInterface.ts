/* eslint-disable no-unused-vars */
import CreateUserDTO from '../Dtos/CreateUserDTO';
import UpdateUserDTO from '../Dtos/UpdateUserDTO';
import User from '../Infra/Typeorm/Entities/User';

export default interface UsersRepositoryInterface {
  create(createUserDto: CreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  update(user: User, data: UpdateUserDTO): Promise<User | undefined>;
  delete(id: string): Promise<void>;
}
