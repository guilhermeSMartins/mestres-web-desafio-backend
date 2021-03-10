import { container } from 'tsyringe';

import UsersRepository from '@Modules/User/Infra/Typeorm/Repositories/UsersRepository';
import UsersRepositoryInterface from '@Modules/User/Repositories/UsersRepositoryInterface';
import ProductRepositoryInterface from '@Modules/Product/Repositories/ProductsRepository';
import ProductsRepository from '@Modules/Product/Infra/Typeorm/Repositories/ProductsRepository';
import AuthRepositoryInterface from '@Modules/Auth/Repositories/AuthRepositoryInterface';
import AuthRepository from '@Modules/Auth/Infra/Typeorm/Repositories/AuthRepository';

container.registerSingleton<UsersRepositoryInterface>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ProductRepositoryInterface>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<AuthRepositoryInterface>(
  'AuthRepository',
  AuthRepository,
);
