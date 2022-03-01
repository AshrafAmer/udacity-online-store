import {OrderItem} from '../../api/models/OrderItem';

const orderItem = OrderItem.createObject() as OrderItem;

describe("OrderItem Model Tests", () => {

    it("should have an index method", () => {
        expect(orderItem.index).toBeDefined();
    });

    it("index method should return list of OrderItems", async() => {
        const result = await orderItem.index();
        expect(result).toEqual([]);
    });

    it("create method should create new OrderItem", async() => {
        orderItem.createOrderItem({
            orderId: 1,
            productId: 1,
            quantity: 5,
            amount: 1300,
        });
        const result = await orderItem.create();
        expect(result.amount).toEqual(1300);
    });

    it("show method should return OrderItem data", async() => {
        const OrderItems = await orderItem.index();
        const result = await orderItem.show(OrderItems[0].id);
        expect(result.amount).toEqual(1300);
    });

    it("delete method should delete OrderItem data", async() => {
        // before delete
        const OrderItems = await orderItem.index();
        const OrderItemsCount = OrderItems.length;
        await orderItem.delete(OrderItems[0].id);

        // after delete
        const OrderItemsAfterDelete = await orderItem.index();
        const OrderItemsCountAfterDelete = OrderItemsAfterDelete.length;
        expect(OrderItemsCount).toEqual(OrderItemsCountAfterDelete + 1);
    });

});
