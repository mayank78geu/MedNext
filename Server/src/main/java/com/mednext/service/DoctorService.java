package com.mednext.service;

import com.mednext.entity.Doctor;
import com.mednext.repository.DoctorRepository;
import com.mednext.repository.HospitalRepository;
import com.mednext.entity.Hospital;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final HospitalRepository hospitalRepository;

    public DoctorService(DoctorRepository doctorRepository, HospitalRepository hospitalRepository) {
        this.doctorRepository = doctorRepository;
        this.hospitalRepository = hospitalRepository;
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id).orElse(null);
    }

    public List<Doctor> searchByName(String name) {
        return doctorRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Doctor> searchBySpecialization(String specialization) {
        return doctorRepository.findBySpecializationContainingIgnoreCase(specialization);
    }

    public Doctor createDoctor(Doctor doctor) {
        if (doctor.getHospital() != null && doctor.getHospital().getId() != null) {
            Hospital hospital = hospitalRepository.findById(doctor.getHospital().getId())
                    .orElseThrow(() -> new RuntimeException("Hospital not found with id: " + doctor.getHospital().getId()));
            doctor.setHospital(hospital);
        }
        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(Long id, Doctor doctorDetails) {
        Doctor existingDoctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));

        if (doctorDetails.getName() != null) {
            existingDoctor.setName(doctorDetails.getName());
        }
        if (doctorDetails.getSpecialization() != null) {
            existingDoctor.setSpecialization(doctorDetails.getSpecialization());
        }
        if (doctorDetails.getExperience() > 0) {
            existingDoctor.setExperience(doctorDetails.getExperience());
        }
        if (doctorDetails.getHospital() != null && doctorDetails.getHospital().getId() != null) {
            Hospital hospital = hospitalRepository.findById(doctorDetails.getHospital().getId())
                    .orElseThrow(() -> new RuntimeException("Hospital not found with id: " + doctorDetails.getHospital().getId()));
            existingDoctor.setHospital(hospital);
        }

        return doctorRepository.save(existingDoctor);
    }

    public void deleteDoctor(Long id) {
        Doctor existingDoctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
        doctorRepository.delete(existingDoctor);
    }
}