import { type CardsService, CardsServiceImpl } from '../../src/services/cards_service'
import { BadRequestError } from '../../src/services/errors/bad_request'
import { ConflictError } from '../../src/services/errors/conflict'
import { NotFoundError } from '../../src/services/errors/not_found'
import { type CardsRepository } from '../../src/services/interfaces/cards_repository'
import { type Card } from '../../src/services/models/cards'

describe('CardsService', () => {
  const cardsRepository: CardsRepository = {
    getById: (id: number): any => jest.fn,
    getByTitle: (title: string): any => jest.fn,
    list: (): any => jest.fn,
    create: (card: Omit<Card, 'id'>): any => jest.fn,
    update: (card: Card): any => jest.fn,
    delete: (id: number): any => jest.fn
  }
  const logger = { error: jest.fn } as any
  const card: Card = { id: 1, title: 'title', content: 'content', list: 'list' }
  let cardsService: CardsService

  describe('listAllCards', () => {
    beforeEach(() => {
      cardsService = new CardsServiceImpl(logger, cardsRepository)
    })

    afterEach(() => jest.clearAllMocks())

    it('should return the card list', async () => {
      jest.spyOn(cardsRepository, 'list').mockResolvedValueOnce([card])

      const res = await cardsService.listAllCards()

      expect(cardsRepository.list).toBeCalledTimes(1)
      expect(res).toHaveLength(1)
    })
  })

  describe('createCard', () => {
    beforeEach(() => {
      cardsService = new CardsServiceImpl(logger, cardsRepository)
    })

    afterEach(() => jest.clearAllMocks())

    it('should return ConflictError when there is already a card with same title', async () => {
      jest.spyOn(cardsRepository, 'getByTitle').mockResolvedValueOnce(card)
      jest.spyOn(cardsRepository, 'create')

      await expect(cardsService.createCard(card)).rejects.toBeInstanceOf(ConflictError)
      expect(cardsRepository.getByTitle).toBeCalledTimes(1)
      expect(cardsRepository.create).not.toHaveBeenCalled()
    })

    it('should return the card created', async () => {
      jest.spyOn(cardsRepository, 'getByTitle').mockResolvedValueOnce(null)
      jest.spyOn(cardsRepository, 'create').mockResolvedValueOnce(card)

      const res = await cardsService.createCard(card)

      expect(cardsRepository.getByTitle).toBeCalledTimes(1)
      expect(cardsRepository.create).toBeCalledTimes(1)
      expect(cardsRepository.create).toBeCalledWith(card)
      expect(res).toEqual(card)
    })
  })

  describe('updateCard', () => {
    beforeEach(() => {
      cardsService = new CardsServiceImpl(logger, cardsRepository)
    })

    afterEach(() => jest.clearAllMocks())

    it('should return BadRequestError when params Id is different than body id', async () => {
      jest.spyOn(cardsRepository, 'getById')
      jest.spyOn(cardsRepository, 'update')

      await expect(cardsService.updateCard(Infinity, card)).rejects.toBeInstanceOf(BadRequestError)
      expect(cardsRepository.getById).not.toHaveBeenCalled()
      expect(cardsRepository.update).not.toHaveBeenCalled()
    })

    it('should return NotFoundError when the card id provided not exist', async () => {
      jest.spyOn(cardsRepository, 'getById').mockResolvedValueOnce(null)
      jest.spyOn(cardsRepository, 'update')

      await expect(cardsService.updateCard(card.id, card)).rejects.toBeInstanceOf(NotFoundError)
      expect(cardsRepository.getById).toHaveBeenCalledTimes(1)
      expect(cardsRepository.update).not.toHaveBeenCalled()
    })

    it('should return the card updated', async () => {
      jest.spyOn(cardsRepository, 'getById').mockResolvedValueOnce(card)
      jest.spyOn(cardsRepository, 'update').mockResolvedValueOnce(card)

      const res = await cardsService.updateCard(card.id, card)

      expect(cardsRepository.getById).toBeCalledTimes(1)
      expect(cardsRepository.update).toBeCalledTimes(1)
      expect(cardsRepository.update).toBeCalledWith(card)
      expect(res).toEqual(card)
    })
  })

  describe('deleteCard', () => {
    beforeEach(() => {
      cardsService = new CardsServiceImpl(logger, cardsRepository)
    })

    afterEach(() => jest.clearAllMocks())

    it('should return NotFoundError when the card id provided not exist', async () => {
      jest.spyOn(cardsRepository, 'getById').mockResolvedValueOnce(null)
      jest.spyOn(cardsRepository, 'delete')
      jest.spyOn(cardsRepository, 'list')

      await expect(cardsService.deleteCard(card.id)).rejects.toBeInstanceOf(NotFoundError)
      expect(cardsRepository.getById).toHaveBeenCalledTimes(1)
      expect(cardsRepository.delete).not.toHaveBeenCalled()
      expect(cardsRepository.list).not.toHaveBeenCalled()
    })

    it('should return the list of cards when the card deleted', async () => {
      jest.spyOn(cardsRepository, 'getById').mockResolvedValueOnce(card)
      jest.spyOn(cardsRepository, 'delete').mockResolvedValueOnce()
      jest.spyOn(cardsRepository, 'list').mockResolvedValueOnce([card])

      const res = await cardsService.deleteCard(card.id)

      expect(cardsRepository.getById).toBeCalledTimes(1)
      expect(cardsRepository.delete).toBeCalledTimes(1)
      expect(cardsRepository.delete).toBeCalledWith(card.id)
      expect(cardsRepository.list).toBeCalledTimes(1)
      expect(res).toEqual({ deleted: card, cards: [card] })
    })
  })
})
