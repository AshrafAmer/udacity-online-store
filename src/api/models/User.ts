import Client from './../../database/database';
import {User as UserType} from './../types/User';
import bcrypt from 'bcrypt';

export class User {

    async index(): Promise<UserType[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err: unknown) {
            throw new Error(`err: ${err}`);
        }
    }

    async show(id: string): Promise<UserType> {
        try {
        const sql = 'SELECT * FROM users WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }

    async create(b: UserType): Promise<UserType> {
        try {
            const hashed = bcrypt.hashSync(
                b.password + process.env.BCRYPT_PASSWORD, 
                parseInt(process.env.SALT_ROUNDS as string)
             );
            const sql = 'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()
        
            const result = await conn
                .query(sql, [b.firstName, b.lastName, hashed])
        
            const user = result.rows[0]
        
            conn.release()
        
            return user
        } catch (err) {
            throw new Error(`Could not add new user ${b.firstName}. Error: ${err}`)
        }
    }
  
    async delete(id: string): Promise<UserType> {
        try {
      const sql = 'DELETE FROM users WHERE id=($1)'
      // @ts-ignore
      const conn = await Client.connect()
  
      const result = await conn.query(sql, [id])
  
      const book = result.rows[0]
  
      conn.release()
  
      return book
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`)
        }
    }

    async authenticate(username: string, password: string): Promise<User | null> {
        const conn = await Client.connect()
        const sql = 'SELECT password_digest FROM users WHERE username=($1)'
    
        const result = await conn.query(sql, [username])
        const pepper = process.env.BCRYPT_PASSWORD;
        console.log(password+pepper)
    
        if(result.rows.length) {
    
          const user = result.rows[0]
    
          console.log(user)
    
          if (bcrypt.compareSync(password+pepper, user.password_digest)) {
            return user
          }
        }
    
        return null
    }

}
