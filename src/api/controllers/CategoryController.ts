import express, { Request, Response } from 'express';
import { Category } from '../models/Category';
import { Category as CategoryType } from '../types/Category'; 
import { RequiredParamsIdError } from '../../errors/RequiredParamsIdError';

const categoryRouter = express.Router();
const categoryInstance = Category.createObject() as Category;

categoryRouter.get(
    '/',
    async (req: Request, res: Response) => {
        const categories = await categoryInstance.index();
        res.json(categories);
    }
);

categoryRouter.get(
    '/:id',
    async (req: Request, res: Response) => {
        const id = req.params.id;
        if ( !id ) {
            res.send(new RequiredParamsIdError('categories'));
        }

        try {
            const category = await categoryInstance.show(id);
            res.status(200).json(category);
        } catch ( err ) {
            res.status(400).send(err);
        }
    }
);

categoryRouter.post(
    '/',
    async (req: Request, res: Response) => {
        const { name } = req.body;
        
        try {
            const categoryDate: CategoryType = { name };
            await categoryInstance.validate(categoryDate);
            await categoryInstance.createCategory(categoryDate);
            const category = await categoryInstance.create();
            res.status(200).json(category);
        } catch ( err ) {
            res.status(400).send(err);
        }
    }
);

export default categoryRouter;
