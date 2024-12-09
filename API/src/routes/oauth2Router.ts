import express from 'express';
import { generateAccessToken, googleAuthCallback } from '../controllers/oauth2Controller';
import passport from 'passport';
import asyncHandler from '../utils/asyncHandler';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: OAuth2
 *   description: Authentication related routes
*/

/**
 * @swagger
 * /api/oauth2/token:
 *   post:
 *     summary: Generate access token
 *     tags: [OAuth2]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Unauthorized
*/
router.get('/token', asyncHandler(generateAccessToken));

/**
 * @swagger
 * /api/oauth2/google:
 *   get:
 *     summary: Google authentication
 *     tags: [OAuth2]
 *     responses:
 *       302:
 *         description: Redirect to Google for authentication
*/
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * @swagger
 * /api/oauth2/google/callback:
 *   get:
 *     summary: Google authentication callback
 *     tags: [OAuth2]
 *     responses:
 *       200:
 *         description: Successful authentication
 *       401:
 *         description: Unauthorized
*/
router.get('/google/callback', passport.authenticate('google', { session: false }), googleAuthCallback);

export default router;