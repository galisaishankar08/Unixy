import express from 'express';
import { authorize } from '../middlewares/0auth2';
import { getUserProfile } from '../controllers/userController';
import asyncHandler from '../utils/asyncHandler';

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
*/

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Retrieve the profile of the authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                 email:
 *                   type: string
 *                   description: The user's email
 *       401:
 *         description: Unauthorized, invalid or missing access token
 *       500:
 *         description: Internal server error
*/
// Protected route: requires a valid access token
router.get('/profile', asyncHandler(authorize(['USER', 'ADMIN'])), asyncHandler(getUserProfile));

export default router;