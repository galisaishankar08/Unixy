"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const _0auth2_1 = require("../middlewares/0auth2");
const userController_1 = require("../controllers/userController");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const router = express_1.default.Router();
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
router.get('/profile', (0, asyncHandler_1.default)((0, _0auth2_1.authorize)(['USER', 'ADMIN'])), (0, asyncHandler_1.default)(userController_1.getUserProfile));
exports.default = router;
