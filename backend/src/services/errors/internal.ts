export class InternalError extends Error {
  name = 'InternalError'
  constructor (public readonly message: string = 'InternalError') {
    super(message)
  }
}
