import { Base } from './Base';
import { Order as OrderType } from '../types/Order';

export class Order extends Base {

    protected static instance: Base = new this();
    protected table = 'orders';
    protected createSql = 
        `INSERT INTO orders (user_id, status, total_amount)
        VALUES($1, $2, $3) RETURNING *`;

    protected async createOrder(order: OrderType): Promise<void> {        
        this.setCreateConfig([order.userId, order.status, order.totalAmount]);
    }

    public validate(body: any): void {
        // implemented later
    }

}
