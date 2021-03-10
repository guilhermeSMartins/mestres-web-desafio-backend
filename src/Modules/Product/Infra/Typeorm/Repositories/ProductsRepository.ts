/* eslint-disable no-param-reassign */
import CreateProductDTO from '@Modules/Product/Dtos/CreateProductDTO';
import UpdateProductDTO from '@Modules/Product/Dtos/UpdateProductDTO';
import ProductRepositoryInterface from '@Modules/Product/Repositories/ProductsRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import Product from '../Entities/Product';

@EntityRepository()
export default class ProductRepository implements ProductRepositoryInterface {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create(data: CreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(data);

    await this.ormRepository.save(product);

    return product;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({ where: { id } });

    return product;
  }

  public async update({ amount, name, sku }: UpdateProductDTO, product: Product): Promise<Product> {
    if (amount) product.amount = amount;
    if (name) product.name = name;
    if (sku) product.sku = sku;

    await this.ormRepository.save(product);

    return product;
  }

  public async delete(id: string) {
    await this.ormRepository.delete(id);
  }
}
