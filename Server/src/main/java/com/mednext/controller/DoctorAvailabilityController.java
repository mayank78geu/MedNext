package com.mednext.controller;

import com.mednext.entity.DoctorAvailability;
import com.mednext.repository.DoctorAvailabilityRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/availability")
@CrossOrigin(origins = "http://localhost:5173")
public class DoctorAvailabilityController {

    private final DoctorAvailabilityRepository repository;

    public DoctorAvailabilityController(DoctorAvailabilityRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public DoctorAvailability add(@RequestBody DoctorAvailability availability) {
        return repository.save(availability);
    }

    @GetMapping("/{doctorId}")
    public List<DoctorAvailability> get(@PathVariable Long doctorId) {
        return repository.findByDoctorId(doctorId);
    }
}