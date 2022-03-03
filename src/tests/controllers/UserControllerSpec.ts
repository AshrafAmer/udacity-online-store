import supertest from 'supertest';
import app from '../../server';
import {User} from './../../api/models/User';
const request = supertest(app);

describe('User Controller Test', () => {

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
        const res = await request.get('/users').set('_token', authToken);
        expect(res.statusCode).toBe(200);
    });

    it('get all user-complete-orders endpoint', async (): Promise<void> => {
        const res = await request.get(`/users/${userId}`).set('_token', authToken);
        expect(res.statusCode).toBe(200);
    });

    it('create new user endpoint', async (): Promise<void> => {
        const res = await request.post(
            '/users'
            ).set('_token', authToken)
            .send({
                firstName: 'testing user',
                lastName: 'from jasmine',
                username: 'test@jasmine',
                password: '123456',
            });
        
        const currentId = res.body.id;
        expect(res.statusCode).toBe(200);
        await user.delete(currentId);
    });

    afterAll( async() => {
        await user.delete(userId);
    });
});
