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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const db_1 = require("@unixy/db");
const jwtUtils_1 = require("../utils/jwtUtils");
const authorize = (roles = []) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Get the token from the Authorization header
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Authorization token is required' });
            }
            const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"
            // Verify the token
            const decoded = (0, jwtUtils_1.verifyToken)(token);
            // Attach the user information to the request for downstream use
            if (decoded) {
                const user = yield db_1.userService.getUserById(decoded.userId);
                if (user) {
                    const { password } = user, userWithoutPassword = __rest(user, ["password"]);
                    req.user = Object.assign({}, userWithoutPassword);
                    // Check if the user's role is authorized
                    if (roles.length && !roles.includes(user.role)) {
                        return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
                    }
                }
                else {
                    return res.status(404).json({ message: 'User not found' });
                }
            }
            else {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }
            next(); // Proceed to the next middleware or controller
        }
        catch (error) {
            console.error('Token verification failed:', error);
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
    });
};
exports.authorize = authorize;
