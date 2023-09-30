import { type Login } from '../models/login'

export interface SessionToken {
  create: (data: Login) => string
  validate: (token: string) => Login
}
