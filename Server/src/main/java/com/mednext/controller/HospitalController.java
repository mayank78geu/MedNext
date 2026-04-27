package com.mednext.controller;

import com.mednext.dto.ApiResponse;
import com.mednext.entity.Hospital;
import com.mednext.service.HospitalService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hospitals")
@CrossOrigin(origins = "http://localhost:5173")
public class HospitalController {

    private final HospitalService hospitalService;

    public HospitalController(HospitalService hospitalService) {
        this.hospitalService = hospitalService;
    }

    @PostMapping
    public ApiResponse<Hospital> createHospital(@RequestBody Hospital hospital) {
        Hospital createdHospital = hospitalService.createHospital(hospital);
        return ApiResponse.success("Hospital created successfully", createdHospital);
    }

    @GetMapping
    public ApiResponse<List<Hospital>> getAllHospitals() {
        List<Hospital> hospitals = hospitalService.getAllHospitals();
        return ApiResponse.success("Hospitals fetched successfully", hospitals);
    }

    @GetMapping("/{id}")
    public ApiResponse<Hospital> getHospitalById(@PathVariable Long id) {
        try {
            Hospital hospital = hospitalService.getHospitalById(id);
            return ApiResponse.success("Hospital fetched successfully", hospital);
        } catch (RuntimeException e) {
            return ApiResponse.error(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ApiResponse<Hospital> updateHospital(@PathVariable Long id, @RequestBody Hospital hospitalDetails) {
        try {
            Hospital updatedHospital = hospitalService.updateHospital(id, hospitalDetails);
            return ApiResponse.success("Hospital updated successfully", updatedHospital);
        } catch (RuntimeException e) {
            return ApiResponse.error(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteHospital(@PathVariable Long id) {
        try {
            hospitalService.deleteHospital(id);
            return ApiResponse.success("Hospital deleted successfully", null);
        } catch (RuntimeException e) {
            return ApiResponse.error(e.getMessage());
        }
    }
}
