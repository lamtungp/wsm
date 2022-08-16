import { Sequelize, Dialect } from 'sequelize';
import env from '../../config';

const { database } = env;

export default new Sequelize(database.database, database.username, database.password, {
  dialect: database.dialect as Dialect,
  host: database.host,
  port: Number(database.port),
  pool: database.pool,
  logging: database.logging,
});
