CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    username VARCHAR(200),
    password VARCHAR(300)
);
