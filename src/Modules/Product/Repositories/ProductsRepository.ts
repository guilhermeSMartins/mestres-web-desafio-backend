/* eslint-disable no-unused-vars */
import Product from '@Modules/Product/Infra/Typeorm/Entities/Product';
import CreateProductDTO from '../Dtos/CreateProductDTO';
import UpdateProductDTO from '../Dtos/UpdateProductDTO';

export default interface ProductRepositoryInterface {
  create(createProductDTO: CreateProductDTO): Promise<Product>;
  findById(id: string): Promise<Product | undefined>;
  update(updateProductDTO: UpdateProductDTO, product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
};
