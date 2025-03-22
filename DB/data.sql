-- DB/data.sql

-- Insert floors
INSERT INTO floor (floor_number, floor_name) VALUES
(1, 'First Floor'),
(2, 'Second Floor'),
(3, 'Third Floor');

-- Insert sample employees
INSERT INTO employee (id, name, email, department) VALUES
('10001', 'John Doe', 'johndoe@example.com', 'Engineering'),
('10002', 'Jane Smith', 'janesmith@example.com', 'Marketing'),
('10003', 'Robert Johnson', 'robertj@example.com', 'HR'),
('10004', 'Emily Davis', 'emilyd@example.com', 'Finance'),
('10005', 'Michael Wilson', 'michaelw@example.com', 'Engineering'),
('10006', 'Sarah Brown', 'sarahb@example.com', 'Product'),
('10007', 'David Lee', 'davidl@example.com', 'Sales'),
('10008', 'Lisa Wang', 'lisaw@example.com', 'Engineering'),
('10009', 'James Taylor', 'jamest@example.com', 'Customer Support'),
('10010', 'Amanda Miller', 'amandam@example.com', 'HR');

-- Insert seats for Floor 1
INSERT INTO seat (seat_number, floor_id, position_x, position_y, is_occupied, employee_id, seat_color) VALUES
('A1', 1, 50, 50, FALSE, NULL, '#FFFFFF'),
('A2', 1, 120, 50, FALSE, NULL, '#FFFFFF'),
('A3', 1, 190, 50, FALSE, NULL, '#FFFFFF'),
('A4', 1, 260, 50, FALSE, NULL, '#FFFFFF'),
('B1', 1, 50, 120, FALSE, NULL, '#FFFFFF'),
('B2', 1, 120, 120, FALSE, NULL, '#FFFFFF'),
('B3', 1, 190, 120, FALSE, NULL, '#FFFFFF'),
('B4', 1, 260, 120, FALSE, NULL, '#FFFFFF'),
('C1', 1, 50, 190, FALSE, NULL, '#FFFFFF'),
('C2', 1, 120, 190, FALSE, NULL, '#FFFFFF'),
('C3', 1, 190, 190, FALSE, NULL, '#FFFFFF'),
('C4', 1, 260, 190, FALSE, NULL, '#FFFFFF');

-- Insert seats for Floor 2
INSERT INTO seat (seat_number, floor_id, position_x, position_y, is_occupied, employee_id, seat_color) VALUES
('A1', 2, 50, 50, FALSE, NULL, '#FFFFFF'),
('A2', 2, 120, 50, FALSE, NULL, '#FFFFFF'),
('A3', 2, 190, 50, FALSE, NULL, '#FFFFFF'),
('A4', 2, 260, 50, FALSE, NULL, '#FFFFFF'),
('B1', 2, 50, 120, FALSE, NULL, '#FFFFFF'),
('B2', 2, 120, 120, FALSE, NULL, '#FFFFFF'),
('B3', 2, 190, 120, FALSE, NULL, '#FFFFFF'),
('B4', 2, 260, 120, FALSE, NULL, '#FFFFFF');

-- Insert seats for Floor 3
INSERT INTO seat (seat_number, floor_id, position_x, position_y, is_occupied, employee_id, seat_color) VALUES
('A1', 3, 50, 50, FALSE, NULL, '#FFFFFF'),
('A2', 3, 120, 50, FALSE, NULL, '#FFFFFF'),
('A3', 3, 190, 50, FALSE, NULL, '#FFFFFF'),
('A4', 3, 260, 50, FALSE, NULL, '#FFFFFF'),
('B1', 3, 50, 120, FALSE, NULL, '#FFFFFF'),
('B2', 3, 120, 120, FALSE, NULL, '#FFFFFF');
