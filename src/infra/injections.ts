import UserRepository from 'modules/User/infra/database/user.repository';
import UserRepositoryInterface from 'modules/User/user.repository.interface';
import { container } from 'tsyringe';

container.registerSingleton<UserRepositoryInterface>(
  'UserRepository',
  UserRepository,
);
