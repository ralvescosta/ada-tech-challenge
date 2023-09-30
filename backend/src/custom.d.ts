declare namespace Express {
  export interface Request {
    login?: { login: string, password: string }
  }
}
