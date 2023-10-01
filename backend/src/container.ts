import { Router } from 'express'
import LoggerInstance, { type Logger } from './infra/logger'
import Environments from './infra/env'
import HttpServer from './infra/server'
import { type Middleware } from './interface/middlewares'
import { AuthMiddleware } from './interface/middlewares/auth_middleware'
import { BodyValidatorMiddleware, type Schema } from './interface/middlewares/validator_middleware'
import { CardsController } from './interface/controllers/cards_controller'
import { CardsRepositoryImpl } from './infra/repositories/cards_repository'
import { type CardsRepository } from './services/interfaces/cards_repository'
import { CardsRoutes } from './interface/routes/cards_routes'
import { type CardsService, CardsServiceImpl } from './services/cards_service'
import { type LoginService, LoginServiceImpl } from './services/login_service'
import { LoginController } from './interface/controllers/login_controller'
import { LoginRoutes } from './interface/routes/login_routes'
import { LoggerMiddleware } from './interface/middlewares/logger_middleware'
import { SessionTokenImpl } from './infra/token'

export interface Container {
  logger: Logger
  router: Router
  httpServer: HttpServer
  authMiddleware: Middleware<never>
  bodyValidatorMiddleware: Middleware<Schema>
  loginService: LoginService
  loginController: LoginController
  loginRoutes: LoginRoutes
  cardsRepository: CardsRepository
  cardsService: CardsService
  cardsController: CardsController
  cardsRoutes: CardsRoutes
}

export default async (): Promise<Container> => {
  Environments()

  const logger = LoggerInstance()
  const router = Router()
  const httpServer = new HttpServer(logger)

  const sessionToken = new SessionTokenImpl(logger)
  const authMiddleware = new AuthMiddleware(logger, sessionToken)
  const bodyValidatorMiddleware = new BodyValidatorMiddleware(logger)
  const loggerMiddleware = new LoggerMiddleware(logger)

  const loginService = new LoginServiceImpl(logger, sessionToken)
  const loginController = new LoginController(logger, loginService)
  const loginRoutes = new LoginRoutes(router, bodyValidatorMiddleware, loginController)

  const cardsRepository = new CardsRepositoryImpl(logger)
  const cardsService = new CardsServiceImpl(logger, cardsRepository)
  const cardsController = new CardsController(cardsService)
  const cardsRoutes = new CardsRoutes(router, authMiddleware, bodyValidatorMiddleware, loggerMiddleware, cardsController)

  return {
    logger,
    router,
    httpServer,
    authMiddleware,
    bodyValidatorMiddleware,
    loginService,
    loginController,
    loginRoutes,
    cardsRepository,
    cardsService,
    cardsController,
    cardsRoutes
  }
}
