package com.company.seating.repository;

import com.company.seating.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {

    @Query(value = "CALL get_all_employees()", nativeQuery = true)
    List<Employee> getAllEmployees();
}
