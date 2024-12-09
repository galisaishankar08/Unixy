import { Router } from 'express';
import { getProducts, createProduct, getProduct, updateProduct, deleteProduct} from '../controllers/catalogController';
import { authorize } from '../middlewares/0auth2';
import asyncHandler from '../utils/asyncHandler';
const router = Router();

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
router.get('/', asyncHandler(authorize(['ADMIN', 'USER'])), asyncHandler(getProducts));

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
router.post('/', asyncHandler(authorize(['ADMIN'])), asyncHandler(createProduct));

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
router.get('/:id', asyncHandler(authorize(['ADMIN', 'USER'])), asyncHandler(getProduct));

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
router.put('/:id', asyncHandler(authorize(['ADMIN'])), asyncHandler(updateProduct));

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
router.delete('/:id', asyncHandler(authorize(['ADMIN'])), asyncHandler(deleteProduct));

export default router;
