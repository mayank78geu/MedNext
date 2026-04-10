package com.mednext.controller;

import com.mednext.dto.ApiResponse;
import com.mednext.entity.Appointment;
import com.mednext.service.AppointmentService;
import com.mednext.config.JwtUtil;
import com.mednext.repository.UserRepository;
import com.mednext.entity.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5173")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public AppointmentController(AppointmentService appointmentService, JwtUtil jwtUtil, UserRepository userRepository) {
        this.appointmentService = appointmentService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    // BOOK
    @PostMapping
    public ApiResponse<?> book(@RequestBody Appointment appointment) {
        return appointmentService.bookAppointment(appointment);
    }

    // GET BY PATIENT (Specific ID)
    @GetMapping("/patient/{patientId}")
    public List<Appointment> getByPatient(@PathVariable Long patientId) {
        return appointmentService.getByPatient(patientId);
    }

    // GET BY LOGGED-IN PATIENT (JWT Extracted)
    @GetMapping("/patient")
    public List<Appointment> getLoggedInPatientAppointments(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }
        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found from token"));

        return appointmentService.getByPatient(user.getId());
    }

    // GET BY DOCTOR
    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getByDoctor(@PathVariable Long doctorId) {
        return appointmentService.getByDoctor(doctorId);
    }
}