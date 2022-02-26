import { Base } from './Base';
import { Product as ProductType } from './../types/Product';

export class Product extends Base {

    protected static instance: Base = new this();
    protected table = 'products';
    protected createSql = 
        `INSERT INTO products (name, price, category_id)
        VALUES($1, $2, $3) RETURNING *`;

    protected async createProduct(product: ProductType): Promise<void> {        
        this.setCreateConfig([product.name, product.price, product.categoryId]);
    }

}
