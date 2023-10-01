import { type NextFunction } from 'express'
import { type Middleware } from '../../../src/interface/middlewares'
import { LoggerMiddleware } from '../../../src/interface/middlewares/logger_middleware'
import { type Card } from '../../../src/services/models/cards'

describe('LoggerMiddleware', () => {
  const logger = { info: jest.fn } as any

  const card: Card = { id: 1, title: 'title', content: 'content', list: 'list' }

  const next: NextFunction = () => jest.fn

  let loggerMiddleware: Middleware<string>

  describe('handler', () => {
    beforeEach(() => {
      loggerMiddleware = new LoggerMiddleware(logger)
    })

    afterEach(() => jest.clearAllMocks())

    it('should logging the update action', () => {
      const request = { body: card }
      jest.spyOn(logger, 'info')

      loggerMiddleware.handler('update')(request as any, {} as any, next)

      expect(logger.info).toHaveBeenCalled()
      expect(logger.info).toHaveBeenCalledWith(`Card ${card.id} - ${card.title} - update`)
    })

    it('should logging the delete action', () => {
      const request = { body: card }
      jest.spyOn(logger, 'info')

      loggerMiddleware.handler('delete')(request as any, {} as any, next)

      expect(logger.info).toHaveBeenCalled()
      expect(logger.info).toHaveBeenCalledWith(`Card ${card.id} - ${card.title} - delete`)
    })
  })
})
