import request from 'supertest';
import http from 'http';
import app from '../app';
import { server } from '../config/config';

const getBasicAuthHeader = () => {
    const token = Buffer.from(`${server.USERNAME}:${server.PASSWORD}`).toString('base64');
    return `Basic ${token}`;
};

describe('Catalog Controller', () => {
    let httpServer: http.Server;

    beforeAll(async () => {
        httpServer = await app.listen(3003); // Use a different port for tests
    });

    afterAll(async () => {
        await httpServer.close(); // Close the server after tests
    });

    it('should get products', async () => {
        const res = await request(app).get('/api/catalog').set('Authorization', getBasicAuthHeader());
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should create a product', async () => {
        const body = {
            name: 'Watch',
            price: 500,
            description: 'Men Watch'
        };
        const res = await request(app).post('/api/catalog').send(body).set('Authorization', getBasicAuthHeader());
        expect(res.status).toBe(201);
        expect(res.body.name).toBe(body.name);
    });

    it('should update a product', async () => {
        const body = {
            name: 'Watch',
            price: 600,
            description: 'Men Watch'
        };
        const res = await request(app).put('/api/catalog/e49e354c-78fb-4265-8bc0-e5c8be710706').send(body).set('Authorization', getBasicAuthHeader());
        expect(res.status).toBe(200);
        expect(res.body.price).toBe(body.price);
    });

    it('should delete a product', async () => {
        const res = await request(app).delete('/api/catalog/e49e354c-78fb-4265-8bc0-e5c8be710706').set('Authorization', getBasicAuthHeader());
        expect(res.status).toBe(200);
    });
});
