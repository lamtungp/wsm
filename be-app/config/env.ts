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

const aws = {
  accessKey: process.env.AWS_ACCESS_KEY_ID || 'test',
  secretKey: process.env.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_KEY || 'test',
  port: parseInt(process.env.MINIO_PORT) || 9000,
  host: process.env.MINIO_HOST || 'minio',
  bucket: process.env.AWS_BUCKET || 'wsm',
  region: process.env.AWS_REGION || 'us-west-2',
  endpoint: process.env.AWS_ENDPOINT || undefined,
};

export default {
  environment: process.env.NODE_ENV,
  /**
   * Database connection for each environment
   * @type {Object}
   */
  database,
  aws,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: '20d',

  salt: process.env.SALT,
};
