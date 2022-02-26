import { Base } from './Base';
import { Category as CategoryType } from '../types/Category';
import { ValidationRequiredFieldsError } from '../../errors/ValidationRequiredFieldsError';

export class Category extends Base {

    protected static instance: Base = new this();
    protected table = 'categories';
    protected createSql = 
        `INSERT INTO categories (name) VALUES($1) RETURNING *`;

    public async createCategory(category: CategoryType): Promise<void> {        
        this.setCreateConfig([category.name]);
    }

    public validate(body: CategoryType): void {
        if ( !body.name ) {
            throw new ValidationRequiredFieldsError('category name');
        }
    }

}
