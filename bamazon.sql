DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NUll,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
	("Artist Watercolor Set", "Art Supplies", 30.95, 50),
	("Leather Carving Set", "Art Supplies", 55.95, 3),
    ("Tissues", "Home Supplies", 5.95, 100),
    ("Fine Glassware", "Home Supplies", 6.95, 85),
    ("A Discovery of Witches", "Books", 16.95, 10),
    ("Rose Bulbs (pack of 4)", "Gardening", 25.95, 40),
    ("Fertilizer", "Gardening", 20.95, 15),
    ("Raise the Titanic", "Books", 10.95, 12),
    ("Cheese Maker", "Home Supplies", 95.95, 3),
    ("Decorative Painting", "Home Supplies", 102.95, 1);
    