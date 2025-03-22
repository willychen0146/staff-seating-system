package com.company.seating.service;

import com.company.seating.dto.SeatDTO;
import com.company.seating.dto.SeatAssignmentDTO;
import com.company.seating.model.Seat;
import com.company.seating.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SeatService {

    private final SeatRepository seatRepository;

    @Autowired
    public SeatService(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    public List<SeatDTO> getSeatsByFloor(Integer floorId) {
        return seatRepository.getSeatsbyFloor(floorId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void assignSeat(SeatAssignmentDTO assignmentDTO) {
        // Check if employee already has a seat
        Seat existingSeat = seatRepository.findByEmployeeId(assignmentDTO.getEmployeeId());

        if (existingSeat != null) {
            // Clear the existing seat first
            seatRepository.clearSeat(existingSeat.getId());
        }

        if (assignmentDTO.isClear()) {
            seatRepository.clearSeat(assignmentDTO.getSeatId());
        } else {
            seatRepository.assignSeat(
                    assignmentDTO.getSeatId(),
                    assignmentDTO.getEmployeeId(),
                    assignmentDTO.getSeatColor()
            );
        }
    }

    private SeatDTO convertToDTO(Seat seat) {
        SeatDTO dto = new SeatDTO();
        dto.setId(seat.getId());
        dto.setSeatNumber(seat.getSeatNumber());
        dto.setFloorId(seat.getFloor().getId());
        dto.setPositionX(seat.getPositionX());
        dto.setPositionY(seat.getPositionY());
        dto.setIsOccupied(seat.getIsOccupied());
        dto.setEmployeeId(seat.getEmployeeId());
        dto.setSeatColor(seat.getSeatColor());
        return dto;
    }
}
