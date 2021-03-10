import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { container } from 'tsyringe';

import AuthMiddleware from '@Shared/Infra/Http/Middlewares/Auth';
import UsersController from '../Controllers/UsersController';

const userRouter = Router();

const usersController = new UsersController();

const authMiddleware = new AuthMiddleware();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().required(),
      password: Joi.string().required(),
      is_admin: Joi.boolean(),
    },
  }),
  usersController.create,
);

userRouter.use(authMiddleware.execute);

userRouter.get(
  '/',
  usersController.show,
);

userRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      is_admin: Joi.boolean(),
      password: Joi.string(),
      username: Joi.string(),
    },
  }),
  usersController.update,
);

userRouter.delete(
  '/',
  usersController.delete,
);

export default userRouter;
