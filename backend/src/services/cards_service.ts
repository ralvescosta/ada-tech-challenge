import { type Logger } from '../infra/logger'
import { type CardsRepository } from './cards_repository'

export interface CardsService {
  perform: () => Promise<void>
}

export class CardsServiceImpl implements CardsService {
  constructor (
    private readonly logger: Logger,
    private readonly cardsRepository: CardsRepository
  ) {}

  public async perform (): Promise<void> {}
}
