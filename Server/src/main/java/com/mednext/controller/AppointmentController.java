package com.mednext.controller;

import com.mednext.dto.ApiResponse;
import com.mednext.entity.Appointment;
import com.mednext.service.AppointmentService;
import com.mednext.config.JwtUtil;
import com.mednext.repository.UserRepository;
import com.mednext.repository.DoctorRepository;
import com.mednext.entity.User;
import com.mednext.entity.Doctor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5173")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentController(AppointmentService appointmentService, JwtUtil jwtUtil,
                                 UserRepository userRepository, DoctorRepository doctorRepository) {
        this.appointmentService = appointmentService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
    }

    // GET ALL (ADMIN)
    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    // BOOK
    @PostMapping
    public ApiResponse<?> book(@RequestBody Appointment appointment,
                               @RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ApiResponse.error("Unauthorized: Missing or invalid Authorization token.");
        }

        String token = authHeader.substring(7);
        try {
            String email = jwtUtil.extractEmail(token);
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found for token email: " + email));
            appointment.setPatientId(user.getId());
        } catch (Exception e) {
            return ApiResponse.error("Unauthorized: Could not resolve patient identity from token. " + e.getMessage());
        }

        return appointmentService.bookAppointment(appointment);
    }

    // GET BY PATIENT (Specific ID)
    @GetMapping("/patient/{patientId}")
    public List<Appointment> getByPatient(@PathVariable Long patientId) {
        return appointmentService.getByPatient(patientId);
    }

    //GET BY DATE
    @GetMapping("/date")
    public List<Appointment> getByDate(@RequestParam LocalDate date) {
        return appointmentService.getByDate(date);
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

    // GET BY LOGGED-IN DOCTOR (JWT Extracted)
    @GetMapping("/doctor")
    public List<Appointment> getLoggedInDoctorAppointments(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }
        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found from token"));

        Doctor doctor = doctorRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Doctor profile not found for this user"));

        return appointmentService.getByDoctor(doctor.getId());
    }

    // GET BY DOCTOR
    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getByDoctor(@PathVariable Long doctorId) {
        return appointmentService.getByDoctor(doctorId);
    }

    // GET BY HOSPITAL
    @GetMapping("/hospital/{hospitalId}")
    public List<Appointment> getByHospital(@PathVariable Long hospitalId) {
        return appointmentService.getByHospital(hospitalId);
    }
}