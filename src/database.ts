import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  NODE_ENV
} = process.env;

let client: Pool = new Pool();

if (NODE_ENV == 'test') {
  client = new Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: 'storefront_test',
    password: POSTGRES_PASSWORD,
    port: 5432
  });
}

if (NODE_ENV == 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  });
}

export default client;
