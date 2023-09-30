import { type NextFunction, type Request, type Response } from 'express'
import { type CardsService } from '../../services/cards_service'
import { errorHandler } from './error_handler'

export class CardsController {
  constructor (
    private readonly cardsService: CardsService
  ) {}

  public async get (req: Request, res: Response): Promise<void> {
    try {
      const cards = await this.cardsService.listAllCards()
      res.status(200).json(cards)
    } catch (err: any) {
      errorHandler(err, res)
    }
  }

  public async post (req: Request, res: Response): Promise<void> {
    const { title, content, list } = req.body

    try {
      const card = await this.cardsService.createCard({ title, content, list })
      res.status(201).json(card)
    } catch (err: any) {
      errorHandler(err, res)
    }
  }

  public async update (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { title, content, list } = req.body
    const { id } = req.params

    try {
      const card = await this.cardsService.updateCard({ id: Number(id), title, content, list })

      req.body = { ...req.body, id }

      res.status(200).json(card)
    } catch (err: any) {
      errorHandler(err, res)
      return
    }

    next()
  }

  public async delete (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params

    try {
      const card = await this.cardsService.deleteCard(Number(id))

      req.body = card

      res.status(200).json()
    } catch (err: any) {
      errorHandler(err, res)
      return
    }

    next()
  }
}
