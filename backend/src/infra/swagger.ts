import swaggerJsDoc from 'swagger-jsdoc'

export default (port: number): object => swaggerJsDoc({
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
        url: `http://localhost:${port}`,
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
  apis: ['**/interface/routes/**.{ts,js}']
})
