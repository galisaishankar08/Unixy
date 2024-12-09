"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.PASSWORD = exports.USERNAME = exports.SERVER_PORT = exports.SERVER_HOSTNAME = exports.TEST = exports.DEVELOPMENT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DEVELOPMENT = process.env.NODE_ENV === 'development';
exports.TEST = process.env.NODE_ENV === 'test';
exports.SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
exports.SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 12345;
exports.USERNAME = process.env.SERVER_USERNAME;
exports.PASSWORD = process.env.SERVER_PASSWORD;
exports.server = {
    SERVER_HOSTNAME: exports.SERVER_HOSTNAME,
    SERVER_PORT: exports.SERVER_PORT,
    USERNAME: exports.USERNAME,
    PASSWORD: exports.PASSWORD
};