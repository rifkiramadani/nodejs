CREATE TABLE
    sample (
        id VARCHAR(100) NOT NULL,
        name VARCHAR(100) NOT NULL,
        PRIMARY KEY (id)
    ) engine innoDB;

CREATE TABLE
    `nodejs_database_prisma`.`customers` (
        `id` VARCHAR(100) NOT NULL,
        `name` VARCHAR(100) NOT NULL,
        `email` VARCHAR(100) NOT NULL,
        `phone` VARCHAR(100) NOT NULL,
        PRIMARY KEY (`id`),
        UNIQUE (`email`),
        UNIQUE (`phone`)
    ) ENGINE = InnoDB;

CREATE TABLE
    `nodejs_database_prisma`.`products` (
        `id` VARCHAR(100) NOT NULL,
        `name` VARCHAR(100) NOT NULL,
        `price` VARCHAR(100) NOT NULL,
        `stock` VARCHAR(100) NOT NULL,
        `category` VARCHAR(100) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

CREATE TABLE
    `nodejs_database_prisma`.`categories` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(100) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

CREATE TABLE
    `nodejs_database_prisma`.`comments` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `customer_id` VARCHAR(100) NOT NULL,
        `title` VARCHAR(200) NOT NULL,
        `description` TEXT NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

CREATE TABLE
    `nodejs_database_prisma`.`likes` (
        `customer_id` VARCHAR(100) NOT NULL,
        `product_id` VARCHAR(100) NOT NULL
    ) ENGINE = InnoDB;

CREATE TABLE
    `nodejs_database_prisma`.`_loves` (
        `A` VARCHAR(100) NOT NULL,
        `B` VARCHAR(100) NOT NULL,
        PRIMARY KEY (`A`, `B`)
    ) ENGINE = InnoDB;

ALTER TABLE `_loves` ADD CONSTRAINT `customer_loves_fk` FOREIGN KEY (`A`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `_loves` ADD CONSTRAINT `product_loves_fk` FOREIGN KEY (`B`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;