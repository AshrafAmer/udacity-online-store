import supertest from 'supertest';
import app from '../../server';
import {Category} from '../../api/models/Category';
const request = supertest(app);

describe('Category Controller Test', () => {
    let categoryId: number;
    const category = Category.createObject() as Category;

    it('get all categories endpoint', async (): Promise<void> => {
        const res = await request.get('/categories');
        expect(res.statusCode).toBe(200);
    });

    it('create new category endpoint', async (): Promise<void> => {
        const res = await request.post(
            '/categories'
            ).send({
                name: 'category',
            });
        
        categoryId = res.body.id;
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('category');
    });

    it('get :id category endpoint', async (): Promise<void> => {
        const res = await request.get(`/categories/${categoryId}`);
        expect(res.statusCode).toBe(200);
    });

    afterAll(async() => {
        await category.delete(categoryId);
    });
});
