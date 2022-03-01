import {Category} from '../../api/models/Category';

const category = Category.createObject() as Category;

describe("category Model Tests", () => {

    it("should have an index method", () => {
        expect(category.index).toBeDefined();
    });

    it("index method should return list of categories", async() => {
        const result = await category.index();
        expect(result).toEqual([]);
    });

    it("create method should create new category", async() => {
        category.createCategory({
            name: 'category',
        });
        const result = await category.create();
        expect(result.name).toEqual('category');
    });

    it("show method should return category data", async() => {
        const categories = await category.index();
        const result = await category.show(categories[0].id);
        expect(result.name).toEqual('category');
    });

    it("delete method should delete category data", async() => {
        // before delete
        const categories = await category.index();
        const categoriesCount = categories.length;
        await category.delete(categories[0].id);

        // after delete
        const categoriesAfterDelete = await category.index();
        const categoriesCountAfterDelete = categoriesAfterDelete.length;
        expect(categoriesCount).toEqual(categoriesCountAfterDelete + 1);
    });

});
