import express, { Request, Response } from 'express';
import { Order } from '../models/Order';
import { Order as OrderType } from '../types/Order'; 
import { RequiredParamsIdError } from '../../errors/RequiredParamsIdError';

const orderRouter = express.Router();
const productInstance = Order.createObject() as Order;

orderRouter.get(
    '/user-all-orders/:id',
    async (req: Request, res: Response) => {
        const id = req.params.id;
        if ( !id ) {
            res.send(new RequiredParamsIdError('orders'));
        }
        const orders = await productInstance.allUserOrders(id);
        res.json(orders);
    }
);

orderRouter.get(
    '/user-complete-orders/:id',
    async (req: Request, res: Response) => {
        const id = req.params.id;
        if ( !id ) {
            res.send(new RequiredParamsIdError('orders'));
        }
        const orders = await productInstance.userCompletedOrders(id);
        res.json(orders);
    }
);

export default orderRouter;
