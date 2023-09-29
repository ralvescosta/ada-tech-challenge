import { type RequestHandler, type NextFunction, type Request, type Response } from 'express'
import { type Middleware } from '.'
import { type Logger } from '../../infra/logger'

export class AuthMiddleware implements Middleware<never> {
  constructor (private readonly logger: Logger) {}

  public handler (): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      if ((req?.headers?.authorization) == null) {
        res.status(401).json({ message: 'token was not provided' })
        return
      }

      const token = req?.headers?.authorization.split(' ')
      if (token[0] !== 'Bearer' || token[1].length === 0) {
        res.status(401).json({ message: 'unformatted token' })
        return
      }

      next()
    }
  }
}
