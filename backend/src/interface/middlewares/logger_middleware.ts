import { type Logger } from '../../infra/logger'
import { type Middleware } from '.'
import { type NextFunction, type Request, type RequestHandler, type Response } from 'express'

export class LoggerMiddleware implements Middleware<string> {
  constructor (private readonly logger: Logger) {}

  public handler (action: string): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { id, title } = req.body

      this.logger.info(`Card ${id} - ${title} - ${action}`)

      next()
    }
  }
}
