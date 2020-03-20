
CREATE DATABASE BURGERs_db;
USE BURGERS_db;
CREATE TABLE burgers(
id INT AUTO_INCREMENT,	
burger_name VARCHAR(40),
devourded BOOLEAN not null default 0,
PRIMARY KEY(id)
)
