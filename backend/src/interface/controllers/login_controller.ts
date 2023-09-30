import { type Request, type Response } from 'express'
import { type Logger } from '../../infra/logger'
import { type LoginService } from '../../services/login_service'

export class LoginController {
  constructor (
    private readonly logger: Logger,
    private readonly loginService: LoginService
  ) {}

  public async post (request: Request, response: Response): Promise<void> {}
}
