import express, { Request, Response } from 'express';
import { OrderItem } from '../models/OrderItem';
import { OrderItem as OrderItemType } from '../types/OrderItem'; 
import { RequiredParamsIdError } from '../../errors/RequiredParamsIdError';

// maybe don't need it
const orderItemRouter = express.Router();
const orderItemInstance = OrderItem.createObject() as OrderItem;


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
