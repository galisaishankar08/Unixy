"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const helloRouter_1 = __importDefault(require("./helloRouter"));
const authRouter_1 = __importDefault(require("./authRouter"));
const oauth2Router_1 = __importDefault(require("./oauth2Router"));
const catalogRouter_1 = __importDefault(require("./catalogRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const router = (0, express_1.Router)();
router.use('/healthcheck', helloRouter_1.default);
router.use('/auth', authRouter_1.default);
router.use('/oauth2', oauth2Router_1.default);
router.use('/catalog', catalogRouter_1.default);
router.use('/user', userRouter_1.default);
exports.default = router;
