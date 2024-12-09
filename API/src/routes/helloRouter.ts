import { Router, Request, Response } from 'express';

/**
 * @swagger
 * /api/healthcheck:
 *   get:
 *     summary: Returns a greeting message
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello, World!
 */
const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

export default router;
