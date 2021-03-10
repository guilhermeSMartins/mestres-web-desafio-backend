import {
  EntityRepository, Repository, getRepository,
} from 'typeorm';

import AuthRepositoryInterface from '@Modules/Auth/Repositories/AuthRepositoryInterface';
import UpsertAuthDTO from '@Modules/Auth/Dtos/UpsertAuthDTO';
import Auth from '../Entities/Auth';

@EntityRepository(Auth)
export default class AuthRepository implements AuthRepositoryInterface {
  private ormRepository: Repository<Auth>;

  constructor() {
    this.ormRepository = getRepository(Auth);
  }

  async upsert({ token, userId }: UpsertAuthDTO): Promise<Auth> {
    let auth = await this.ormRepository.findOne({ where: { userId } });

    if (!auth) {
      auth = this.ormRepository.create({ token, userId });
    } else {
      auth.token = token;
    }

    await this.ormRepository.save(auth);

    return auth;
  }

  async delete(userId: string): Promise<void> {
    const token = await this.ormRepository.findOne({ where: { userId } });
    await this.ormRepository.delete(token);
  }

  async findByUserId(userId: string): Promise<Auth | undefined> {
    const auth = await this.ormRepository.findOne({ where: { userId } });

    return auth;
  }
}
