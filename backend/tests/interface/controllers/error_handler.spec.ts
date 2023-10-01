import { errorHandler } from '../../../src/interface/controllers/error_handler'
import { BadRequestError } from '../../../src/services/errors/bad_request'
import { ConflictError } from '../../../src/services/errors/conflict'
import { InternalError } from '../../../src/services/errors/internal'
import { NotFoundError } from '../../../src/services/errors/not_found'
import { UnauthorizedError } from '../../../src/services/errors/unauthorized'

describe('errorHandler', () => {
  const response: any = {
    status: jest.fn,
    json: jest.fn
  }

  afterEach(() => jest.clearAllMocks())

  it('with nullable error', () => {
    jest.spyOn(response, 'status').mockReturnValueOnce(response)
    jest.spyOn(response, 'json').mockReturnValueOnce(response)

    errorHandler(null as any, response)

    expect(response.status).not.toHaveBeenCalled()
    expect(response.json).not.toHaveBeenCalled()
  })

  it('BadRequestError', () => {
    jest.spyOn(response, 'status').mockReturnValueOnce(response)
    jest.spyOn(response, 'json').mockReturnValueOnce(response)

    errorHandler(new BadRequestError(), response)

    expect(response.status).toBeCalledWith(400)
    expect(response.json).toHaveBeenCalled()
  })

  it('BadRequestError', () => {
    jest.spyOn(response, 'status').mockReturnValueOnce(response)
    jest.spyOn(response, 'json').mockReturnValueOnce(response)

    errorHandler(new UnauthorizedError(), response)

    expect(response.status).toBeCalledWith(401)
    expect(response.json).toHaveBeenCalled()
  })

  it('NotFoundError', () => {
    jest.spyOn(response, 'status').mockReturnValueOnce(response)
    jest.spyOn(response, 'json').mockReturnValueOnce(response)

    errorHandler(new NotFoundError(), response)

    expect(response.status).toBeCalledWith(404)
    expect(response.json).toHaveBeenCalled()
  })

  it('ConflictError', () => {
    jest.spyOn(response, 'status').mockReturnValueOnce(response)
    jest.spyOn(response, 'json').mockReturnValueOnce(response)

    errorHandler(new ConflictError(), response)

    expect(response.status).toBeCalledWith(409)
    expect(response.json).toHaveBeenCalled()
  })

  it('InternalError', () => {
    jest.spyOn(response, 'status').mockReturnValueOnce(response)
    jest.spyOn(response, 'json').mockReturnValueOnce(response)

    errorHandler(new InternalError(), response)

    expect(response.status).toBeCalledWith(500)
    expect(response.json).toHaveBeenCalled()
  })
})
