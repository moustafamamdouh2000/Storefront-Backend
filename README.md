# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

### Getting Started

simply run npm i , to install the required technologies mentioned above.
after that you need to create the .env file in the root folder and put these variables inside it:

- PGHOST=localhost
- PGDATABASE_DEV=storefront
- PGDATABASE_TEST=storefront_test
- PGUSER=postgres
- PGPASSWORD=postgres
- BCRYPT_PASSWORD=front
- SALT_ROUNDS=5
- TOKEN_SECRET=store
- NODE_ENV=dev

Note: these variables can be whatever value u need depending on ur configuration , the above is just an example

after creating the file and adjusting the variables , you need to create the database mentioned in this variable `PGDATABASE_DEV` & `PGDATABASE_TEST` in postgres, simply run the following queires(you can change the name of the db) in the sql-shell or create them manually in pgadmin:

- `CREATE DATABASE storefront;`
- `CREATE DATABASE storefront_test;`

### 2. API END POINTS

the default port for running this application is port 3000 , and postgres database on port 5432(default one)

check the REQUIREMENTS.md file for more info on each api

### 3. Scripts avaliable

you can use these script , some might need to run in order for the process to work.

- "start": to start the main program , you can test the apis using thunder or postman api testers
- "clean": clean the build folder if it exists
- "build": builds the build folder
- "dev-up": runs the UP development database migrations
- "dev-down": runs the DOWN development database migrations
- "db-test": Jasmine script for testing each DB model
- "test-up": runs the UP test database migrations
- "test-down": runs the DOWN test database migrations
- "routes-test": jasmine script to test for each route

Note: if for some reason the test commands doesn't work and gives you that the database doesn't exist please do the following:
 - create new user with same name as the test database
 - make sure to grant this user all privileges and make his role superuser , query for altering role is `ALTER ROLE username SUPERUSER;` , query for granting privileges is connecting to the test database first then writing this query `GRANT ALL PRIVILEGES ON database_test TO username-also database name-;` without whats between the hyphen.
 - add the user name and database name in the .env file
 - run the scripts
