import Joi from 'joi'

export const cardPostSchema = Joi.object({
  titulo: Joi.string().required(),
  conteudo: Joi.string().required(),
  lista: Joi.string().required()
}).unknown(false)

export const cardPutSchema = Joi.object({
  id: Joi.number().required(),
  titulo: Joi.string().required(),
  conteudo: Joi.string().required(),
  lista: Joi.string().required()
}).unknown(false)
