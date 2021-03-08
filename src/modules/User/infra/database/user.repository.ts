import { CreateUserDTO } from '../../dtos/create-user-dto';
import { getRepository, InsertResult, Repository } from 'typeorm';
import User from './user.entity';
import UserRepositoryInterface from 'modules/User/user.repository.interface';

export default class UserRepository implements UserRepositoryInterface {
  private ormRepository: Repository<User>;
  constructor() {
    this.ormRepository = getRepository(User);
  }
  public async create({ password, username }: CreateUserDTO): Promise<User> {
    const user = await this.ormRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        username,
        password,
      })
      .returning('*')
      .execute();

    //await this.ormRepository.save(user);

    return user.raw[0];
  }
}
