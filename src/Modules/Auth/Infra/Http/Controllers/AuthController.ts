import SignIn from '@Modules/Auth/Services/SignIn';
import SignOut from '@Modules/Auth/Services/SignOut';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AuthController {
  public async signIn(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const signIn = container.resolve(SignIn);

    const user = await signIn.execute(data);

    return res.status(201).json(user);
  }

  public async signOut(req: Request, res: Response): Promise<Response> {
    const { id } = req.auth;

    const signOut = container.resolve(SignOut);

    await signOut.execute(id);

    return res.status(201).json('Token removido com sucesso!');
  }
}
