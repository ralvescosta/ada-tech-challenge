import { UnauthorizedError } from '../services/errors/unauthorized'
import { type SessionToken } from '../services/interfaces/token'
import { type Login } from '../services/models/login'
import { type Logger } from './logger'
import jwt from 'jsonwebtoken'

export class SessionTokenImpl implements SessionToken {
  private readonly JWT_SECRET: string
  constructor (private readonly logger: Logger) {
    this.JWT_SECRET = ((process?.env?.JWT_SECRET) != null) ? process?.env?.JWT_SECRET : 'SECRET'
  }

  public create (data: Login): string {
    return jwt.sign(data, this.JWT_SECRET, { expiresIn: '1h' })
  }

  public validate (token: string): Login {
    try {
      const verified = jwt.verify(token, this.JWT_SECRET)
    } catch (err: any) {
      this.logger.error({ msg: 'invalid token', error: err })
      throw new UnauthorizedError(err?.message)
    }

    return {} as any
  }
}
