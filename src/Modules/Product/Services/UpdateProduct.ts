import AuthRepository from '@Modules/Auth/Infra/Typeorm/Repositories/AuthRepository';
import AuthRepositoryInterface from '@Modules/Auth/Repositories/AuthRepositoryInterface';
import AppError from '@Shared/Errors';
import { inject, injectable } from 'tsyringe';
import UpdateProductDTO from '../Dtos/UpdateProductDTO';

import ProductRepositoryInterface from '../Repositories/ProductsRepository';

interface Request extends UpdateProductDTO {
  is_admin: boolean;
  id: string;
}

@injectable()
export default class UpdateProduct {
  constructor(
        @inject('ProductsRepository')
        private productsRepository: ProductRepositoryInterface,
  ) {}

  async execute({ id, is_admin, ...data }: Request) {
    if (!is_admin) throw new AppError('Não autorizado!', 403);

    const product = await this.productsRepository.findById(id);

    if (!product) throw new AppError('Produto não encontrado!', 404);

    const updatedProduct = await this.productsRepository.update(data, product);

    return updatedProduct;
  }
}
