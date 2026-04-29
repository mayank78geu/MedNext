package com.mednext.controller;

import com.mednext.config.JwtUtil;
import com.mednext.entity.Doctor;
import com.mednext.entity.User;
import com.mednext.repository.DoctorRepository;
import com.mednext.repository.UserRepository;
import com.mednext.service.DoctorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:5173")
public class DoctorController {

    private final DoctorService doctorService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;

    public DoctorController(DoctorService doctorService, JwtUtil jwtUtil,
                            UserRepository userRepository, DoctorRepository doctorRepository) {
        this.doctorService   = doctorService;
        this.jwtUtil         = jwtUtil;
        this.userRepository  = userRepository;
        this.doctorRepository = doctorRepository;
    }

    /** GET /api/doctors/me — resolve logged-in doctor from JWT email */
    @GetMapping("/me")
    public ResponseEntity<?> getMe(@RequestHeader("Authorization") String authHeader) {
        try {
            String email = jwtUtil.extractEmail(authHeader.substring(7));
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            Doctor doctor = doctorRepository.findByUserId(user.getId())
                    .orElseThrow(() -> new RuntimeException("Doctor profile not found"));
            return ResponseEntity.ok(doctor);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Unauthorized: " + e.getMessage());
        }
    }

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/{id}")
    public Doctor getDoctorById(@PathVariable Long id) {
        return doctorService.getDoctorById(id);
    }

    @GetMapping("/user/{userId}")
    public Doctor getDoctorByUserId(@PathVariable Long userId) {
        return doctorService.getDoctorByUserId(userId);
    }

    @GetMapping("/search/name")
    public List<Doctor> searchByName(@RequestParam String name) {
        return doctorService.searchByName(name);
    }

    @GetMapping("/search/specialization")
    public List<Doctor> searchBySpecialization(@RequestParam String specialization) {
        return doctorService.searchBySpecialization(specialization);
    }

    @GetMapping("/hospital/{hospitalId}")
    public List<Doctor> getDoctorsByHospitalId(@PathVariable Long hospitalId) {
        return doctorService.getDoctorsByHospitalId(hospitalId);
    }

    @PostMapping
    public Doctor createDoctor(@RequestBody Doctor doctor) {
        return doctorService.createDoctor(doctor);
    }

    @PutMapping("/{id}")
    public Doctor updateDoctor(@PathVariable Long id, @RequestBody Doctor doctorDetails) {
        return doctorService.updateDoctor(id, doctorDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
    }
}