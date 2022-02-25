CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INT,
    status VARCHAR(10),
    total_amount float(10)
);
