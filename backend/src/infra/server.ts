import express, { type Router, type Application } from 'express'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import { type Logger } from '../infra/logger'

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
    this.express.listen(this.APP_PORT, () => { this.logger.info(`Server running and listening at: 127.0.0.1:${this.APP_PORT}`) })
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
            url: `http://localhost:${this.APP_PORT}`,
            description: 'local'
          }
        ],
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
          { name: 'login', description: 'login related end-points' },
          { name: 'cards', description: 'cards related end-points' }
        ],
        definitions: {},
        components: {
          schemas: {
            Error: {
              type: 'object',
              properties: {
                statusCode: {
                  type: 'integer',
                  format: 'int32'
                },
                message: {
                  type: 'string'
                },
                details: {
                  type: 'string'
                }
              }
            },
            Card: {
              type: 'object',
              required: ['titulo', 'conteudo', 'lista'],
              properties: {
                titulo: {
                  type: 'string'
                },
                conteudo: {
                  type: 'string'
                },
                lista: {
                  type: 'string'
                }
              }
            }
          },
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
