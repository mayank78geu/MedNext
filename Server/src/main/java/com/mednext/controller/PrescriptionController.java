package com.mednext.controller;

import com.mednext.config.JwtUtil;
import com.mednext.dto.ApiResponse;
import com.mednext.entity.Prescription;
import com.mednext.entity.User;
import com.mednext.entity.Doctor;
import com.mednext.repository.UserRepository;
import com.mednext.repository.DoctorRepository;
import com.mednext.service.PrescriptionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/prescriptions")
@CrossOrigin(origins = "http://localhost:5173")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;

    public PrescriptionController(PrescriptionService prescriptionService,
                                  JwtUtil jwtUtil,
                                  UserRepository userRepository,
                                  DoctorRepository doctorRepository) {
        this.prescriptionService = prescriptionService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
    }

    /** Save / update a prescription — doctorId injected from JWT */
    @PostMapping
    public ApiResponse<?> save(@RequestBody Prescription prescription,
                               @RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ApiResponse.error("Unauthorized: Missing or invalid token.");
        }
        try {
            String email = jwtUtil.extractEmail(authHeader.substring(7));
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            Doctor doctor = doctorRepository.findByUserId(user.getId())
                    .orElseThrow(() -> new RuntimeException("Doctor profile not found for this user"));
            prescription.setDoctorId(doctor.getId());
        } catch (Exception e) {
            return ApiResponse.error("Unauthorized: " + e.getMessage());
        }
        return prescriptionService.savePrescription(prescription);
    }

    /** Get prescription for a specific appointment */
    @GetMapping("/appointment/{appointmentId}")
    public ApiResponse<?> getByAppointment(@PathVariable Long appointmentId) {
        Optional<Prescription> p = prescriptionService.getByAppointmentId(appointmentId);
        return p.map(prescription -> ApiResponse.success("Found", prescription))
                .orElseGet(() -> ApiResponse.error("No prescription for this appointment"));
    }

    /** Get all prescriptions written by the logged-in doctor (for history view) */
    @GetMapping("/doctor")
    public ApiResponse<?> getByDoctor(@RequestHeader("Authorization") String authHeader) {
        try {
            String email = jwtUtil.extractEmail(authHeader.substring(7));
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            Doctor doctor = doctorRepository.findByUserId(user.getId())
                    .orElseThrow(() -> new RuntimeException("Doctor profile not found"));
            List<Prescription> list = prescriptionService.getByDoctorId(doctor.getId());
            return ApiResponse.success("Fetched", list);
        } catch (Exception e) {
            return ApiResponse.error("Error: " + e.getMessage());
        }
    }

    /** Get all prescriptions for the logged-in patient (JWT-resolved) */
    @GetMapping("/patient")
    public ApiResponse<?> getForLoggedInPatient(@RequestHeader("Authorization") String authHeader) {
        try {
            String email = jwtUtil.extractEmail(authHeader.substring(7));
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            // patientId in prescriptions = users.id (set during booking)
            List<Prescription> list = prescriptionService.getByPatientId(user.getId());
            return ApiResponse.success("Fetched", list);
        } catch (Exception e) {
            return ApiResponse.error("Error: " + e.getMessage());
        }
    }

    /** Get all prescriptions for a specific patient by their userId */
    @GetMapping("/patient/{patientId}")
    public List<Prescription> getByPatient(@PathVariable Long patientId) {
        return prescriptionService.getByPatientId(patientId);
    }
}
