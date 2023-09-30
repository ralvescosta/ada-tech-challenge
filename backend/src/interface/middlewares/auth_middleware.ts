import { type RequestHandler, type NextFunction, type Request, type Response } from 'express'
import { type Middleware } from '.'
import { type Logger } from '../../infra/logger'
import { type SessionToken } from '../../services/interfaces/token'

export class AuthMiddleware implements Middleware<never> {
  constructor (
    private readonly logger: Logger,
    private readonly sessionToken: SessionToken
  ) {}

  public handler (): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      if ((req?.headers?.authorization) == null) {
        this.logger.error('request without token')

        res.status(401).json({ statusCode: 401, message: 'token was not provided' })
        res.end()

        return
      }

      const token = req?.headers?.authorization.split(' ')
      if (token[0] !== 'Bearer' || token[1].length === 0) {
        this.logger.error('request with unformatted token')

        res.status(401).json({ statusCode: 401, message: 'unformatted token' })
        res.end()

        return
      }

      try {
        const login = this.sessionToken.validate(token[1])

        // @TODO
        // req.login = undefined
      } catch (err: any) {
        res.status(401).json({ statusCode: 401, message: err.message })
        res.end()

        return
      }

      next()
    }
  }
}
