import supertest from 'supertest';
import app from '../../server';
import {User} from './../../api/models/User';
import {Product} from './../../api/models/Product';
const request = supertest(app);

describe('Product Controller Test', () => {

    let authToken: string;
    let userId: number;
    let productId: number;
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

    it('get all products endpoint', async (): Promise<void> => {
        const res = await request.get('/products');
        expect(res.statusCode).toBe(200);
    });

    it('get products by category id endpoint', async (): Promise<void> => {
        const res = await request.get('/products/by-category/3');
        expect(res.statusCode).toBe(200);
    });

    it('create new product endpoint', async (): Promise<void> => {
        const res = await request.post('/products')
            .set('_token', authToken)
            .send({
                name: 'test product',
                price: '50',
                categoryId: 3,
            });
        
        productId = res.body.id;
        expect(res.statusCode).toBe(200);
    });

    it('get :id products endpoint', async (): Promise<void> => {
        const res = await request.get(`/products/${productId}`);
        expect(res.statusCode).toBe(200);
    });

    afterAll(async () => {
        const product = Product.createObject() as Product;
        await user.delete(userId);
        await product.delete(productId);
    });

});
