import { type Logger } from '../infra/logger'
import { UnauthorizedError } from './errors/unauthorized'
import { type SessionToken } from './interfaces/token'
import { type Login } from './models/login'

export interface LoginService {
  perform: (credentials: Login) => Promise<string>
}

export class LoginServiceImpl implements LoginService {
  private readonly DEFAULT_LOGIN: string
  private readonly DEFAULT_PASSWORD: string

  constructor (
    private readonly logger: Logger,
    private readonly sessionToken: SessionToken
  ) {
    if (process.env.DEFAULT_LOGIN == null) {
      throw Error('DEFAULT_LOGIN environment must be configured')
    }

    if (process.env.DEFAULT_PASSWORD == null) {
      throw Error('DEFAULT_PASSWORD environment must be configured')
    }

    this.DEFAULT_LOGIN = process.env.DEFAULT_LOGIN
    this.DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD
  }

  public async perform (credentials: Login): Promise<string> {
    if (credentials.login !== this.DEFAULT_LOGIN || credentials.password !== this.DEFAULT_PASSWORD) {
      this.logger.error('login or password is wrong')
      throw new UnauthorizedError('login or password is wrong')
    }

    return this.sessionToken.create(credentials)
  }
}
