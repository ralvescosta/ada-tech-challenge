import { type Card } from '../../services/models/cards'
import { type CardsRepository } from '../../services/interfaces/cards_repository'
import { type Logger } from '../logger'
import { CardsModel } from '../database/models/cards'

export class CardsRepositoryImpl implements CardsRepository {
  constructor (private readonly logger: Logger) {}

  public async getById (id: number): Promise<Card | null> {
    try {
      return await CardsModel.findOne({ where: { id } })
    } catch (err) {
      this.logger.error({ msg: 'failure to get card', error: err })
      throw new Error('failure to get card')
    }
  }

  public async list (): Promise<Card[]> {
    try {
      return await CardsModel.findAll()
    } catch (err) {
      this.logger.error({ msg: 'failure to list card', error: err })
      throw new Error('failure to list card')
    }
  }

  public async create (card: Card): Promise<Card> {
    try {
      return await CardsModel.create(card)
    } catch (err) {
      this.logger.error({ msg: 'failure to crete the card', card, error: err })
      throw new Error('failure to crete the card')
    }
  }

  public async update (card: Card): Promise<Card> {
    const { id, ...cardToUpdate } = card
    try {
      const [changes, updated] = await CardsModel.update(cardToUpdate, { where: { id }, returning: true })
      if (changes > 0 && updated != null && updated.length >= 1) {
        return updated[0]
      }

      this.logger.error({ msg: 'failure to update the card', card })
      throw new Error('failure to update card')
    } catch (err) {
      this.logger.error({ msg: 'failure to update the card', card, error: err })
      throw new Error('failure to update the card')
    }
  }

  public async delete (id: number): Promise<void> {
    try {
      await CardsModel.destroy({ where: { id } })
    } catch (err) {
      this.logger.error({ msg: 'failure to delete the card', id, error: err })
      throw new Error('failure to delete the card')
    }
  }
}
