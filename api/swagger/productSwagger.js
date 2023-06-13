/**
 * @swagger
 * securitySchemes:
 *   BearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: API endpoints for managing products 
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     productResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         vendor:
 *           type: string
 *         price:
 *           type: integer
 *         status:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         __v:
 *           type: integer
 *         currency:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     productRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         vendor:
 *           type: string
 *         price:
 *           type: integer
 *         currency:
 *           type: string
 */

/**
 * @swagger
 * definitions:
 *  ValidateErrorResponse:
 *    type: object
 *    properties:
 *      errors:
 *        type: array
 *        items:
 *            $ref: "#/definitions/productResponse"
 */

/**
 * @swagger
 * definitions:
 *  ErrorResponse:
 *    type: object
 *    properties:
 *      message:
 *        type: string
 */




/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: "#/components/schemas/productRequest"
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/productResponse"
 *       403:
 *         description: Product is already exist
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 *       422:
 *         description: Validate Error
 *       500:
 *         description: Error
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 */
