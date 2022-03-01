import {Order} from '../../api/models/Order';
import { Status } from '../../api/types/Order';

const order = Order.createObject() as Order;

describe("order Model Tests", () => {

    it("should have an index method", () => {
        expect(order.index).toBeDefined();
    });

    it("index method should return list of orders", async() => {
        const result = await order.index();
        expect(result).toEqual([]);
    });

    it("create method should create new order", async() => {
        order.createOrder({
            userId: '1',
            status: Status.active,
            totalAmount: 120,
        });
        const result = await order.create();
        expect(result.total_amount).toEqual(120);
    });

    it("show method should return order data", async() => {
        const orders = await order.index();
        const result = await order.show(orders[0].id);
        expect(result.total_amount).toEqual(120);
    });

    it("delete method should delete order data", async() => {
        // before delete
        const orders = await order.index();
        const ordersCount = orders.length;
        await order.delete(orders[0].id);

        // after delete
        const ordersAfterDelete = await order.index();
        const ordersCountAfterDelete = ordersAfterDelete.length;
        expect(ordersCount).toEqual(ordersCountAfterDelete + 1);
    });

});
