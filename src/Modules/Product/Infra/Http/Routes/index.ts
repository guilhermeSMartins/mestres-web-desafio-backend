import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import AuthMiddleware from '@Shared/Infra/Http/Middlewares/Auth';
import ProductController from '../Controllers/ProductsController';
import ProductCreationController from '../Controllers/ProductsCreationController';

const productsRouter = Router();

const productsController = new ProductController();
const productsCreationController = new ProductCreationController();
const authMiddleware = new AuthMiddleware();

productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.show,
);

productsRouter.use(authMiddleware.execute);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      sku: Joi.string().required(),
      amount: Joi.number(),
    },
  }),
  productsCreationController.create,
);

productsRouter.post(
  '/variation/:id',
  celebrate({
    [Segments.BODY]: {
      sku: Joi.string().required(),
      amount: Joi.number(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsCreationController.createVariation,
);

productsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      sku: Joi.number(),
      amount: Joi.number(),
    },
  }),
  productsController.update,
);

productsRouter.delete(
  '/:id',
  productsController.delete,
);

export default productsRouter;
