import * as dotenv from 'dotenv';
dotenv.config();

const poolConfig = {
    max: 100,
    min: 0,
    idle: 20000,
    acquire: 20000,
    evict: 30000,
    handleDisconnects: true,
};

const database = {
    username: 'user',
    password: 'secret', // if blank then set null
    database: 'helloworld',
    host: 'db',
    pool: process.env.enableConnectionPool ? poolConfig : null,
    dialect: 'mysql',
    port: 3306,
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
