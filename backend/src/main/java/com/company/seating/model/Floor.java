package com.company.seating.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "floor")
public class Floor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "floor_number", nullable = false, unique = true)
    private Integer floorNumber;

    @Column(name = "floor_name")
    private String floorName;
}
