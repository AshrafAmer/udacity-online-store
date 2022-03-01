import { QueryResult } from 'pg';
import { NoExistDataForThisIdError } from '../../errors/NoExistDataForThisIdError';
import Client from './../../database/database';

export abstract class Base {

    protected static instance: Base;
    protected abstract table: string;
    protected abstract createSql: string;
    public abstract validate(body: any): void;
    private createConfig: any[] = [];

    public static createObject(): Base {
        return this.instance;
    }

    public async index(): Promise<any[]> {
        const indexSql = `SELECT * FROM ${this.table}`;
        const result = await this.runQuery(indexSql);
        return result;
    }

    public async show(id: string|number): Promise<any> {
        const showSql = `SELECT * FROM ${this.table} WHERE id=($1)`;
        const result = await this.runQuery(showSql, [id]);
        if ( !result.length ) {
            throw new NoExistDataForThisIdError(this.table, id);
        }
        return result[0];
    }

    public async create(): Promise<any> {
        const options = await this.getCreateConfig();
        const result = await this.runQuery(this.createSql, options);
        return result[0];
    }

    public async delete(id: string|number): Promise<any> {
        const deleteSql = `DELETE FROM ${this.table} WHERE id=($1)`;
        const result = await this.runQuery(deleteSql, [id]);
        return result[0];
    }

    protected async setCreateConfig(options: any[]): Promise<void>{
        this.createConfig = options;
    }

    private async getCreateConfig(): Promise<any[]>{
        return this.createConfig;
    }

    protected async runQuery(sql: string, options?: any[]): Promise<any> {
        try {
            const connection = await Client.connect();
            let result: QueryResult;

            if ( options?.length ) {
                result = await connection.query(sql, options);
            } else {
                result = await connection.query(sql);
            }

            connection.release();
            return result.rows;
        } catch (err: unknown) {
            throw new Error(`err: ${err}`);
        }
    }

}