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
      res.status(200).json(
        cards.map(card => ({ id: card.id, titulo: card.title, conteudo: card.content, lista: card.list }))
      )
    } catch (err: any) {
      errorHandler(err, res)
    }
  }

  public async post (req: Request, res: Response): Promise<void> {
    const { titulo, conteudo, lista } = req.body

    try {
      const card = await this.cardsService.createCard({ title: titulo, content: conteudo, list: lista })
      res.status(201).json({ id: card.id, titulo: card.title, conteudo: card.content, lista: card.list })
    } catch (err: any) {
      errorHandler(err, res)
    }
  }

  public async update (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id, titulo, conteudo, lista } = req.body as { id: number, titulo: string, conteudo: string, lista: string }
    const { id: paramId } = req.params

    try {
      const card = await this.cardsService.updateCard(Number(paramId), { id, title: titulo, content: conteudo, list: lista })

      req.body = { ...req.body, id }

      res.status(200).json({ id, titulo: card.title, conteudo: card.content, lista: card.list })
    } catch (err: any) {
      errorHandler(err, res)
      return
    }

    next()
  }

  public async delete (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params

    try {
      const response = await this.cardsService.deleteCard(Number(id))

      req.body = response.deleted

      res.status(200).json(
        response.cards.map(card => ({ id: card.id, titulo: card.title, conteudo: card.content, lista: card.list }))
      )
    } catch (err: any) {
      errorHandler(err, res)
      return
    }

    next()
  }
}
