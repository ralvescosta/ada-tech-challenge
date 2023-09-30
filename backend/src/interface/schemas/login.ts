import Joi from 'joi'

export const loginPostSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required()
}).unknown(false)
