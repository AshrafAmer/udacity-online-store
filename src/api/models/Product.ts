import { Base } from './Base';
import { Product as ProductType } from './../types/Product';
import { ValidationRequiredFieldsError } from '../../errors/ValidationRequiredFieldsError';

export class Product extends Base {

    protected static instance: Base = new this();
    protected table = 'products';
    protected createSql = 
        `INSERT INTO products (name, price, category_id)
        VALUES($1, $2, $3) RETURNING *`;

    public async createProduct(product: ProductType): Promise<void> {
        this.setCreateConfig([product.name, product.price, product.categoryId]);
    }

    public async topFive(): Promise<Product[]> {
        // most popular => most ordered...
        const sql = `SELECT products.*, count(order_items.product_id) as popular
            FROM products
            INNER JOIN order_items
            ON products.id = order_items.product_id
            order by popular desc limit 5`;
        const result = await this.runQuery(sql);
        return result;
    }

    public async byCategoryId(categoryId: string): Promise<void> {
        const sql = 'select * from products WHERE category_id=($1)';
        const result = await this.runQuery(sql, [categoryId]);
        return result;
    }

    public validate(body: ProductType): void {
        if ( !body.name ) {
            throw new ValidationRequiredFieldsError('product name');
        }

        if ( !body.price ) {
            throw new ValidationRequiredFieldsError('product price');
        }

        if ( !body.categoryId ) {
            throw new ValidationRequiredFieldsError('product category id');
        }
    }

}
