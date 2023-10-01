import { type NextFunction } from 'express'
import { type Middleware } from '../../../src/interface/middlewares'
import { AuthMiddleware } from '../../../src/interface/middlewares/auth_middleware'
import { type SessionToken } from '../../../src/services/interfaces/token'
import { type Login } from '../../../src/services/models/login'

describe('AuthMiddleware', () => {
  const logger = {
    error: jest.fn
  } as any

  const sessionToken: SessionToken = {
    create: (data: Login): any => jest.fn,
    validate: (token: string): any => jest.fn
  }

  const response: any = {
    status: jest.fn,
    json: jest.fn,
    end: jest.fn
  }

  const next: NextFunction = () => {}

  let authMiddleware: Middleware<never>

  describe('handler', () => {
    beforeEach(() => {
      authMiddleware = new AuthMiddleware(logger, sessionToken)
    })

    afterEach(() => jest.clearAllMocks())

    it('should set status code 401 if authorization header is not present', async () => {
      const request = { headers: {} } as any
      jest.spyOn(response, 'status').mockReturnValueOnce(response)
      jest.spyOn(response, 'json').mockReturnValueOnce(response)
      jest.spyOn(response, 'end').mockReturnValueOnce(response)

      authMiddleware.handler()(request, response, next)

      expect(response.status).toHaveBeenCalledWith(401)
      expect(response.json).toHaveBeenCalled()
      expect(response.end).toHaveBeenCalled()
    })

    it('should set status code 401 if authorization is unformatted', async () => {
      const request = { headers: { authorization: 'token' } } as any
      jest.spyOn(response, 'status').mockReturnValueOnce(response)
      jest.spyOn(response, 'json').mockReturnValueOnce(response)

      authMiddleware.handler()(request, response, next)

      expect(response.status).toHaveBeenCalledWith(401)
      expect(response.json).toHaveBeenCalled()
      expect(response.end).toHaveBeenCalled()
    })

    it('should set status code 401 if token kind is not Bearer', async () => {
      const request = { headers: { authorization: 'kind token' } } as any
      jest.spyOn(response, 'status').mockReturnValueOnce(response)
      jest.spyOn(response, 'json').mockReturnValueOnce(response)

      authMiddleware.handler()(request, response, next)

      expect(response.status).toHaveBeenCalledWith(401)
      expect(response.json).toHaveBeenCalled()
      expect(response.end).toHaveBeenCalled()
    })

    it('should set status code 401 sessionToken throw error', async () => {
      const request = { headers: { authorization: 'Bearer token' } } as any
      jest.spyOn(response, 'status').mockReturnValueOnce(response)
      jest.spyOn(response, 'json').mockReturnValueOnce(response)
      jest.spyOn(sessionToken, 'validate').mockImplementationOnce(() => {
        throw new Error('')
      })

      authMiddleware.handler()(request, response, next)

      expect(response.status).toHaveBeenCalledWith(401)
      expect(response.json).toHaveBeenCalled()
      expect(response.end).toHaveBeenCalled()
    })

    it('should do not set status code 401 when token is valid', async () => {
      const request = { headers: { authorization: 'Bearer token' } } as any
      jest.spyOn(response, 'status').mockReturnValueOnce(response)
      jest.spyOn(response, 'json').mockReturnValueOnce(response)
      jest.spyOn(sessionToken, 'validate').mockReturnValueOnce({} as any)

      authMiddleware.handler()(request, response, next)

      expect(response.status).not.toHaveBeenCalled()
      expect(response.json).not.toHaveBeenCalled()
      expect(response.end).not.toHaveBeenCalled()
    })
  })
})
