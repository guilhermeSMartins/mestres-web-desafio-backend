import { join } from 'path';
import { createConnection } from 'typeorm';

export default async function createDbConnection() {
  console.log('connecting...');
  await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: parseInt(process.env.POSTGRES_PORT as string),
    username: process.env.POSTGRES_USERNAME as string,
    password: process.env.POSTGRES_PASSWORD as string,
    database: process.env.POSTGRES_DATABASE as string,
    logging: true,
    migrations: [join(__dirname, './migrations/')],
    entities: [],
  });
}
