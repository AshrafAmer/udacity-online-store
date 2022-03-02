import express, { Request, Response } from 'express';
import { Order } from '../models/Order';
import { RequiredParamsIdError } from '../../errors/RequiredParamsIdError';

const orderRouter = express.Router();
const productInstance = Order.createObject() as Order;

orderRouter.get(
    '/user-all-orders/:id',
    async (req: Request, res: Response) => {
        const id = req.params.id;
        if ( !id ) {
            return res.send(new RequiredParamsIdError('orders'));
        }
        try {
            const orders = await productInstance.allUserOrders(id);
            res.json(orders);
        } catch (err) {
            return res.status(400).json(err);
        }
    }
);

orderRouter.get(
    '/user-complete-orders/:id',
    async (req: Request, res: Response) => {
        const id = req.params.id;
        if ( !id ) {
            return res.send(new RequiredParamsIdError('orders'));
        }

        try {
            const orders = await productInstance.userCompletedOrders(id);
            res.json(orders);
        } catch (err) {
            return res.status(400).json(err);
        }
    }
);

export default orderRouter;
