package com.company.seating.controller;

import com.company.seating.dto.SeatDTO;
import com.company.seating.dto.SeatAssignmentDTO;
import com.company.seating.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seats")
public class SeatController {

    private final SeatService seatService;

    @Autowired
    public SeatController(SeatService seatService) {
        this.seatService = seatService;
    }

    @GetMapping("/floor/{floorId}")
    public ResponseEntity<List<SeatDTO>> getSeatsByFloor(@PathVariable Integer floorId) {
        return ResponseEntity.ok(seatService.getSeatsByFloor(floorId));
    }

    @PostMapping("/assign")
    public ResponseEntity<Void> assignSeat(@RequestBody SeatAssignmentDTO assignmentDTO) {
        seatService.assignSeat(assignmentDTO);
        return ResponseEntity.ok().build();
    }
}
