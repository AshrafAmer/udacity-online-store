import supertest from 'supertest';
import app from '../../server';
const request = supertest(app);

describe('User Controller Test', () => {

    it('get all user-all-orders endpoint', async (): Promise<void> => {
        const res = await request.get('/users');
        expect(res.statusCode).toBe(401);
    });

    it('get all user-complete-orders endpoint', async (): Promise<void> => {
        const res = await request.get('/users/3');
        expect(res.statusCode).toBe(401);
    });

    it('create new user endpoint', async (): Promise<void> => {
        const res = await request.post(
            '/users'
            ).send({});
        
        expect(res.statusCode).toBe(401);
    });
});
