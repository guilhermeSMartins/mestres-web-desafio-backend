import 'reflect-metadata';
require('dotenv').config();
import express from 'express';
import createDbConnection from './infra/database/dbConnection';

(async () => {
  await createDbConnection();

  const app = express();

  app.use(express.json());

  app.listen(4002, () => {
    console.log('server started on localhost:4002');
  });
})();
