import {User as UserType} from './../../api/types/User';
import {User} from './../../api/models/User';

const user = new User();

describe("User Model Tests", () => {
    it("should have an index method", () => {
        expect(user.index).toBeDefined();
    });

    it("index method should return list of users", async() => {
        const result = await user.index();
        expect(result).toEqual([]);
    });
});