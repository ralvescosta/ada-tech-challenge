import Sequelize, { Model, type Optional } from 'sequelize'
import { type Cards } from '../../../models/cards'
import dbConnection from '../connection'

type CardCreationAttributes = Optional<Cards, 'id' | 'title'>

export class CardsModel extends Model<Cards, CardCreationAttributes> {
  public readonly id!: number
  public title!: string
  public content!: string
  public list!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

CardsModel.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.STRING
  },
  list: {
    type: Sequelize.STRING
  }
},
{
  tableName: 'cards',
  sequelize: dbConnection
}
)
