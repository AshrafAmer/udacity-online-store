import express, { Request, Response } from 'express';
import { OrderItem } from '../models/OrderItem';
import { OrderItem as OrderItemType } from '../types/OrderItem'; 
import { RequiredParamsIdError } from '../../errors/RequiredParamsIdError';

const orderItemRouter = express.Router();
const orderItemInstance = OrderItem.createObject() as OrderItem;

orderItemRouter.get(
    '/',
    async (req: Request, res: Response) => {
        const items = await orderItemInstance.index();
        res.json(items);
    }
);

orderItemRouter.get(
    '/:id',
    async (req: Request, res: Response) => {
        const id = req.params.id;
        if ( !id ) {
            res.send(new RequiredParamsIdError('order items'));
        }

        try {
            const item = await orderItemInstance.show(id);
            res.status(200).json(item);
        } catch ( err ) {
            res.status(400).send(err);
        }
    }
);

orderItemRouter.post(
    '/',
    async (req: Request, res: Response) => {
        const { productId, orderId, quantity, amount } = req.body;
        
        try {
            const itemDate: OrderItemType = { productId, orderId, quantity, amount };
            await orderItemInstance.validate(itemDate);
            await orderItemInstance.createOrderItem(itemDate);
            const item = await orderItemInstance.create();
            res.status(200).json(item);
        } catch ( err ) {
            res.status(400).send(err);
        }
    }
);

export default orderItemRouter;
