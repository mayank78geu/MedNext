package com.mednext.service;

import com.mednext.dto.ApiResponse;
import com.mednext.entity.Prescription;
import com.mednext.repository.PrescriptionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;

    public PrescriptionService(PrescriptionRepository prescriptionRepository) {
        this.prescriptionRepository = prescriptionRepository;
    }

    /** Create or update prescription for a given appointment (one per appointment) */
    public ApiResponse<?> savePrescription(Prescription prescription) {
        // If one already exists for this appointment, update it
        Optional<Prescription> existing = prescriptionRepository.findByAppointmentId(prescription.getAppointmentId());
        if (existing.isPresent()) {
            Prescription p = existing.get();
            p.setMedicines(prescription.getMedicines());
            p.setTests(prescription.getTests());
            p.setComments(prescription.getComments());
            p.setNextVisitDate(prescription.getNextVisitDate());
            prescriptionRepository.save(p);
            return ApiResponse.success("Prescription updated successfully", p);
        }
        prescriptionRepository.save(prescription);
        return ApiResponse.success("Prescription saved successfully", prescription);
    }

    /** Get prescription for a specific appointment */
    public Optional<Prescription> getByAppointmentId(Long appointmentId) {
        return prescriptionRepository.findByAppointmentId(appointmentId);
    }

    /** Get all prescriptions written by a specific doctor (for clinical history) */
    public List<Prescription> getByDoctorId(Long doctorId) {
        return prescriptionRepository.findByDoctorId(doctorId);
    }

    /** Get all prescriptions for a specific patient */
    public List<Prescription> getByPatientId(Long patientId) {
        return prescriptionRepository.findByPatientId(patientId);
    }
}
