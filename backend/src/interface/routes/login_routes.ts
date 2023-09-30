import { type Router } from 'express'
import { type LoginController } from '../controllers/login_controller'
import { type Schema } from '../middlewares/validator'
import { type Middleware } from '../middlewares'
import { loginPostSchema } from '../schemas/login'

export class LoginRoutes {
  constructor (
    private readonly router: Router,
    private readonly bodyValidatorMiddleware: Middleware<Schema>,
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
      this.bodyValidatorMiddleware.handler(loginPostSchema),
      this.loginController.post.bind(this.loginController)
    )
  }
}
