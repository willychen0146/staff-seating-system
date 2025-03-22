package com.company.seating.dto;

import lombok.Data;

@Data
public class SeatAssignmentDTO {
    private Integer seatId;
    private String employeeId;
    private String seatColor;
    private boolean clear; // true if clearing a seat
}
