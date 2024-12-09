import swaggerJsDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with TypeScript',
            version: '1.0.0',
            description: 'API documentation for my Express app'
        },
        components: {
            securitySchemes: {
                BasicAuth: {
                    type: 'http',
                    scheme: 'basic'
                },
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT' // Optional, helps to clarify the type of Bearer token
                }
            }
        },
        security: [
            {
                BasicAuth: [] // Apply BasicAuth globally to all routes, but can be overridden per route
            }
        ]
    },
    apis: ['./src/routes/*.ts'] // Adjust the path according to your project structure
};

const swaggerSpec = swaggerJsDoc(options);
export default swaggerSpec;
