import { NextFunction, Request, Response } from 'express';

import AppError from '@Shared/Errors';

export default class HandleErrors {
  public execute(
    err: Error,
    request: Request,
    response: Response,
    _: NextFunction,
  ): Response {
    if (err instanceof AppError) {
      return response.status(err.status_code).json(err);
    }

    console.log(err);

    return response.status(500).json({
      status_code: 500,
      message: 'Oh no! We have a problem! Please, try again later.',
    });
  }
}
