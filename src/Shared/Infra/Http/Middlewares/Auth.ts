import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CheckAuth from '@Modules/Auth/Services/CheckAuth';

export default class AuthMiddleware {
  public async execute(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { authorization } = req.headers;

    const checkAuth = container.resolve(CheckAuth);

    const data = await checkAuth.execute({ authorization });

    req.auth = data;

    next();
  }
}
