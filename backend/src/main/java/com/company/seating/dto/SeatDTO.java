package com.company.seating.dto;

import lombok.Data;

@Data
public class SeatDTO {
    private Integer id;
    private String seatNumber;
    private Integer floorId;
    private Integer positionX;
    private Integer positionY;
    private Boolean isOccupied;
    private String employeeId;
    private String seatColor;
}
