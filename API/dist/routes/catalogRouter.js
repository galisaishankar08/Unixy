"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catalogController_1 = require("../controllers/catalogController");
const _0auth2_1 = require("../middlewares/0auth2");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   - name: Catalog
 *     description: API for managing products
 */
/**
 * @swagger
 * /api/catalog/:
 *   get:
 *     tags:
 *       - Catalog
 *     summary: Get all products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of products
 */
router.get('/', (0, asyncHandler_1.default)((0, _0auth2_1.authorize)(['ADMIN', 'USER'])), (0, asyncHandler_1.default)(catalogController_1.getProducts));
/**
 * @swagger
 * /api/catalog/:
 *   post:
 *     tags:
 *       - Catalog
 *     summary: Create a new product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Invalid input
 */
router.post('/', (0, asyncHandler_1.default)((0, _0auth2_1.authorize)(['ADMIN'])), (0, asyncHandler_1.default)(catalogController_1.createProduct));
/**
 * @swagger
 * /api/catalog/{id}:
 *   get:
 *     tags:
 *       - Catalog
 *     summary: Get a product by ID
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get('/:id', (0, asyncHandler_1.default)((0, _0auth2_1.authorize)(['ADMIN', 'USER'])), (0, asyncHandler_1.default)(catalogController_1.getProduct));
/**
 * @swagger
 * /api/catalog/{id}:
 *   put:
 *     tags:
 *       - Catalog
 *     summary: Update a product
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 */
router.put('/:id', (0, asyncHandler_1.default)((0, _0auth2_1.authorize)(['ADMIN'])), (0, asyncHandler_1.default)(catalogController_1.updateProduct));
/**
 * @swagger
 * /api/catalog/{id}:
 *   delete:
 *     tags:
 *       - Catalog
 *     summary: Delete a product
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
router.delete('/:id', (0, asyncHandler_1.default)((0, _0auth2_1.authorize)(['ADMIN'])), (0, asyncHandler_1.default)(catalogController_1.deleteProduct));
exports.default = router;
