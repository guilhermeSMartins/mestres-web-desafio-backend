import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUser from '@Modules/User/Services/CreateUser';
import GetUser from '@Modules/User/Services/GetUserById';
import UpdateUser from '@Modules/User/Services/UpdateUser';
import DeleteUser from '@Modules/User/Services/DeleteUser';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const createUser = container.resolve(CreateUser);

    const user = await createUser.execute(data);

    return res.status(201).json(user);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.auth;

    const getUser = container.resolve(GetUser);

    const user = await getUser.execute(id);

    return res.status(200).json(user);
  }

  public async update(req: Request, res: Response) {
    const data = req.body;
    const { id } = req.auth;

    const updatedUser = container.resolve(UpdateUser);

    const { token, user } = await updatedUser.execute({ ...data, id });

    return res.status(200).json({ user, token });
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.auth;

    const deleteUser = container.resolve(DeleteUser);

    await deleteUser.execute(id);

    res.status(201).json('Usuário removido com sucesso!');
  }
}
