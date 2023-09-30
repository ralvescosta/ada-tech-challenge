import { type Router } from 'express'
import { type Middleware } from '../middlewares'
import { type CardsController } from '../controllers/cards_controller'
import { type Schema } from '../middlewares/validator'
import { cardSchema } from '../schemas/cards'

export class CardsRoutes {
  constructor (
    private readonly router: Router,
    private readonly authMiddleware: Middleware<never>,
    private readonly bodyValidatorMiddleware: Middleware<Schema>,
    private readonly loggerMiddleware: Middleware<string>,
    private readonly cardsController: CardsController
  ) {}

  public install (): void {
    /**
   * @openapi
   * /cards:
   *   get:
   *     summary: List all cards
   *     tags:
   *       - cards
   *     security:
   *       - bearerAuth: []
   *     description: List all cards
   *     responses:
   *       200:
   *         description: Returns the cards list.
   */
    this.router.get(
      '/cards',
      this.authMiddleware.handler(),
      this.cardsController.get.bind(this.cardsController)
    )

    /**
   * @openapi
   * /cards:
   *   post:
   *     summary: Create card
   *     tags:
   *       - cards
   *     security:
   *       - bearerAuth: []
   *     description: Create card
   *     responses:
   *       200:
   *         description: Returns the cards created.
   */
    this.router.post('/cards',
      this.authMiddleware.handler(),
      this.bodyValidatorMiddleware.handler(cardSchema),
      this.cardsController.post.bind(this.cardsController)
    )

    /**
   * @openapi
   * /cards/{id}:
   *   put:
   *     summary: Update a card
   *     tags:
   *       - cards
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *     description: Update a card
   *     responses:
   *       200:
   *         description: Returns the cards updated.
   */
    this.router.put('/cards/:id',
      this.authMiddleware.handler(),
      this.bodyValidatorMiddleware.handler(cardSchema),
      this.cardsController.update.bind(this.cardsController),
      this.loggerMiddleware.handler('Alterado')
    )

    /**
   * @openapi
   * /cards/{id}:
   *   delete:
   *     summary: Delete a card
   *     tags:
   *       - cards
   *     security:
   *       - bearerAuth: []
   *     description: Delete a card
   *     responses:
   *       200:
   *         description: Empty.
   */
    this.router.delete('/cards/:id',
      this.authMiddleware.handler(),
      this.cardsController.delete.bind(this.cardsController),
      this.loggerMiddleware.handler('Removido')
    )
  }
}
