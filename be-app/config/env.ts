import * as dotenv from 'dotenv';
dotenv.config();

export const Environment = {
    TEST: 'test',
    Production: 'production',
    Development: 'development',
};

const auth = {
    screat: process.env.JWT_SECRET,
    user: process.env.USER,
    pass: process.env.PASS,
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
    username: process.env.DB_DEV_USERNAME,
    password: process.env.DB_DEV_PASSWORD, // if blank then set null
    database: process.env.DB_DEV_NAME,
    host: process.env.DB_DEV_HOST,
    pool: process.env.enableConnectionPool ? poolConfig : null,
    dialect: 'mysql',
    port: process.env.DB_PORT,
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

    auth,

    salt: process.env.SALT,
};
