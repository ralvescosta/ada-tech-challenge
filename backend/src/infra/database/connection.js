import { Sequelize } from 'sequelize'
import Configs from './configs.js'

export default new Sequelize(
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
