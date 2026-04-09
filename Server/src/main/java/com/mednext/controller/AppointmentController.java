package com.mednext.controller;

import com.mednext.dto.ApiResponse;
import com.mednext.entity.Appointment;
import com.mednext.service.AppointmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5173")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    // BOOK
    @PostMapping
    public ApiResponse<?> book(@RequestBody Appointment appointment) {
        return appointmentService.bookAppointment(appointment);
    }

    // GET BY PATIENT
    @GetMapping("/patient/{patientId}")
    public List<Appointment> getByPatient(@PathVariable Long patientId) {
        return appointmentService.getByPatient(patientId);
    }

    // GET BY DOCTOR
    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getByDoctor(@PathVariable Long doctorId) {
        return appointmentService.getByDoctor(doctorId);
    }
}