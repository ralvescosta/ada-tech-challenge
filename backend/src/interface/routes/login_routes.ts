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
   *   post:
   *     summary: Login
   *     description: Login
   *     tags:
   *       - login
   *     requestBody:
   *       description: Login
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               login:
   *                 type: string
   *               senha:
   *                 type: string
   *     responses:
   *       200:
   *         description: Returns the token.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *       400:
   *         description: Bad Request - Unformatted Body
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       401:
   *         description: Not Authorized - Wrong login or password
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Internal Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
    this.router.post(
      '/login',
      this.bodyValidatorMiddleware.handler(loginPostSchema),
      this.loginController.post.bind(this.loginController)
    )
  }
}
