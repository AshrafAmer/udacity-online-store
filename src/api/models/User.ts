import bcrypt from 'bcrypt';
import { Base } from './Base';
import { User as UserType } from './../types/User';
import { ValidationRequiredFieldsError } from '../../errors/ValidationRequiredFieldsError';
import { PasswordValidationError } from '../../errors/PasswordValidationError';

export class User extends Base {

    // By default implemented inside constructor()
    protected static instance: Base = new this();
    protected table = 'users';
    protected createSql = `
        INSERT INTO users (firstName, lastName, username, password)
        VALUES($1, $2, $3, $4) RETURNING *`;

    public async createUser(user: UserType): Promise<void> {
        const hashed = bcrypt.hashSync(
            user.password + process.env.BCRYPT_PASSWORD, 
            parseInt(process.env.SALT_ROUNDS as string)
        );

        this.setCreateConfig([user.firstName, user.lastName, user.username, hashed]);
    }

    async authenticate(username: string, password: string): Promise<UserType | null> {
        const sql = 'SELECT password FROM users WHERE username=($1)'
        const result = await this.runQuery(sql, [username]);
        const pepper = process.env.BCRYPT_PASSWORD;
        console.log(password+pepper)

        if(result.length) {
            const user = result[0]
            console.log(user)
            if (bcrypt.compareSync(password+pepper, user.password)) {
                return user
            }
        }

        return null;
    }

    public validate(body: UserType): void {
        if ( !body.firstName ) {
            throw new ValidationRequiredFieldsError('first name');
        }

        if ( !body.lastName ) {
            throw new ValidationRequiredFieldsError('last name');
        }

        if ( !body.password || body.password.length < 5 ) {
            throw new PasswordValidationError(5);
        }
    }

}
