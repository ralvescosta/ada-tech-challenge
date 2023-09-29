import { type Router } from 'express'
import { type Middleware } from '../middlewares'
import { type CardsController } from '../controllers/cards_controller'
import { type Schema } from '../middlewares/validator'

export default (
  { router, authMiddleware, bodyValidatorMiddleware, cardsController }:
  { router: Router, authMiddleware: Middleware<never>, bodyValidatorMiddleware: Middleware<Schema>, cardsController: CardsController }
): void => {
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
  router.get(
    '/cards',
    authMiddleware.handler(),
    cardsController.listAllCards.bind(cardsController)
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
  router.post('/cards',
    authMiddleware.handler(),
    bodyValidatorMiddleware.handler({ a: 1 }),
    cardsController.createCard.bind(cardsController)
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
  router.put('/cards/:id',
    authMiddleware.handler(),
    bodyValidatorMiddleware.handler({ a: 1 }),
    cardsController.updateCard.bind(cardsController)
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
  router.delete('/cards/:id',
    authMiddleware.handler(),
    cardsController.deleteCard.bind(cardsController)
  )
}
