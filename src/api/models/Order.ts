import { Base } from './Base';
import { Order as OrderType } from '../types/Order';
import { ValidationRequiredFieldsError } from '../../errors/ValidationRequiredFieldsError';

export class Order extends Base {

    protected static instance: Base = new this();
    protected table = 'orders';
    protected createSql = 
        `INSERT INTO orders (user_id, status, total_amount)
        VALUES($1, $2, $3) RETURNING *`;

    public async createOrder(order: OrderType): Promise<void> {        
        this.setCreateConfig([order.userId, order.status, order.totalAmount]);
    }

    public async allUserOrders(userId: string): Promise<Order[]> {
        const sql = `SELECT orders.*, items.quantity, items.amount, items.product_id
            FROM orders
            INNER JOIN order_items As items
            ON orders.id = items.order_id
            WHERE orders.user_id=($1)`;
        const result = await this.runQuery(sql, [userId]);
        return result;
    }

    public async userCompletedOrders(userId: string): Promise<Order[]> {
        const sql = `SELECT orders.*, items.quantity, items.amount, items.product_id
        FROM orders
        INNER JOIN order_items As items
        ON orders.id = items.order_id
        WHERE orders.user_id=($1) AND orders.status=($2)`;
        
        const result = await this.runQuery(sql, [userId, 'complete']);
        return result;
    }

    public validate(body: OrderType): void {
        if ( !body.userId ) {
            throw new ValidationRequiredFieldsError('user id');
        }

        if ( !body.status ) {
            throw new ValidationRequiredFieldsError('status');
        }

        if ( !body.totalAmount ) {
            throw new ValidationRequiredFieldsError('total amount');
        }
    }

}
