import * as dotenv from 'dotenv';
dotenv.config();

export const Environment = {
  TEST: 'test',
  Production: 'production',
  Development: 'development',
};

const poolConfig = {
  max: 100,
  min: 0,
  idle: 20000,
  acquire: 20000,
  evict: 30000,
  handleDisconnects: true,
};

const database = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD, // if blank then set null
  database: process.env.NODE_ENV === Environment.Development ? process.env.DB_DEV_NAME : process.env.DB_TEST_NAME,
  host: process.env.DB_HOST,
  pool: process.env.enableConnectionPool ? poolConfig : null,
  dialect: 'mysql',
  port: process.env.DB_PORT,
  logging: process.env.NODE_ENV === Environment.Development,
  timezone: '+00:00',
};

export default {
  environment: process.env.NODE_ENV,
  /**
   * Database connection for each environment
   * @type {Object}
   */
  database,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: '20d',

  salt: process.env.SALT,
};
