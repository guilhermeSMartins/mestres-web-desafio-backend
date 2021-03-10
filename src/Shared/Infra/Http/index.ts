import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import { errors as celebrateErrors } from 'celebrate';

import routes from './Routes';
import TypeOrm from '../Typeorm';
import '../Containers';
import HandleErrors from './Middlewares/HandleErrors';

const typeorm = new TypeOrm();
const handleErrors = new HandleErrors();
const app = express();

typeorm.execute();

console.log(process.env.TEST);

app.use(express.json());
app.use(routes);
app.use(celebrateErrors());
app.use(handleErrors.execute);

app.listen(4002, () => {
  console.log('server started on localhost:4002');
});
