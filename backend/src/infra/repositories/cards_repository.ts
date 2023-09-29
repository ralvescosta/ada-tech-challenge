import { type CardsRepository } from '../../services/cards_repository'
import { type Logger } from '../logger'

export class CardsRepositoryImpl implements CardsRepository {
  constructor (private readonly logger: Logger) {}

  public async list (): Promise<void> {}
}
