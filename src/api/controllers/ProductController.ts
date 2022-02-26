import express, { Request, Response } from 'express';
import { Product } from '../models/Product';
import { Product as ProductType } from '../types/Product'; 
import { RequiredParamsIdError } from '../../errors/RequiredParamsIdError';

const productRouter = express.Router();
const productInstance = Product.createObject() as Product;

productRouter.get(
    '/',
    async (req: Request, res: Response) => {
        const products = await productInstance.index();
        res.json(products);
    }
);

productRouter.get(
    '/top-products',
    async (req: Request, res: Response) => {
        const products = await productInstance.topFive();
        res.json(products);
    }
);

productRouter.get(
    '/by-category/:id',
    async (req: Request, res: Response) => {
        const id = req.params.id;
        if ( !id ) {
            res.send(new RequiredParamsIdError('products'));
        }
        const products = await productInstance.byCategoryId(id);
        res.json(products);
    }
);

productRouter.get(
    '/:id',
    async (req: Request, res: Response) => {
        const id = req.params.id;
        if ( !id ) {
            res.send(new RequiredParamsIdError('products'));
        }

        try {
            const product = await productInstance.show(id);
            res.status(200).json(product);
        } catch ( err ) {
            res.status(400).send(err);
        }
    }
);

productRouter.post(
    '/',
    async (req: Request, res: Response) => {
        const { name, price, categoryId } = req.body;
        
        try {
            const productDate: ProductType = { name, price, categoryId };
            await productInstance.validate(productDate);
            await productInstance.createProduct(productDate);
            const product = await productInstance.create();
            res.status(200).json(product);
        } catch ( err ) {
            res.status(400).send(err);
        }
    }
);

export default productRouter;
