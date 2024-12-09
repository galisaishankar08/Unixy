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
exports.auth = void 0;
const basic_auth_1 = __importDefault(require("basic-auth"));
const config_1 = require("../config/config");
const auth = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const user = (0, basic_auth_1.default)(req);
        if (!user || user.name !== config_1.server.USERNAME || user.pass !== config_1.server.PASSWORD) {
            res.set('WWW-Authenticate', 'Basic realm="example"');
            return res.status(401).send('Authentication required.');
        }
        console.log('User authenticated:', user.name);
        next();
    });
};
exports.auth = auth;
