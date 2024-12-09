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
exports.getUserProfile = void 0;
const db_1 = require("@unixy/db");
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get user ID from the request (added by `verifyToken`)
        const { userId } = req.body;
        if (!userId) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userResult = yield db_1.userService.getUserById(userId);
        if (!userResult) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = userResult;
        // console.log(user);
        return res.json(user);
    }
    catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getUserProfile = getUserProfile;
