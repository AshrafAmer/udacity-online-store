import {User} from './../../api/models/User';

const user = User.createObject() as User;

describe("User Model Tests", () => {

    it("should have an index method", () => {
        expect(user.index).toBeDefined();
    });

    it("index method should return list of users", async() => {
        const result = await user.index();
        expect(result).toEqual([]);
    });

    it("create method should create new user", async() => {
        user.createUser({
            firstName: 'testing user',
            lastName: 'from jasmine',
            username: 'test@jasmine',
            password: '123456',
        });
        const result = await user.create();
        expect(result.username).toEqual('test@jasmine');
    });

    it("show method should return users data", async() => {
        const users = await user.index();
        const result = await user.show(users[0].id);
        expect(result.username).toEqual('test@jasmine');
    });

    it("delete method should delete user data", async() => {
        // before delete
        const users = await user.index();
        const usersCount = users.length;
        const result = await user.delete(users[0].id);

        // after delete
        const usersAfterDelete = await user.index();
        const usersCountAfterDelete = usersAfterDelete.length;
        expect(usersCount).toEqual(usersCountAfterDelete + 1);
    });

});
