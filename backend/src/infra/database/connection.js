/* eslint-disable */
const { Sequelize } = require('sequelize')
const Configs = require('./configs.js')

module.exports = new Sequelize(
  {
    ...Configs(),
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      freezeTableName: true,
      paranoid: true
    }
  }
)
