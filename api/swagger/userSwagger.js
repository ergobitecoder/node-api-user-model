
/**
 * @swagger
 * tags:
 *   name: User Registration
 *   description: API endpoints for managing User registration
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     userResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         email:
 *           type: string
 *         mobile:
 *           type: integer
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         password:
 *           type: string
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
 *         refreshToken:
 *           type: string
 *         refreshTokenExp:
 *           type: string
 *           format: date-time
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     userRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     signUpRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         mobile:
 *           type: integer
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     refreshTokenRequest:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         refreshToken:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     refreshTokenResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *         refreshToken:
 *           type: string
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
 * /api/user/login:
 *   post:
 *     summary: To Login user
 *     description: This API is used to log in a user
 *     tags: [User Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/userRequest"
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/userResponse"
 *       403:
 *         description: Username and password don't match
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 *       405:
 *         description: Invalid input
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 *       500:
 *         description: Error
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 */

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Create a new user 
 *     tags: [User Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: "#/components/schemas/signUpRequest"
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/userResponse"
 *       403:
 *         description: Username is existed
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 *       422:
 *         description: Validate Error
 *         
 *       500:
 *         description: Error
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 */

/**
 * @swagger
 * /api/user/refreshToken:
 *   post:
 *     summary: refreshToken 
 *     tags: [User Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: "#/components/schemas/refreshTokenRequest"
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/refreshTokenResponse"
 *       400:
 *         description: Bad request
 *       503:
 *         description: Service unavailable
 */



// /**
//  * @swagger
//  * /api/user/{id}:
//  *   get:
//  *     summary: get user detiails by Id
//  *     tags: [User Registration]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: User ID
//  *         schema:
//  *           type: string
//  *     requestBody:
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/api/models/userModel'
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Successful operation
//  *         content:
//  *           application/json:
//  *             schema:
//  *             $ref: '#/api/models/userModel'
//  *       400:
//  *         description: Bad request
//  *       503:
//  *         description: Service unavailable
//  * securitySchemes:
//  *   BearerAuth:
//  *     type: http
//  *     scheme: bearer
//  *     bearerFormat: JWT
//  */