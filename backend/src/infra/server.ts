import express, { type Router, type Application } from 'express'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import { type Logger } from '../infra/logger'

export default class HttpServer {
  private readonly express: Application

  constructor (private readonly logger: Logger) {
    this.express = express()
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(compression())
    this.express.use(helmet())
  }

  public route (route: Router): void {
    this.express.use(route)
  }

  public listening (): void {
    const PORT = ((process?.env?.PORT) != null) ? process.env.PORT : 5000
    this.swagger()
    this.express.listen(PORT, () => { this.logger.info(`Server running and listening at: 127.0.0.1:${PORT}`) })
  }

  private swagger (): void {
    const specs = swaggerJsDoc({
      definition: {
        openapi: '3.0.1',
        info: {
          title: 'Ada Tech Challenge',
          description: 'OpenAPI Documentation for Ada Tech Challenger',
          version: '0.1.0',
          contact: {
            name: 'API Support',
            url: 'https://github.com/ralvescosta',
            email: 'the.ralvescosta@gmail.com'
          }
        },
        servers: [
          {
            url: 'http://localhost:5000',
            description: 'local'
          }
        ],
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
          { name: 'cards', description: 'cards related end-points' }
        ],
        definitions: {},
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT'
            }
          }
        }
      },
      apis: ['**/*.ts']
    })

    this.express.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))
  }
}
