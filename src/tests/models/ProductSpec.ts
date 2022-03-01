import {Product} from './../../api/models/Product';

const product = Product.createObject() as Product;

describe("Product Model Tests", () => {

    it("should have an index method", () => {
        expect(product.index).toBeDefined();
    });

    it("index method should return list of products", async() => {
        const result = await product.index();
        expect(result).toEqual([]);
    });

    it("create method should create new product", async() => {
        product.createProduct({
            name: 'test product',
            price: '50',
            categoryId: 3,
        });
        const result = await product.create();
        expect(result.price).toEqual(50);
    });

    it("show method should return products data", async() => {
        const products = await product.index();
        const result = await product.show(products[0].id);
        expect(result.price).toEqual(50);
    });

    it("delete method should delete product data", async() => {
        // before delete
        const products = await product.index();
        const productsCount = products.length;
        await product.delete(products[0].id);

        // after delete
        const productsAfterDelete = await product.index();
        const productsCountAfterDelete = productsAfterDelete.length;
        expect(productsCount).toEqual(productsCountAfterDelete + 1);
    });

});
