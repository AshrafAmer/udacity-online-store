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
- A CREATE route: 'users' [POST] 
- A READ route: 'users' [GET] 
- A SHOW route: 'users/:id' [GET] 


**Auth**: 
- A LOGIN route: 'auth/login' [POST] 

**Orders**: 
- all user orders: 'orders/user-all-orders/:id' [GET] 
- all user complete orders: 'orders/user-complete-orders/:id' [GET] 


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
