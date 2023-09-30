import { type Response } from 'express'
import { UnauthorizedError } from '../../services/errors/unauthorized'
import { InternalError } from '../../services/errors/internal'

export function errorHandler (error: Error, response: Response): void {
  if (error == null) return

  switch (error.constructor) {
    case UnauthorizedError:
      response.status(401).json({ statusCode: 401, message: error.message })
      break
    case InternalError:
      response.status(500).json({ statusCode: 500, message: error.message })
      break
  }
}
