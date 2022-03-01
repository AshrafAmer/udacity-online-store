# Storefront Backend Project

## Getting Started (How it works)

1- Clone this project to your machine.
<br>
2- Copy `.env.example` to `.env`.
<br>
3- Configure `.env` variables.
<br>
4- Configure database in `src/database/config` for `prod`, `dev` and `test`.
<br>
5- Run command `yarn db.migrate` to create database tables.
<br>
6- Run `yarn test` to test database models.
<br>
7- create seed user to be able to use APIs which required auth.
<br>
8- Run `yarn start` to build project and run server.
 


## Used Technologies
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Server Config:
- PORT: `3000`
- Server run on Address: `0.0.0.0:3000`