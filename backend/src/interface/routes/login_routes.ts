import { type Router } from 'express'
import { type LoginController } from '../controllers/login_controller'

export class LoginRoutes {
  constructor (
    private readonly router: Router,
    private readonly loginController: LoginController
  ) {}

  public install (): void {
    /**
   * @openapi
   * /login:
   *   get:
   *     summary: Login
   *     tags:
   *       - login
   *     security:
   *       - bearerAuth: []
   *     description: Login
   *     responses:
   *       200:
   *         description: Returns login token.
   */
    this.router.post(
      '/login',
      this.loginController.post.bind(this.loginController)
    )
  }
}
