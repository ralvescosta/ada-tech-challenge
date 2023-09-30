export class BadRequestError extends Error {
  name = 'BadRequestError'
  constructor (public readonly message: string = 'BadRequestError') {
    super(message)
  }
}
