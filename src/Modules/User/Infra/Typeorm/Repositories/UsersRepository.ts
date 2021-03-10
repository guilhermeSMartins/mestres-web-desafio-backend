/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import { EntityRepository, getRepository, Repository } from 'typeorm';

import argon2 from 'argon2';

import CreateUserDTO from '@Modules/User/Dtos/CreateUserDTO';
import UserRepositoryInterface from '@Modules/User/Repositories/UsersRepositoryInterface';
import UpdateUserDTO from '@Modules/User/Dtos/UpdateUserDTO';
import User from '../Entities/User';

@EntityRepository(User)
export default class UserRepository implements UserRepositoryInterface {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    const hashedPassword = await argon2.hash(user.password);

    user.password = hashedPassword;

    await this.ormRepository.save(user);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { id } });

    return user;
  }

  public async findByUsername(username: string): Promise<User> {
    const user = await this.ormRepository.findOne({ where: { username } });

    return user;
  }

  public async update({ is_admin, password, username }: UpdateUserDTO, user): Promise<User> {
    if (password) user.password = password;
    if (username) user.username = username;
    if (is_admin) user.is_admin = is_admin;

    await this.ormRepository.save(user);

    return user;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
