import Joi from 'joi'

export const cardSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  list: Joi.string().required()
}).unknown(false)
