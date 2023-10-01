import { type NextFunction } from 'express'
import { CardsController } from '../../../src/interface/controllers/cards_controller'
import { type CardsService } from '../../../src/services/cards_service'
import { UnauthorizedError } from '../../../src/services/errors/unauthorized'
import { type Card } from '../../../src/services/models/cards'

describe('CardsController', () => {
  const cardsService: CardsService = {
    listAllCards: (): any => jest.fn,
    createCard: (card: Omit<Card, 'id'>): any => jest.fn,
    updateCard: (paramId: number, card: Card): any => jest.fn,
    deleteCard: (id: number): any => jest.fn
  }

  const response: any = {
    status: jest.fn,
    json: jest.fn
  }

  const next: NextFunction = () => jest.fn

  const cardServiceResponse: Card = { id: 1, title: 'title', content: 'content', list: 'list' }
  const cardControllerResponse = { id: 1, titulo: 'title', conteudo: 'content', lista: 'list' }

  let cardsController: CardsController

  describe('get', () => {
    beforeEach(() => {
      cardsController = new CardsController(cardsService)
    })

    afterEach(() => jest.clearAllMocks())

    it('should set status 4xx if some error occur', async () => {
      jest.spyOn(cardsService, 'listAllCards').mockRejectedValueOnce(new UnauthorizedError())
      jest.spyOn(response, 'status').mockReturnValueOnce(response)
      jest.spyOn(response, 'json').mockReturnValueOnce(response)

      await cardsController.get({} as any, response)

      expect(cardsService.listAllCards).toHaveBeenCalled()
      expect(response.status).toHaveBeenCalledWith(401)
      expect(response.json).toHaveBeenCalled()
    })

    it('should set status 200 if everything went well', async () => {
      jest.spyOn(cardsService, 'listAllCards').mockResolvedValueOnce([cardServiceResponse])
      jest.spyOn(response, 'status').mockReturnValueOnce(response)
      jest.spyOn(response, 'json').mockReturnValueOnce(response)

      await cardsController.get({} as any, response)

      expect(cardsService.listAllCards).toHaveBeenCalled()
      expect(response.status).toHaveBeenCalledWith(200)
      expect(response.json).toHaveBeenCalled()
    })
  })

  describe('post', () => {
    beforeEach(() => {
      cardsController = new CardsController(cardsService)
    })

    afterEach(() => jest.clearAllMocks())

    it('should set status 4xx if some error occur', async () => {
      jest.spyOn(cardsService, 'createCard').mockRejectedValueOnce(new UnauthorizedError())
      jest.spyOn(response, 'status').mockReturnValueOnce(response)
      jest.spyOn(response, 'json').mockReturnValueOnce(response)

      await cardsController.post({ body: cardControllerResponse } as any, response)

      expect(cardsService.createCard).toHaveBeenCalled()
      expect(response.status).toHaveBeenCalledWith(401)
      expect(response.json).toHaveBeenCalled()
    })

    it('should set status 201 if everything went well', async () => {
      jest.spyOn(cardsService, 'createCard').mockResolvedValueOnce(cardServiceResponse)
      jest.spyOn(response, 'status').mockReturnValueOnce(response)
      jest.spyOn(response, 'json').mockReturnValueOnce(response)

      await cardsController.post({ body: cardControllerResponse } as any, response)

      expect(cardsService.createCard).toHaveBeenCalled()
      expect(response.status).toHaveBeenCalledWith(201)
      expect(response.json).toHaveBeenCalled()
    })
  })

  describe('update', () => {
    beforeEach(() => {
      cardsController = new CardsController(cardsService)
    })

    afterEach(() => jest.clearAllMocks())

    it('should set status 4xx if some error occur', async () => {
      jest.spyOn(cardsService, 'updateCard').mockRejectedValueOnce(new UnauthorizedError())
      jest.spyOn(response, 'status').mockReturnValueOnce(response)
      jest.spyOn(response, 'json').mockReturnValueOnce(response)
      const request = { body: cardControllerResponse, params: { id: cardServiceResponse.id } } as any

      await cardsController.update(request, response, next)

      expect(cardsService.updateCard).toHaveBeenCalled()
      expect(response.status).toHaveBeenCalledWith(401)
      expect(response.json).toHaveBeenCalled()
    })

    it('should set status 200 if everything went well', async () => {
      jest.spyOn(cardsService, 'updateCard').mockResolvedValueOnce(cardServiceResponse)
      jest.spyOn(response, 'status').mockReturnValueOnce(response)
      jest.spyOn(response, 'json').mockReturnValueOnce(response)
      const request = { body: cardControllerResponse, params: { id: cardServiceResponse.id } } as any

      await cardsController.update(request, response, next)

      expect(cardsService.updateCard).toHaveBeenCalled()
      expect(response.status).toHaveBeenCalledWith(200)
      expect(response.json).toHaveBeenCalled()
    })
  })

  describe('delete', () => {
    beforeEach(() => {
      cardsController = new CardsController(cardsService)
    })

    afterEach(() => jest.clearAllMocks())

    it('should set status 4xx if some error occur', async () => {
      jest.spyOn(cardsService, 'deleteCard').mockRejectedValueOnce(new UnauthorizedError())
      jest.spyOn(response, 'status').mockReturnValueOnce(response)
      jest.spyOn(response, 'json').mockReturnValueOnce(response)
      const request = { params: { id: cardServiceResponse.id } } as any

      await cardsController.delete(request, response, next)

      expect(cardsService.deleteCard).toHaveBeenCalled()
      expect(response.status).toHaveBeenCalledWith(401)
      expect(response.json).toHaveBeenCalled()
    })

    it('should set status 200 if everything went well', async () => {
      const deleteCardResponse = { deleted: cardServiceResponse, cards: [cardServiceResponse] }
      jest.spyOn(cardsService, 'deleteCard').mockResolvedValueOnce(deleteCardResponse)
      jest.spyOn(response, 'status').mockReturnValueOnce(response)
      jest.spyOn(response, 'json').mockReturnValueOnce(response)
      const request = { params: { id: cardServiceResponse.id } } as any

      await cardsController.delete(request, response, next)

      expect(cardsService.deleteCard).toHaveBeenCalled()
      expect(response.status).toHaveBeenCalledWith(200)
      expect(response.json).toHaveBeenCalled()
    })
  })
})
