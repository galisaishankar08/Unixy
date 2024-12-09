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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("@unixy/db");
const jwtUtils_1 = require("../utils/jwtUtils");
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        // Check if the user already exists
        const existingUser = yield db_1.userService.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password before saving to the database
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Create the new user
        const newUser = yield db_1.userService.createUser(email, hashedPassword, name);
        // Generate a JWT token for the new user
        const token = (0, jwtUtils_1.generateToken)(newUser.id); // Access token
        const refreshToken = (0, jwtUtils_1.generateRefreshToken)(newUser.id); // Refresh token
        // Send response
        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name
            },
            token,
            refreshToken
        });
    }
    catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield db_1.userService.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        if (!user.password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const accessToken = (0, jwtUtils_1.generateToken)(user.id); // Access token
        const refreshToken = (0, jwtUtils_1.generateRefreshToken)(user.id); // Refresh token
        return res.json({ accessToken, refreshToken });
    }
    catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.login = login;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        // Check if user exists
        const user = yield db_1.userService.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Generate a reset token
        const token = (0, jwtUtils_1.generateResetPasswordToken)(user.id);
        // Send email with the reset link
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        yield (0, sendEmail_1.default)(email, 'Password Reset Request', `Reset your password here: ${resetLink}`);
        return res.status(200).json({ message: 'Password reset link sent to your email.' });
    }
    catch (error) {
        console.error('Error in forgotPassword:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, newPassword } = req.body;
        // Verify the token
        const decoded = (0, jwtUtils_1.verifyResetPasswordToken)(token);
        if (decoded === null || decoded === void 0 ? void 0 : decoded.userId) {
            const userId = decoded.userId;
            // Hash the new password
            const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
            // Update the user's password
            yield db_1.userService.updatePassword(userId, hashedPassword);
            return res.status(200).json({ message: 'Password has been reset successfully.' });
        }
        else {
            return res.status(400).json({ message: 'Invalid token' });
        }
    }
    catch (error) {
        console.error('Error in resetPassword:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.resetPassword = resetPassword;
