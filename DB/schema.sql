-- Tables structure (DDL)

-- Floor table to store floor information
CREATE TABLE floor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    floor_number INT NOT NULL,
    floor_name VARCHAR(50),
    UNIQUE (floor_number)
);

-- Seat table to store all seat information
CREATE TABLE seat (
    id INT PRIMARY KEY AUTO_INCREMENT,
    seat_number VARCHAR(20) NOT NULL,
    floor_id INT NOT NULL,
    position_x INT NOT NULL,
    position_y INT NOT NULL,
    is_occupied BOOLEAN DEFAULT FALSE,
    employee_id VARCHAR(5) NULL,
    seat_color VARCHAR(20) DEFAULT '#FFFFFF',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (floor_id) REFERENCES floor(id) ON DELETE CASCADE,
    UNIQUE (floor_id, seat_number)
);

-- Employee table to store employee information
CREATE TABLE employee (
    id VARCHAR(5) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    department VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create users table to store login roles
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    employee_id VARCHAR(5) UNIQUE,
    FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE SET NULL
);

