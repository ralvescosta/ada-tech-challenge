/* eslint-disable */
const Environments = require('../env.js')

module.exports = () => {
  Environments()

  const DB_HOST = ((process?.env?.DB_HOST) != null) ? process.env.DB_HOST : '127.0.0.1'
  const DB_PORT = ((process?.env?.DB_PORT) != null) ? process?.env?.DB_PORT : '5432'
  const DB_USERNAME = ((process?.env?.DB_USERNAME) != null) ? process?.env?.DB_USERNAME : 'postgres'
  const DB_PASSWORD = ((process?.env?.DB_PASSWORD) != null) ? process?.env?.DB_PASSWORD : '12345'
  const DB_DIALECT = ((process?.env?.DB_DIALECT) != null) ? process?.env?.DB_DIALECT : 'postgres'
  const DB_DATABASE = ((process?.env?.DB_DATABASE) != null) ? process?.env?.DB_DATABASE : 'default'
  const DB_SEQUELIZE_LOG = ((process?.env?.DB_SEQUELIZE_LOG) != null) && process?.env?.DB_SEQUELIZE_LOG === 'true'

  return {
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dialect: DB_DIALECT,
    database: DB_DATABASE,
    logging: DB_SEQUELIZE_LOG ? console.log : false
  }
}
