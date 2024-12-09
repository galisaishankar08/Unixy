"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const oauth2Controller_1 = require("../controllers/oauth2Controller");
const passport_1 = __importDefault(require("passport"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const router = express_1.default.Router();
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
router.get('/token', (0, asyncHandler_1.default)(oauth2Controller_1.generateAccessToken));
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
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
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
router.get('/google/callback', passport_1.default.authenticate('google', { session: false }), oauth2Controller_1.googleAuthCallback);
exports.default = router;
