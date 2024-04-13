# Simple Web Chat Application
A Real-time Web Chat Application

## Demonstration
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/ZsvgQs7Chd0/0.jpg)](https://www.youtube.com/watch?v=ZsvgQs7Chd0)

## Requirements
The Web Chat Application requires the installation of Linux, Apache, MySQL, PHP (LAMP) stack.
Tutorial: https://www.digitalocean.com/community/tutorials/how-to-install-lamp-stack-on-ubuntu

## Installation
-- Step 1: Log in to MySQL as root
`mysql -u root -p`

-- Step 2: Create a new user (REPLACE the `YOUR_PASSWORD_HERE` here and in every PHP files):
`CREATE USER 'dummy'@'localhost' IDENTIFIED BY 'YOUR_PASSWORD_HERE';`

-- Step 3: Create a new database
`CREATE DATABASE db3322;`

-- Step 4: Grant all privileges of the new database to the new user
`GRANT ALL PRIVILEGES ON db3322.* TO 'dummy'@'localhost';`

-- Step 5: Flush the privileges to ensure they are saved and available in the current session
`FLUSH PRIVILEGES;`

-- Step 6: Exit from the MySQL shell
`exit`

-- Step 7: Log in to MySQL with the new user
`mysql -u dummy -p`

-- Step 8: Switch to the new database
`USE db3322;`

-- Step 9: Create a new table
`CREATE TABLE 'account' (
 'id' smallint NOT NULL AUTO_INCREMENT,
 'useremail' varchar(60) NOT NULL,
 'password' varchar(50) NOT NULL,
 PRIMARY KEY ('id')
);`

-- Step 9: Create a new table
`CREATE TABLE 'message' (
 'msgid' int NOT NULL AUTO_INCREMENT,
 'time' bigint NOT NULL,
 'message' varchar(250) NOT NULL,
 'person' varchar(45) NOT NULL,
 PRIMARY KEY ('msgid')
);`

-- Step 10: Clone the repository (except README.md and LICENSE) to your web root folder and access login.php as the index page

## Remarks
This project is submitted as HKU COMP3322 Course Assignment.
