package com.mednext.service;

import com.mednext.dto.ApiResponse;
import com.mednext.entity.Appointment;
import com.mednext.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantLock;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    // Per-slot locks: key = "doctorId:date:time"
    // Ensures two simultaneous bookings for the same slot are serialized (queue),
    // while bookings for different slots remain fully parallel.
    private final ConcurrentHashMap<String, ReentrantLock> slotLocks = new ConcurrentHashMap<>();

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    // BOOK APPOINTMENT — with per-slot serialization
    public ApiResponse<?> bookAppointment(Appointment appointment) {

        // Build a unique key for this slot
        String slotKey = appointment.getDoctorId() + ":" + appointment.getDate() + ":" + appointment.getTime();

        // Get or create the lock for this slot
        ReentrantLock lock = slotLocks.computeIfAbsent(slotKey, k -> new ReentrantLock(true)); // fair = FIFO order
        lock.lock();
        try {
            // Re-check inside the lock — prevents double-booking under concurrency
            boolean exists = appointmentRepository.existsByDoctorIdAndDateAndTime(
                    appointment.getDoctorId(),
                    appointment.getDate(),
                    appointment.getTime()
            );

            if (exists) {
                return ApiResponse.error("Slot already booked. Another patient secured this slot just ahead of you.");
            }

            appointment.setStatus("BOOKED");
            appointmentRepository.save(appointment);

            return ApiResponse.success("Appointment booked successfully", appointment);

        } finally {
            lock.unlock();
            // Clean up the lock if no other thread is waiting on it, to prevent memory leaks
            slotLocks.computeIfPresent(slotKey, (k, l) -> l.hasQueuedThreads() ? l : null);
        }
    }

    // GET ALL (ADMIN)
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // GET BY PATIENT
    public List<Appointment> getByPatient(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    // GET BY DOCTOR
    public List<Appointment> getByDoctor(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    // GET BY DATE
    public List<Appointment> getByDate(LocalDate date) { return appointmentRepository.findByDate(date); }

    // GET BY HOSPITAL
    public List<Appointment> getByHospital(Long hospitalId) {
        return appointmentRepository.findByHospitalId(hospitalId);
    }
}