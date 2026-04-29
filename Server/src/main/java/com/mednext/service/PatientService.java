package com.mednext.service;

import com.mednext.entity.Patient;
import com.mednext.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    public Patient getPatientByUserId(Long userId) {
        return patientRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Patient not found for user"));
    }

    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public Patient updatePatient(Long id, Patient patientDetails) {
        Patient patient = getPatientById(id);
        
        if (patientDetails.getName() != null) patient.setName(patientDetails.getName());
        if (patientDetails.getCity() != null) patient.setCity(patientDetails.getCity());
        if (patientDetails.getPincode() != null) patient.setPincode(patientDetails.getPincode());
        if (patientDetails.getAge() != null) patient.setAge(patientDetails.getAge());
        if (patientDetails.getHeight() != null) patient.setHeight(patientDetails.getHeight());
        if (patientDetails.getWeight() != null) patient.setWeight(patientDetails.getWeight());
        if (patientDetails.getStressLevel() != null) patient.setStressLevel(patientDetails.getStressLevel());
        if (patientDetails.getAverageSleepTime() != null) patient.setAverageSleepTime(patientDetails.getAverageSleepTime());
        if (patientDetails.getSleepQuality() != null) patient.setSleepQuality(patientDetails.getSleepQuality());
        if (patientDetails.getBpIssues() != null) patient.setBpIssues(patientDetails.getBpIssues());

        return patientRepository.save(patient);
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}
