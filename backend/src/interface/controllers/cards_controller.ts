import { type Request, type Response } from 'express'
import { type Logger } from '../../infra/logger'

export class CardsController {
  constructor (
    private readonly logger: Logger
  ) {}

  public async listAllCards (req: Request, res: Response): Promise<void> {
    this.logger.debug('listAllCards')
    res.json()
  }

  public async createCard (req: Request, res: Response): Promise<void> {
    this.logger.debug('createCard')
    res.json()
  }

  public async updateCard (req: Request, res: Response): Promise<void> {
    this.logger.debug('updateCard')
    res.json()
  }

  public async deleteCard (req: Request, res: Response): Promise<void> {
    this.logger.debug('deleteCard')
    res.json()
  }
}
