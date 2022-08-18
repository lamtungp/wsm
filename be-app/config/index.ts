import * as dotenv from 'dotenv';
dotenv.config();

export const Environment = {
  Test: 'test',
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
  port: process.env.DB_PORT,
  pool: process.env.ENABLE_CONNECTION_POOL === 'true' ? poolConfig : null,
  dialect: 'mysql',
  logging: process.env.NODE_ENV === Environment.Development,
  timezone: '+00:00',
};

const minio = {
  port: parseInt(process.env.MINIO_PORT) || 9000,
  host: process.env.MINIO_HOST || 'minio',
};

const aws = {
  accessKey: process.env.AWS_ACCESS_KEY_ID || 'test',
  secretKey: process.env.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_KEY || 'test',
  bucket: process.env.AWS_BUCKET || 'wsm',
  region: process.env.AWS_REGION || 'us-west-2',
  endpoint: process.env.AWS_ENDPOINT || undefined,
  s3ForcePathStyle: process.env.AWS_S3_FORCE_PATH_STYLE === 'true',
};

const mail = {
  secret: process.env.JWT_SECRET,
  user: process.env.MAIL_USERNAME,
  pass: process.env.MAIL_PASSWORD,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
};

export default {
  environment: process.env.NODE_ENV,
  /**
   * Database connection for each environment
   * @type {Object}
   */
  database,
  mail,
  minio,
  aws,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: '20d',

  salt: process.env.SALT,
};
