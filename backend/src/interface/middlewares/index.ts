import { type RequestHandler } from 'express'

export interface Middleware<P> {
  handler: (...params: P[]) => RequestHandler
}
