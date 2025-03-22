package com.company.seating.repository;

import com.company.seating.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Integer> {

    @Query(value = "CALL get_seats_by_floor(:floorId)", nativeQuery = true)
    List<Seat> getSeatsbyFloor(@Param("floorId") Integer floorId);

    @Modifying
    @Transactional
    @Query(value = "CALL assign_seat(:p_seat_id, :p_employee_id, :p_seat_color)", nativeQuery = true)
    void assignSeat(
            @Param("p_seat_id") Integer seatId,
            @Param("p_employee_id") String employeeId,
            @Param("p_seat_color") String seatColor
    );

    @Modifying
    @Transactional
    @Query(value = "CALL clear_seat(:p_seat_id)", nativeQuery = true)
    void clearSeat(@Param("p_seat_id") Integer seatId);

    @Query("SELECT s FROM Seat s WHERE s.employeeId = :employeeId")
    Seat findByEmployeeId(@Param("employeeId") String employeeId);
}
