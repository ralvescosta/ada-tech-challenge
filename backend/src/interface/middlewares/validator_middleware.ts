import { type NextFunction, type Request, type RequestHandler, type Response } from 'express'
import { type Middleware } from '.'
import { type Logger } from '../../infra/logger'
import { type Schema } from 'joi'
export type { Schema } from 'joi'

export class BodyValidatorMiddleware implements Middleware<Schema> {
  constructor (private readonly logger: Logger) {}

  public handler (schema: Schema): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        await schema.validateAsync(req.body)
        next()
      } catch (err: any) {
        this.logger.error({ msg: 'validate error', error: err })
        res.status(400).json({ statusCode: 400, message: 'unformatted body', details: err?.message })
      }
    }
  }
}
