"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
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
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('Hello, World!');
});
exports.default = router;
