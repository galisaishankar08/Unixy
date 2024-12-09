"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyResetPasswordToken = exports.generateResetPasswordToken = exports.verifyRefreshToken = exports.verifyToken = exports.generateRefreshToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret';
// Generate an access token
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, { expiresIn: '15m' });
};
exports.generateToken = generateToken;
// Generate a refresh token
const generateRefreshToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};
exports.generateRefreshToken = generateRefreshToken;
// Verify the access token
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
// Verify the refresh token
const verifyRefreshToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, REFRESH_TOKEN_SECRET);
    }
    catch (error) {
        return null;
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
// Generate a Reset Password Token
const generateResetPasswordToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, process.env.RESET_PASSWORD_SECRET || 'your_reset password_secret', { expiresIn: '1h' });
};
exports.generateResetPasswordToken = generateResetPasswordToken;
// verify the Reset Password Token
const verifyResetPasswordToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, process.env.RESET_PASSWORD_SECRET || 'your_reset password_secret');
    }
    catch (error) {
        return null;
    }
};
exports.verifyResetPasswordToken = verifyResetPasswordToken;
