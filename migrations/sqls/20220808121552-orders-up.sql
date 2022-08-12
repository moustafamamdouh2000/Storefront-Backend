CREATE TYPE state AS ENUM ('active', 'complete');
CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  status state NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL
);