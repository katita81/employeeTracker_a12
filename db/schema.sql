DROP DATABASE IF EXISTS employees_db;
-- Creates the "inventory_db" database --
CREATE DATABASE employees_db;

-- Makes it so all of the following code will affect inventory_db --
USE employees_db;

CREATE TABLE department (

    id: INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    depart_name: VARCHAR(30) NOT NULL

)

CREATE TABLE role(

    id: INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title: VARCHAR(30) NOT NULL,
    salary: INT NOT NULL,
    department_id: INT NOT NULL

)

CREATE TABLE employee (
    -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- Makes a string column called "first name" which cannot contain null --
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL
);

