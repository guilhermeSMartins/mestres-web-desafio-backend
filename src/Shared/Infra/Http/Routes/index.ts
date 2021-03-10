import { Router } from 'express';

import userRouter from '@Modules/User/Infra/Http/Routes';
import productsRouter from '@Modules/Product/Infra/Http/Routes';
import authRouter from '@Modules/Auth/Infra/Http/Routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/products', productsRouter);
routes.use('/auth', authRouter);

export default routes;
