import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DATABASE,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    TEST_POSTGRES_HOST,
    TEST_POSTGRES_DATABASE,
    TEST_POSTGRES_USER,
    TEST_POSTGRES_PASSWORD,
    ENV,
} = process.env;

let client =  new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DATABASE,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
});

if (ENV === 'test') {
    client = new Pool({
        host: TEST_POSTGRES_HOST,
        database: TEST_POSTGRES_DATABASE,
        user: TEST_POSTGRES_USER,
        password: TEST_POSTGRES_PASSWORD,
    });
}

export default client;
