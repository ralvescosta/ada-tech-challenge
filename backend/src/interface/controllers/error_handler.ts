import { type Response } from 'express'
import { UnauthorizedError } from '../../services/errors/unauthorized'
import { NotFoundError } from '../../services/errors/not_found'
import { ConflictError } from '../../services/errors/conflict'

export function errorHandler (error: Error, response: Response): void {
  if (error == null) return

  switch (error.constructor) {
    case UnauthorizedError:
      response.status(401).json({ statusCode: 401, message: error.message })
      break
    case NotFoundError:
      response.status(404).json({ statusCode: 404, message: error.message })
      break
    case ConflictError:
      response.status(409).json({ statusCode: 409, message: error.message })
      break
    default:
      response.status(500).json({ statusCode: 500, message: error.message })
      break
  }
}
