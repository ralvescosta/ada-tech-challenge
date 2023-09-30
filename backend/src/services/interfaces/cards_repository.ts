import { type Card } from '../models/cards'

export interface CardsRepository {
  getById: (id: number) => Promise<Card | null>
  getByTitle: (title: string) => Promise<Card | null>
  list: () => Promise<Card[]>
  create: (card: Omit<Card, 'id'>) => Promise<Card>
  update: (card: Card) => Promise<Card>
  delete: (id: number) => Promise<void>
}
