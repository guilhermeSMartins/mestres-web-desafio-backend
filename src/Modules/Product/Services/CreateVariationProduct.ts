import AppError from '@Shared/Errors';
import { inject, injectable } from 'tsyringe';
import CreateVariationDTO from '../Dtos/CreateVariationDTO';

import ProductRepositoryInterface from '../Repositories/ProductsRepository';

interface Request extends CreateVariationDTO {
  is_admin: boolean;
}

@injectable()
export default class CreateVariationProduct {
  constructor(
        @inject('ProductsRepository')
        private productsRepository: ProductRepositoryInterface,
  ) {}

  async execute({
    amount, sku, id, is_admin,
  }: Request) {
    if (!is_admin) throw new AppError('Não autorizado', 403);

    const product = await this.productsRepository.findById(id);

    if (amount) product.amount = amount;
    if (sku) product.sku = sku;

    const newProduct = await this.productsRepository.create({ amount, sku, name: product.name });

    return newProduct;
  }
}
