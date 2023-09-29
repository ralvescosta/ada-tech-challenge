import { type NextFunction, type Request, type RequestHandler, type Response } from 'express'
import { type Middleware } from '.'
import { type Logger } from '../../infra/logger'

export interface Schema {
  a: any
}

export class BodyValidatorMiddleware implements Middleware<Schema> {
  constructor (private readonly logger: Logger) {}

  public handler (schema: Schema): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      next()
    }
  }
}
