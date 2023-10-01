import express, { type Router, type Application } from 'express'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import { type Logger } from '../infra/logger'
import SwaggerSpec from './swagger'

export default class HttpServer {
  private readonly express: Application
  private readonly APP_PORT: number

  constructor (private readonly logger: Logger) {
    this.express = express()
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(compression())
    this.express.use(helmet())
    this.APP_PORT = ((process?.env?.PORT) != null) ? Number(process.env.PORT) : 5000
  }

  public route (route: Router): void {
    this.express.use(route)
  }

  public listening (): void {
    this.swagger()

    this.express.listen(
      this.APP_PORT,
      () => { this.logger.info(`Server running and listening at: 127.0.0.1:${this.APP_PORT}`) }
    )
  }

  private swagger (): void {
    this.express.use(
      '/docs',
      swaggerUI.serve,
      swaggerUI.setup(SwaggerSpec(this.APP_PORT))
    )
  }

  public get app (): Application {
    return this.express
  }
}
