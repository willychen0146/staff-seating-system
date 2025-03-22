-- DB/stored-procedures.sql

-- Get all seats for a specific floor
DELIMITER //
CREATE PROCEDURE get_seats_by_floor(IN p_floor_id INT)
BEGIN
    SELECT * FROM seat WHERE floor_id = p_floor_id;
END //
DELIMITER ;

-- Get all employees
DELIMITER //
CREATE PROCEDURE get_all_employees()
BEGIN
    SELECT * FROM employee ORDER BY name;
END //
DELIMITER ;

-- Assign a seat to an employee
DELIMITER //
CREATE PROCEDURE assign_seat(
    IN p_seat_id INT,
    IN p_employee_id VARCHAR(5),
    IN p_seat_color VARCHAR(20)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error occurred while assigning seat';
    END;

    START TRANSACTION;
    
    -- First check if employee already has a seat and clear it
    UPDATE seat 
    SET is_occupied = FALSE,
        employee_id = NULL,
        seat_color = '#FFFFFF'
    WHERE employee_id = p_employee_id;

    -- Then assign the new seat
    UPDATE seat 
    SET is_occupied = TRUE,
        employee_id = p_employee_id,
        seat_color = p_seat_color
    WHERE id = p_seat_id;
    
    COMMIT;
END //
DELIMITER ;

-- Clear a seat (make it vacant)
DELIMITER //
CREATE PROCEDURE clear_seat(IN p_seat_id INT)
BEGIN
    UPDATE seat 
    SET is_occupied = FALSE,
        employee_id = NULL,
        seat_color = '#FFFFFF'
    WHERE id = p_seat_id;
END //
DELIMITER ;

