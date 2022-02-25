CREATE TABLE order_items(
    id SERIAL PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    amount float(10)
);
