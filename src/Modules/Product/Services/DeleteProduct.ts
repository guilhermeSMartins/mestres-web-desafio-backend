import AppError from '@Shared/Errors';
import { inject, injectable } from 'tsyringe';
import CrateVariationDTO from '../Dtos/CreateVariationDTO';

import ProductRepositoryInterface from '../Repositories/ProductsRepository';

@injectable()
export default class CreateVariationProduct {
  constructor(
        @inject('ProductsRepository')
        private productsRepository: ProductRepositoryInterface,
  ) {}

  async execute(id: string, is_admin: boolean) {
    if (!is_admin) throw new AppError('Não autorizado', 403);

    const product = await this.productsRepository.findById(id);

    if (!product) throw new AppError('Produto não encontrado!', 404);

    await this.productsRepository.delete(id);
  }
}
