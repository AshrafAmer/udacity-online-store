import jwt from 'jsonwebtoken';
import express, { NextFunction, Request, Response } from 'express';
import { Product } from '../models/Product';
import { Product as ProductType } from '../types/Product'; 
import { RequiredParamsIdError } from '../../errors/RequiredParamsIdError';
import { validateAuth } from '../../middlewares/authMiddleware';

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
        try {
            const products = await productInstance.topFive();
            res.json(products);
        } catch ( err ) {
            res.status(400).send(err);
        }
    }
);

productRouter.get(
    '/by-category/:id',
    async (req: Request, res: Response) => {
        const id = req.params.id;
        if ( !id ) {
            return res.status(400).send(new RequiredParamsIdError('products'));
        }
        
        try {
            const products = await productInstance.byCategoryId(id);
            res.json(products);
        } catch ( err ) {
            res.status(400).send(err);
        }
    }
);

productRouter.get(
    '/:id',
    async (req: Request, res: Response) => {
        const id = req.params.id;
        if ( !id ) {
            return res.status(400).send(new RequiredParamsIdError('products'));
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
    async (req: Request, res: Response, next: NextFunction) => { 
        try {
            jwt.verify(`${req.headers._token}`, `${process.env.JWT_TOKEN_SECRET}`);
        } catch (err) {
            return res.status(401).json({message: 'un-authorized user'});
        }

        try {
            await validateAuth(req, res, next);
            const { name, price, categoryId } = req.body;

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
