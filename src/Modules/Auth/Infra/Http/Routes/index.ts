import AuthMiddleware from '@Shared/Infra/Http/Middlewares/Auth';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import AuthController from '../Controllers/AuthController';

const authRouter = Router();

const authController = new AuthController();

authRouter.post(
  '/signin',
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  authController.signIn,
);

const authMiddleware = new AuthMiddleware();

authRouter.use(authMiddleware.execute);

authRouter.post(
  '/signout',
  authController.signOut,
);

export default authRouter;
