DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS contacts;

CREATE TABLE contacts (
  id SERIAL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL
);