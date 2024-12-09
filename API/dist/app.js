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
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
require("./config/logging");
require("./middlewares/passport");
const config_1 = require("./config/config");
const logging_1 = __importDefault(require("./config/logging"));
const swagger_1 = __importDefault(require("./middlewares/swagger"));
const routes_1 = __importDefault(require("./routes"));
const corsHandler_1 = require("./middlewares/corsHandler");
const loggingHandler_1 = require("./middlewares/loggingHandler");
const routeNotFound_1 = require("./middlewares/routeNotFound");
// import { PrismaClient } from '@prisma/client';
const db_1 = require("@unixy/db");
const passport_1 = __importDefault(require("passport"));
dotenv_1.default.config();
const app = (0, express_1.default)();
let httpServer;
// Initialize Prisma Client
// const prisma = new PrismaClient();
// Middleware setup
const setupMiddleware = () => {
    logging_1.default.log('----------------------------------------');
    logging_1.default.log('Initializing API Middleware');
    logging_1.default.log('----------------------------------------');
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use(loggingHandler_1.loggingHandler);
    app.use(corsHandler_1.corsHandler);
    // app.use(auth);
    // Initialize Passport for OAuth
    app.use(passport_1.default.initialize());
    // Setup Swagger UI
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
};
// Route setup
const setupRoutes = () => {
    logging_1.default.log('----------------------------------------');
    logging_1.default.log('Defining Controller Routing');
    logging_1.default.log('----------------------------------------');
    app.use('/api', routes_1.default); // Use your defined routes
};
// Error handling
const setupErrorHandling = () => {
    logging_1.default.log('----------------------------------------');
    logging_1.default.log('Defining Routing Error');
    logging_1.default.log('----------------------------------------');
    app.use(routeNotFound_1.routeNotFound);
};
// Start the server
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.log('----------------------------------------');
    logging_1.default.log('Starting Server');
    logging_1.default.log('----------------------------------------');
    try {
        yield db_1.prisma.$connect();
        logging_1.default.log('Connected to the database successfully.');
    }
    catch (error) {
        logging_1.default.error('Error connecting to the database:', error);
        process.exit(1);
    }
    httpServer = http_1.default.createServer(app);
    httpServer.listen(config_1.server.SERVER_PORT, () => {
        logging_1.default.log('----------------------------------------');
        logging_1.default.log(`Server started on ${config_1.server.SERVER_HOSTNAME}:${config_1.server.SERVER_PORT}`);
        logging_1.default.log('----------------------------------------');
    });
});
// Initialization function
const init = () => {
    setupMiddleware();
    setupRoutes();
    setupErrorHandling();
    startServer();
};
// Start the application
init();
// Graceful shutdown handling
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.log('Shutting down server gracefully...');
    yield db_1.prisma.$disconnect();
    httpServer.close(() => {
        logging_1.default.log('Server shut down complete.');
        process.exit(0);
    });
}));
// Export the app instance for testing
exports.default = app;
