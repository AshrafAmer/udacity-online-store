import supertest from 'supertest';
import app from '../../server';
import {User} from './../../api/models/User';
const request = supertest(app);

describe('Order Controller Test', () => {

    let authToken: string;
    let userId: number;
    const user = User.createObject() as User;
    beforeAll( async() => {
        const res = await request.post(
            '/auth/register'
            ).send({
                firstName: 'first name',
                lastName: 'last name',
                username: 'username',
                password: '123456'
            });

        authToken = res.body.token;
        userId = res.body.user.id;
    });

    it('get all user-all-orders endpoint', async (): Promise<void> => {
        const res = await request.get('/orders/user-all-orders/5').set('_token', authToken);
        expect(res.statusCode).toBe(200);
    });

    it('get all user-complete-orders endpoint', async (): Promise<void> => {
        const res = await request.get('/orders/user-complete-orders/5').set('_token', authToken);
        expect(res.statusCode).toBe(200);
    });

    afterAll( async() => {
        await user.delete(userId);
    });
});
