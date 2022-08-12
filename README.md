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

## Steps to Completion

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
