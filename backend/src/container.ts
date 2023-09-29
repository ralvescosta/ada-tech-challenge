import { Router } from 'express'
import LoggerInstance, { type Logger } from './infra/logger'
import Environments from './infra/env'
import HttpServer from './infra/server'
import { type Middleware } from './interface/middlewares'
import { AuthMiddleware } from './interface/middlewares/auth_middleware'
import { BodyValidatorMiddleware, type Schema } from './interface/middlewares/validator'
import { CardsController } from './interface/controllers/cards_controller'
import { CardsRepositoryImpl } from './infra/repositories/cards_repository'
import { type CardsRepository } from './services/cards_repository'
import CardsRouter from './interface/routes/cards_routes'

export interface Container {
  logger: Logger
  router: Router
  httpServer: HttpServer
  authMiddleware: Middleware<never>
  bodyValidatorMiddleware: Middleware<Schema>
  cardsRepository: CardsRepository
  cardsController: CardsController
}

export default async (): Promise<Container> => {
  Environments()

  const logger = LoggerInstance()
  const router = Router()
  const httpServer = new HttpServer(logger)

  const authMiddleware = new AuthMiddleware(logger)
  const bodyValidatorMiddleware = new BodyValidatorMiddleware(logger)

  const cardsRepository = new CardsRepositoryImpl(logger)
  const cardsController = new CardsController(logger)
  CardsRouter({ router, authMiddleware, bodyValidatorMiddleware, cardsController })

  return {
    logger,
    router,
    httpServer,
    authMiddleware,
    bodyValidatorMiddleware,
    cardsRepository,
    cardsController
  }
}
