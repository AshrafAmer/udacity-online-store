import { Base } from './Base';
import { OrderItem as OrderItemType } from '../types/OrderItem';
import { ValidationRequiredFieldsError } from '../../errors/ValidationRequiredFieldsError';
import { CalculateAmountError } from '../../errors/CalculateAmountError';

export class OrderItem extends Base {

    protected static instance: Base = new this();
    protected table = 'order_items';
    protected createSql = 
        `INSERT INTO order_items (order_id, product_id, quantity, amount)
        VALUES($1, $2, $3) RETURNING *`;

    public async createOrderItem(item: OrderItemType): Promise<void> {        
        this.setCreateConfig([item.orderId, item.productId, item.quantity, item.amount]);
    }

    public validate(body: OrderItemType): void {
        if ( !body.orderId ) {
            throw new ValidationRequiredFieldsError('order id');
        }

        if ( !body.productId ) {
            throw new ValidationRequiredFieldsError('product id');
        }

        if ( !body.quantity || body.quantity <= 0 ) {
            throw new ValidationRequiredFieldsError('quantity');
        }

        if ( !body.amount || body.quantity <= 0) {
            throw new CalculateAmountError();
        }
    }

}
