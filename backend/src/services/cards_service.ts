import { type Logger } from '../infra/logger'
import { ConflictError } from './errors/conflict'
import { NotFoundError } from './errors/not_found'
import { type CardsRepository } from './interfaces/cards_repository'
import { type Card } from './models/cards'

export interface CardsService {
  listAllCards: () => Promise<Card[]>
  createCard: (card: Omit<Card, 'id'>) => Promise<Card>
  updateCard: (card: Card) => Promise<Card>
  deleteCard: (id: number) => Promise<Card>
}

export class CardsServiceImpl implements CardsService {
  constructor (
    private readonly logger: Logger,
    private readonly cardsRepository: CardsRepository
  ) {}

  public async listAllCards (): Promise<Card[]> {
    return await this.cardsRepository.list()
  }

  public async createCard (card: Omit<Card, 'id'>): Promise<Card> {
    const created = await this.cardsRepository.getByTitle(card.title)
    if (created != null) {
      this.logger.error({ msg: 'there is already a card with the same title', card })
      throw new ConflictError('there is already a card with the same title')
    }

    return await this.cardsRepository.create(card)
  }

  public async updateCard (card: Card): Promise<Card> {
    const created = this.cardsRepository.getById(card.id)
    if (created == null) {
      this.logger.error({ msg: 'the card id provided do not exist', card })
      throw new NotFoundError('the card id provided do not exist')
    }

    return await this.cardsRepository.update(card)
  }

  public async deleteCard (id: number): Promise<Card> {
    const card = await this.cardsRepository.getById(id)
    if (card == null) {
      this.logger.error({ msg: 'the card id provided do not exist', id })
      throw new NotFoundError('the card id provided do not exist')
    }

    await this.cardsRepository.delete(id)

    return card
  }
}
