import { type NextFunction, type Request, type Response } from 'express'
import { type Logger } from '../../infra/logger'
import { type CardsService } from '../../services/cards_service'

export class CardsController {
  constructor (
    private readonly logger: Logger,
    private readonly cardsService: CardsService
  ) {}

  public async listAllCards (req: Request, res: Response): Promise<void> {
    this.logger.debug('listAllCards')
    res.json()
  }

  public async createCard (req: Request, res: Response): Promise<void> {
    this.logger.debug('createCard')
    res.json()
  }

  public async updateCard (req: Request, res: Response, next: NextFunction): Promise<void> {
    this.logger.debug('updateCard')

    res.json({ hello: 'world' })

    next()
  }

  public async deleteCard (req: Request, res: Response, next: NextFunction): Promise<void> {
    this.logger.debug('deleteCard')
    // res.json()

    next()
  }
}
