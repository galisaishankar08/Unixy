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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const config_1 = require("../config/config");
const getBasicAuthHeader = () => {
    const token = Buffer.from(`${config_1.server.USERNAME}:${config_1.server.PASSWORD}`).toString('base64');
    return `Basic ${token}`;
};
describe('Catalog Controller', () => {
    let httpServer;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        httpServer = yield app_1.default.listen(3003); // Use a different port for tests
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield httpServer.close(); // Close the server after tests
    }));
    it('should get products', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get('/api/catalog').set('Authorization', getBasicAuthHeader());
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    }));
    it('should create a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {
            name: 'Watch',
            price: 500,
            description: 'Men Watch'
        };
        const res = yield (0, supertest_1.default)(app_1.default).post('/api/catalog').send(body).set('Authorization', getBasicAuthHeader());
        expect(res.status).toBe(201);
        expect(res.body.name).toBe(body.name);
    }));
    it('should update a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {
            name: 'Watch',
            price: 600,
            description: 'Men Watch'
        };
        const res = yield (0, supertest_1.default)(app_1.default).put('/api/catalog/e49e354c-78fb-4265-8bc0-e5c8be710706').send(body).set('Authorization', getBasicAuthHeader());
        expect(res.status).toBe(200);
        expect(res.body.price).toBe(body.price);
    }));
    it('should delete a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).delete('/api/catalog/e49e354c-78fb-4265-8bc0-e5c8be710706').set('Authorization', getBasicAuthHeader());
        expect(res.status).toBe(200);
    }));
});
