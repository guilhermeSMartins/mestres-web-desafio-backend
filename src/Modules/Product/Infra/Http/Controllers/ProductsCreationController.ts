import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProduct from '@Modules/Product/Services/CreateProduct';
import CreateVariationProduct from '@Modules/Product/Services/CreateVariationProduct';

export default class ProductCreationController {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const { is_admin } = req.auth;

    const createProduct = container.resolve(CreateProduct);

    const product = await createProduct.execute({ is_admin, ...data });

    return res.status(201).json(product);
  }

  public async createVariation(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const { id } = req.params;
    const { is_admin } = req.auth;

    const createVariation = container.resolve(CreateVariationProduct);

    const product = await createVariation.execute({ id, is_admin, ...data });

    return res.status(201).json(product);
  }
}
