import supertest from 'supertest';
import app from '../../server';
const request = supertest(app);

describe('Order Controller Test', () => {

    it('get all user-all-orders endpoint', async (): Promise<void> => {
        const res = await request.get('/orders/user-all-orders/5');
        expect(res.statusCode).toBe(401);
    });

    it('get all user-complete-orders endpoint', async (): Promise<void> => {
        const res = await request.get('/orders/user-complete-orders/5');
        expect(res.statusCode).toBe(401);
    });
});
