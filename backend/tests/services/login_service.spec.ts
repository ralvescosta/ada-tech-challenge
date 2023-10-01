/* eslint-disable no-new */
import { type SessionToken } from '../../src/services/interfaces/token'
import { type LoginService, LoginServiceImpl } from '../../src/services/login_service'
import { type Login } from '../../src/services/models/login'

describe('LoginService', () => {
  const logger = {
    error: jest.fn
  } as any
  const sessionToken: SessionToken = {
    create: (data: Login): any => jest.fn,
    validate: (token: string): any => jest.fn
  }

  describe('constructor', () => {
    it('constructor should throw an error if there is no login configured', () => {
      process.env.DEFAULT_LOGIN = ''
      process.env.DEFAULT_PASSWORD = 'password'

      const toThrow = (): void => {
        new LoginServiceImpl(logger, sessionToken)
      }

      expect(toThrow).toThrow()
    })

    it('constructor should throw an error if there is no password configured', () => {
      process.env.DEFAULT_LOGIN = 'login'
      process.env.DEFAULT_PASSWORD = ''

      const toThrow = (): void => {
        new LoginServiceImpl(logger, sessionToken)
      }

      expect(toThrow).toThrow()
    })
  })

  describe('perform', () => {
    let loginService: LoginService
    const wrongLogin: Login = {
      login: 'wrong',
      password: 'password'
    }
    const wrongPassword: Login = {
      login: 'login',
      password: 'wrong'
    }
    const validCredentials: Login = {
      login: 'login',
      password: 'password'
    }

    beforeEach(() => {
      process.env.DEFAULT_LOGIN = 'login'
      process.env.DEFAULT_PASSWORD = 'password'

      loginService = new LoginServiceImpl(logger, sessionToken)
    })

    afterEach(() => jest.clearAllMocks())

    it('should return UnauthorizedError if the login is wrong', () => {
      jest.spyOn(sessionToken, 'create')

      expect(() => loginService.perform(wrongLogin)).toThrow()
      expect(sessionToken.create).not.toHaveBeenCalled()
    })

    it('should return UnauthorizedError if the password is wrong', () => {
      jest.spyOn(sessionToken, 'create')

      expect(() => loginService.perform(wrongPassword)).toThrow()
      expect(sessionToken.create).not.toHaveBeenCalled()
    })

    it('should return the token whe the credentials are correct', () => {
      jest.spyOn(sessionToken, 'create').mockReturnValueOnce('token')

      const token = loginService.perform(validCredentials)
      expect(token).toEqual('token')
      expect(sessionToken.create).toHaveBeenCalled()
    })
  })
})
