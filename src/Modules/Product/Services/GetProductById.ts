import AppError from '@Shared/Errors';
import { inject, injectable } from 'tsyringe';

import ProductRepositoryInterface from '../Repositories/ProductsRepository';

@injectable()
export default class GetProduct {
  constructor(
        @inject('ProductsRepository')
        private productsRepository: ProductRepositoryInterface,
  ) {}

  async execute(id: string) {
    const product = await this.productsRepository.findById(id);

    if (!product) throw new AppError('Produto não encontrado!', 404);

    return product;
  }
}
