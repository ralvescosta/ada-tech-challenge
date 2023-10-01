import { type Request, type Response, Router } from 'express'
import HttpServer from '../../../src/infra/server'
import { LoginRoutes } from '../../../src/interface/routes/login_routes'
import { type Middleware } from '../../../src/interface/middlewares'
import { type Schema } from '../../../src/interface/middlewares/validator_middleware'
import supertest from 'supertest'
import { type RequestHandler } from 'express-serve-static-core'

describe('LoginRoutes', () => {
  const logger = { info: jest.fn, error: jest.fn } as any
  const router = Router()

  const bodyValidatorMiddleware: Middleware<Schema> = {
    handler: (schema: Schema): RequestHandler => (req, res, next) => {
      next()
    }
  }

  const loginController = {
    post: (request: Request, response: Response): any => {
      response.status(200).json({ token: 'token' })
    }
  } as any

  let server: HttpServer

  let loginRoutes: LoginRoutes

  describe('install', () => {
    beforeEach(() => {
      server = new HttpServer(logger)
      loginRoutes = new LoginRoutes(router, bodyValidatorMiddleware, loginController)
      loginRoutes.install()
      server.route(router)
    })

    afterEach(() => jest.clearAllMocks())

    it('should have POST /login endpoint retuning 200', async () => {
      await supertest(server.app)
        .post('/login')
        .send({ login: 'login', senha: 'senha' })
        .expect(200)
    })
  })
})
