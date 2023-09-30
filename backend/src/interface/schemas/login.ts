import Joi from 'joi'

export const loginPostSchema = Joi.object({
  login: Joi.string().required(),
  senha: Joi.string().required()
}).unknown(false)
