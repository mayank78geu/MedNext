package com.mednext.controller;

import com.mednext.dto.ApiResponse;
import com.mednext.entity.Hospital;
import com.mednext.service.HospitalService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.mednext.dto.RegisterRequest;
import com.mednext.service.AuthService;
import com.mednext.service.UserService;
import com.mednext.service.DoctorService;
import com.mednext.entity.User;
import com.mednext.entity.Doctor;

@RestController
@RequestMapping("/api/hospitals")
@CrossOrigin(origins = "http://localhost:5173")
public class HospitalController {

    private final HospitalService hospitalService;
    private final AuthService authService;
    private final UserService userService;
    private final DoctorService doctorService;

    public HospitalController(HospitalService hospitalService, AuthService authService, UserService userService, DoctorService doctorService) {
        this.hospitalService = hospitalService;
        this.authService = authService;
        this.userService = userService;
        this.doctorService = doctorService;
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

    @GetMapping("/user/{userId}")
    public ApiResponse<Hospital> getHospitalByUserId(@PathVariable Long userId) {
        try {
            Hospital hospital = hospitalService.getHospitalByUserId(userId);
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

    @PostMapping("/{hospitalId}/doctors/register")
    public ApiResponse<?> registerDoctorForHospital(@PathVariable Long hospitalId, @RequestBody RegisterRequest request) {
        request.setRole("DOCTOR");
        ApiResponse<?> authResponse = authService.register(request);
        if (!authResponse.isSuccess()) {
            return authResponse;
        }

        User user = userService.getUserByEmail(request.getEmail());
        Doctor doctor = doctorService.getDoctorByUserId(user.getId());
        Hospital hospital = hospitalService.getHospitalById(hospitalId);
        
        doctor.setHospital(hospital);
        doctorService.updateDoctor(doctor.getId(), doctor);
        
        return ApiResponse.success("Doctor registered and linked to hospital successfully", doctor);
    }

    @PostMapping("/{hospitalId}/patients/register")
    public ApiResponse<?> registerPatientForHospital(@PathVariable Long hospitalId, @RequestBody RegisterRequest request) {
        request.setRole("PATIENT");
        return authService.register(request); 
    }
}
