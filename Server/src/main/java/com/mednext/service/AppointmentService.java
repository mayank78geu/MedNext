package com.mednext.service;

import com.mednext.dto.ApiResponse;
import com.mednext.entity.Appointment;
import com.mednext.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    // BOOK APPOINTMENT
    public ApiResponse<?> bookAppointment(Appointment appointment) {

        boolean exists = appointmentRepository.existsByDoctorIdAndDateAndTime(
                appointment.getDoctorId(),
                appointment.getDate(),
                appointment.getTime()
        );

        if (exists) {
            return ApiResponse.error("Slot already booked");
        }

        appointment.setStatus("BOOKED");

        appointmentRepository.save(appointment);

        return ApiResponse.success("Appointment booked", appointment);
    }

    // GET BY PATIENT
    public List<Appointment> getByPatient(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    // GET BY DOCTOR
    public List<Appointment> getByDoctor(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    //GET BY DATE
    public List<Appointment> getByDate(LocalDate date) {return appointmentRepository.findByDate(date);}
}