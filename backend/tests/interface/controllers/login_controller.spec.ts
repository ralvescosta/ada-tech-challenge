import { LoginController } from '../../../src/interface/controllers/login_controller'
import { UnauthorizedError } from '../../../src/services/errors/unauthorized'
import { type LoginService } from '../../../src/services/login_service'
import { type Login } from '../../../src/services/models/login'

describe('LoginController', () => {
  const logger = {
    error: jest.fn
  } as any

  const loginService: LoginService = {
    perform: (credentials: Login): any => jest.fn
  }

  const response: any = {
    status: jest.fn,
    json: jest.fn
  }

  const login = { login: 'login', senha: 'password' }

  let loginController: LoginController

  describe('post', () => {
    beforeEach(() => {
      loginController = new LoginController(logger, loginService)
    })

    afterEach(() => jest.clearAllMocks())

    it('should configure status 4xx if some error occur', async () => {
      jest.spyOn(loginService, 'perform').mockImplementation(() => { throw new UnauthorizedError() })
      jest.spyOn(response, 'status').mockReturnValueOnce(response)
      jest.spyOn(response, 'json').mockReturnValueOnce(response)

      await loginController.post({ body: login } as any, response)

      expect(response.status).toHaveBeenCalled()
      expect(response.status).toHaveBeenCalledWith(401)
      expect(response.json).toHaveBeenCalled()
    })

    it('should return the token with 200 status code', async () => {
      jest.spyOn(loginService, 'perform').mockReturnValueOnce('token')
      jest.spyOn(response, 'status').mockReturnValueOnce(response)
      jest.spyOn(response, 'json').mockReturnValueOnce(response)

      await loginController.post({ body: login } as any, response)

      expect(response.status).toHaveBeenCalled()
      expect(response.status).toHaveBeenCalledWith(200)
      expect(response.json).toHaveBeenCalled()
    })
  })
})
