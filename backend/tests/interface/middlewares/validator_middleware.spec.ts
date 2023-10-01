/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/await-thenable */
import { type NextFunction } from 'express'
import { type Middleware } from '../../../src/interface/middlewares'
import { type Schema, BodyValidatorMiddleware } from '../../../src/interface/middlewares/validator_middleware'
import { cardPostSchema } from '../../../src/interface/schemas/cards'

describe('BodyValidatorMiddleware', () => {
  const logger = { error: jest.fn } as any

  const card = { titulo: 'title', conteudo: 'content', lista: 'list' }

  const response: any = {
    status: jest.fn,
    json: jest.fn
  }

  const next: NextFunction = () => jest.fn

  let validatorMiddleware: Middleware<Schema>

  describe('handler', () => {
    beforeEach(() => {
      validatorMiddleware = new BodyValidatorMiddleware(logger)
    })

    afterEach(() => jest.clearAllMocks())

    it('should set status code 400 if validation failure', async () => {
      const request = { body: {} } as any
      jest.spyOn(response, 'status').mockReturnValueOnce(response)
      jest.spyOn(response, 'json').mockReturnValueOnce(response)

      await validatorMiddleware.handler(cardPostSchema)(request, response, next)

      expect(response.status).toHaveBeenCalledWith(400)
      expect(response.json).toHaveBeenCalled()
    })

    it('should not set status code 400 if validation pass', async () => {
      const request = { body: card } as any
      jest.spyOn(response, 'status').mockReturnValueOnce(response)
      jest.spyOn(response, 'json').mockReturnValueOnce(response)

      await validatorMiddleware.handler(cardPostSchema)(request, response, next)

      expect(response.status).not.toHaveBeenCalled()
      expect(response.json).not.toHaveBeenCalled()
    })
  })
})
