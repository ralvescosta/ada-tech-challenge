export class ConflictError extends Error {
  name = 'ConflictError'
  constructor (public readonly message: string = 'ConflictError') {
    super(message)
  }
}
