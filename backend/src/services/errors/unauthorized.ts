export class UnauthorizedError extends Error {
  name = 'UnauthorizedError'
  constructor (public readonly message: string = 'UnauthorizedError') {
    super(message)
  }
}
