import { type Router } from 'express'
import { type LoginController } from '../controllers/login_controller'

export default (
  { router, loginController }:
  { router: Router, loginController: LoginController }
): void => {
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
  router.get(
    '/login',
    loginController.post.bind(loginController)
  )
}
