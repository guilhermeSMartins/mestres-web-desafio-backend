import UsersRepositoryInterface from '@Modules/User/Repositories/UsersRepositoryInterface';
import AppError from '@Shared/Errors';
import { inject, injectable } from 'tsyringe';
import CreateProductDTO from '../Dtos/CreateProductDTO';

import ProductRepositoryInterface from '../Repositories/ProductsRepository';

interface Request extends CreateProductDTO {
  is_admin: boolean;
}

@injectable()
export default class CreateProduct {
  constructor(
        @inject('ProductsRepository')
        private productsRepository: ProductRepositoryInterface,

        @inject('UsersRepository')
        private usersRepository: UsersRepositoryInterface,
  ) {}

  async execute({ is_admin, ...data }: Request) {
    if (!is_admin) throw new AppError('Não autorizado!', 403);

    const product = await this.productsRepository.create(data);

    return product;
  }
}
