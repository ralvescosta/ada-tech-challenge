import { type NextFunction, type Request, type RequestHandler, type Response, Router } from 'express'
import { type Middleware } from '../../../src/interface/middlewares'
import { type Schema } from '../../../src/interface/middlewares/validator_middleware'
import HttpServer from '../../../src/infra/server'
import { CardsRoutes } from '../../../src/interface/routes/cards_routes'
import supertest from 'supertest'

describe('CardsRoutes', () => {
  const logger = { info: jest.fn, error: jest.fn } as any
  const router = Router()

  const authMiddleware: Middleware<never> = {
    handler: (): RequestHandler => (req, res, next) => {
      next()
    }
  }

  const loggerMiddleware: Middleware<string> = {
    handler: (): RequestHandler => (req, res, next) => {
      next()
    }
  }

  const bodyValidatorMiddleware: Middleware<Schema> = {
    handler: (schema: Schema): RequestHandler => (req, res, next) => {
      next()
    }
  }

  const card = { id: 1 }

  const cardsController = {
    get: (request: Request, response: Response): any => {
      response.status(200).json([card])
    },
    post: (request: Request, response: Response): any => {
      response.status(201).json(card)
    },
    update: (request: Request, response: Response, next: NextFunction): any => {
      response.status(200).json(card)
    },
    delete: (request: Request, response: Response, next: NextFunction): any => {
      response.status(200).json([card])
    }
  } as any

  let server: HttpServer

  let cardsRoutes: CardsRoutes

  describe('install', () => {
    beforeEach(() => {
      server = new HttpServer(logger)
      cardsRoutes = new CardsRoutes(router, authMiddleware, bodyValidatorMiddleware, loggerMiddleware, cardsController)
      cardsRoutes.install()
      server.route(router)
    })

    afterEach(() => jest.clearAllMocks())

    it('should have GET /cards endpoint retuning 200', async () => {
      await supertest(server.app)
        .get('/cards')
        .expect(200)
    })

    it('should have POST /cards endpoint retuning 201', async () => {
      await supertest(server.app)
        .post('/cards')
        .send(card)
        .expect(201)
    })

    it('should have UPDATE /cards/:id endpoint retuning 200', async () => {
      await supertest(server.app)
        .put(`/cards/${card.id}`)
        .send(card)
        .expect(200)
    })

    it('should have DELETE /cards/:id endpoint retuning 200', async () => {
      await supertest(server.app)
        .delete(`/cards/${card.id}`)
        .expect(200)
    })
  })
})
