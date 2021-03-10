import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetProduct from '@Modules/Product/Services/GetProductById';
import UpdateProduct from '@Modules/Product/Services/UpdateProduct';
import DeleteProduct from '@Modules/Product/Services/DeleteProduct';

export default class ProductController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getProduct = container.resolve(GetProduct);

    const product = await getProduct.execute(id);

    return res.status(200).json(product);
  }

  public async update(req: Request, res: Response) {
    const data = req.body;
    const { is_admin } = req.auth;
    const { id } = req.params;

    const updateProduct = container.resolve(UpdateProduct);

    const product = await updateProduct.execute({ ...data, id, is_admin });

    return res.status(200).json(product);
  }

  public async delete(req: Request, res: Response) {
    const { is_admin } = req.auth;
    const { id } = req.params;

    const deleteUser = container.resolve(DeleteProduct);

    await deleteUser.execute(id, is_admin);

    res.status(201).json('Produto removido com sucesso!');
  }
}
