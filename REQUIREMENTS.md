### 1. RESTful APIs (Endpoints)

**Categories**: 
- A CREATE route: 'categories' [POST] 
- A READ route: 'categories' [GET] 
- A SHOW route: 'categories/:id' [GET] 


**Products**: 
- A CREATE route: 'products' [POST] 
- A READ route: 'products' [GET] 
- A SHOW route: 'products/:id' [GET] 
- A SHOW route: 'products/top-products' [GET] => top 5 popular products.
- A SHOW route: 'products/by-category/:id' [GET] => return products by category id.


**Users**: 
- endpoint: `0.0.0.0:3000/users`
- A CREATE route: '/' [POST] 
- A READ route: '/' [GET] 
- A SHOW route: '/:id' [GET] 


**Auth**: 
- endpoint: `0.0.0.0:3000/auth`
- A LOGIN - VALIDATE route: '/login' [POST] 
- A REGISTER - CREATE route: '/register' [POST] 

**Orders**: 
- endpoint: `0.0.0.0:3000/orders`
- all user orders: '/user-all-orders/:id' [GET] 
- all user complete orders: '/user-complete-orders/:id' [GET] 


## Database Scheme

categories | #id | #name
--- | --- | ---

products | #id | #name | #price | #category_id
--- | --- | --- | --- | ---

orders | #id | #user_id | #status | #total_amount
--- | --- | --- | --- | ---

order_items | #id | #order_id | #product_id | #quantity | #amount
--- | --- | --- | --- | --- | ---

users | #id | #first_name | #last_name | #username | #password
--- | --- | --- | --- | --- | ---

### 3. Database Relations
 - categories has many products (1-m).
 - orders contain many products (m-m).
 - user create many orders (1-m).

## DataBase Setup:
- host: `127.0.0.1`
- driver: `pg`
- user: `udacity`
- password: `udacityPass`
- DEV database: `online_store`
- TEST database: `online_store_test`

```
> sudo -i -u postgres
> psql 
```

``` 
> CREATE USER udacity WITH PASSWORD 'udacityPass';
```

``` 
> CREATE DATABASE online_store;
```
``` 
> CREATE DATABASE online_store_test;
```

```
> GRANT ALL PRIVILEGES ON DATABASE online_store TO udacity;
> GRANT ALL PRIVILEGES ON DATABASE online_store_test TO udacity;
```

- Run Migrations `yarn run db.migrate`, just follow steps on README.md;

- Open postman and call POST: `0.0.0.0:3000/auth/register` with body: 
``` 
{
    "firstName": "",
    "lastName" : "",
    "username" : "",
    "password" : "",
}
```

- Response user data and `token` => use this token to access routes that need token.
