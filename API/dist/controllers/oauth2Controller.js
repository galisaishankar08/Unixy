"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuthCallback = exports.generateAccessToken = void 0;
const db_1 = require("@unixy/db");
const jwtUtils_1 = require("../utils/jwtUtils");
const generateAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { refreshToken } = req.body;
        // Get the token from the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token is required' });
        }
        const refreshToken = authHeader.split(' ')[1]; // Extract the token after "Bearer"
        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token is required' });
        }
        // Verify the refresh token
        const decoded = (0, jwtUtils_1.verifyRefreshToken)(refreshToken);
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }
        // Generate a new access token
        const newAccessToken = (0, jwtUtils_1.generateToken)(decoded.userId);
        return res.json({ token: newAccessToken });
    }
    catch (error) {
        console.error('Error refreshing token:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.generateAccessToken = generateAccessToken;
const googleAuthCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, googleId, name } = req.user;
    let user = yield db_1.userService.getUserByGoogleId(googleId);
    if (!user) {
        user = yield db_1.userService.createUserWithGoogle(email, googleId, name);
    }
    const accessToken = (0, jwtUtils_1.generateToken)(user.id); // Access token
    const refreshToken = (0, jwtUtils_1.generateRefreshToken)(user.id); // Refresh token
    res.json({ accessToken, refreshToken });
});
exports.googleAuthCallback = googleAuthCallback;
