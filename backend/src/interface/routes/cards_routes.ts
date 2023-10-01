import { type Router } from 'express'
import { type Middleware } from '../middlewares'
import { type CardsController } from '../controllers/cards_controller'
import { type Schema } from '../middlewares/validator_middleware'
import { cardPostSchema, cardPutSchema } from '../schemas/cards'

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
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 allOf:
   *                 - $ref: '#/components/schemas/Card'
   *                 - type: object
   *                   properties:
   *                     id:
   *                       type: number
   *       401:
   *         description: Not Authorized - Without JWT token or token was expired
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Internal Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
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
   *     requestBody:
   *       description: Card payload
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Card'
   *     responses:
   *       200:
   *         description: Returns the cards list.
   *         content:
   *           application/json:
   *             schema:
   *               allOf:
   *               - $ref: '#/components/schemas/Card'
   *               type: object
   *               properties:
   *                 id:
   *                   type: number
   *       400:
   *         description: Bad Request - Unformatted Body
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       401:
   *         description: Not Authorized - Without JWT token or token was expired
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       409:
   *         description: Conflict - When there is already a card with the same title
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Internal Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
    this.router.post('/cards',
      this.authMiddleware.handler(),
      this.bodyValidatorMiddleware.handler(cardPostSchema),
      this.cardsController.post.bind(this.cardsController)
    )

    /**
   * @openapi
   * /cards/{id}:
   *   put:
   *     summary: Update a card
   *     description: Update a card
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
   *     requestBody:
   *       description: Card payload
   *       content:
   *         application/json:
   *           schema:
   *             allOf:
   *             - $ref: '#/components/schemas/Card'
   *             type: object
   *             properties:
   *               id:
   *                 type: number
   *     responses:
   *       200:
   *         description: Returns the cards list.
   *         content:
   *           application/json:
   *             schema:
   *               allOf:
   *               - $ref: '#/components/schemas/Card'
   *               type: object
   *               properties:
   *                 id:
   *                   type: number
   *       400:
   *         description: Bad Request - Unformatted Body or ID's provided do not match
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       401:
   *         description: Not Authorized - Without JWT token or token was expired
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Internal Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
    this.router.put('/cards/:id',
      this.authMiddleware.handler(),
      this.bodyValidatorMiddleware.handler(cardPutSchema),
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
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *     description: Delete a card
   *     responses:
   *       200:
   *         description: Returns the cards list.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 allOf:
   *                 - $ref: '#/components/schemas/Card'
   *                 - type: object
   *                   properties:
   *                     id:
   *                       type: number
   *       400:
   *         description: Bad Request - Unformatted Body
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       401:
   *         description: Not Authorized - Without JWT token or token was expired
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Internal Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
    this.router.delete('/cards/:id',
      this.authMiddleware.handler(),
      this.cardsController.delete.bind(this.cardsController),
      this.loggerMiddleware.handler('Removido')
    )
  }
}
