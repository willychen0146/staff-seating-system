package com.company.seating.service;

import com.company.seating.dto.FloorDTO;
import com.company.seating.model.Floor;
import com.company.seating.repository.FloorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FloorService {

    private final FloorRepository floorRepository;

    @Autowired
    public FloorService(FloorRepository floorRepository) {
        this.floorRepository = floorRepository;
    }

    public List<FloorDTO> getAllFloors() {
        return floorRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private FloorDTO convertToDTO(Floor floor) {
        FloorDTO dto = new FloorDTO();
        dto.setId(floor.getId());
        dto.setFloorNumber(floor.getFloorNumber());
        dto.setFloorName(floor.getFloorName());
        return dto;
    }
}

