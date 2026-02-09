-- SQL script to create the portfolio database and messages table

CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- Table structure for table `portfolio_messages`
DROP TABLE IF EXISTS `portfolio_messages`;
CREATE TABLE `portfolio_messages` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(50),
    `company` VARCHAR(255),
    `projectType` VARCHAR(100) DEFAULT 'General',
    `budget` VARCHAR(100) DEFAULT 'Not Specified',
    `message` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
