import supertest from 'supertest';
import app from '../../server';
const request = supertest(app);

describe('Product Controller Test', () => {

    it('get all products endpoint', async (): Promise<void> => {
        const res = await request.get('/products');
        expect(res.statusCode).toBe(200);
    });

    it('get products by category id endpoint', async (): Promise<void> => {
        const res = await request.get('/products/by-category/3');
        expect(res.statusCode).toBe(200);
    });

    it('create new product endpoint', async (): Promise<void> => {
        const res = await request.post(
            '/products'
            ).send({
                name: 'prod'
            });
        
        expect(res.statusCode).toBe(401);
    });

    it('get :id products endpoint', async (): Promise<void> => {
        const res = await request.get(`/products/1`);
        expect(res.statusCode).toBe(400);
    });

});
