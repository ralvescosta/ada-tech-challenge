import { type Request, type Response } from 'express'
import { type Logger } from '../../infra/logger'
import { type LoginService } from '../../services/login_service'
import { errorHandler } from './error_handler'

export class LoginController {
  constructor (
    private readonly logger: Logger,
    private readonly loginService: LoginService
  ) { }

  public async post (request: Request, response: Response): Promise<void> {
    const { login, senha } = request.body

    try {
      const token = this.loginService.perform({ login, password: senha })
      response.status(200).json({ token })
    } catch (err: any) {
      errorHandler(err, response)
    }
  }
}
