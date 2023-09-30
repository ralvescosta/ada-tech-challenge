export class NotFoundError extends Error {
  name = 'NotFoundError'
  constructor (public readonly message: string = 'NotFoundError') {
    super(message)
  }
}
