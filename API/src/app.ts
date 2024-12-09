import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import './config/logging';
import './middlewares/passport';
import { server } from './config/config';
import logging from './config/logging';
import swaggerSpec from './middlewares/swagger';
import routes from './routes';
import { corsHandler } from './middlewares/corsHandler';
import { loggingHandler } from './middlewares/loggingHandler';
import { routeNotFound } from './middlewares/routeNotFound';
import { auth } from './middlewares/basicAuth';

// import { PrismaClient } from '@prisma/client';
import { prisma } from '@unixy/db';
import passport from 'passport';

dotenv.config();

const app = express();
let httpServer: http.Server;

// Initialize Prisma Client
// const prisma = new PrismaClient();

// Middleware setup
const setupMiddleware = () => {
    logging.log('----------------------------------------');
    logging.log('Initializing API Middleware');
    logging.log('----------------------------------------');

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(loggingHandler);
    app.use(corsHandler);
    // app.use(auth);

    // Initialize Passport for OAuth
    app.use(passport.initialize());

    // Setup Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

// Route setup
const setupRoutes = () => {
    logging.log('----------------------------------------');
    logging.log('Defining Controller Routing');
    logging.log('----------------------------------------');

    app.use('/api', routes); // Use your defined routes
};

// Error handling
const setupErrorHandling = () => {
    logging.log('----------------------------------------');
    logging.log('Defining Routing Error');
    logging.log('----------------------------------------');

    app.use(routeNotFound);
};

// Start the server
const startServer = async () => {
    logging.log('----------------------------------------');
    logging.log('Starting Server');
    logging.log('----------------------------------------');

    try {
        await prisma.$connect();
        logging.log('Connected to the database successfully.');
    } catch (error) {
        logging.error('Error connecting to the database:', error);
        process.exit(1);
    }

    httpServer = http.createServer(app);
    httpServer.listen(server.SERVER_PORT, () => {
        logging.log('----------------------------------------');
        logging.log(`Server started on ${server.SERVER_HOSTNAME}:${server.SERVER_PORT}`);
        logging.log('----------------------------------------');
    });
};

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
process.on('SIGINT', async () => {
    logging.log('Shutting down server gracefully...');
    await prisma.$disconnect();
    httpServer.close(() => {
        logging.log('Server shut down complete.');
        process.exit(0);
    });
});

// Export the app instance for testing
export default app;
