import supertest from 'supertest';
import app from './../../server';
import {User} from './../../api/models/User';
const request = supertest(app);

describe('Auth Controller Test', () => {
    let userId: number;
    it('register endpoint', async (): Promise<void> => {
        const res = await request.post(
            '/auth/register'
            ).send({
                firstName: 'first name',
                lastName: 'last name',
                username: 'username',
                password: '123456'
            });
        userId = res.body.user.id;
        expect(res.statusCode).toBe(200);
        expect(res.body.user.username).toBe('username');
    });

    it('login endpoint', async (): Promise<void> => {
        const res = await request.post(
            '/auth/login'
            ).send({
                username: 'username',
                password: '123456'
            });
        expect(res.statusCode).toBe(200);
    });

    afterAll(async() => {
        const user = User.createObject() as User;
        await user.delete(userId);
    });
});
