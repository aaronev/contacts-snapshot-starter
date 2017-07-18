DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS test;

CREATE TABLE contacts (
  id serial,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL
);

CREATE TABLE test (
  id serial,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL
);