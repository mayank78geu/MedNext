package com.mednext.service;

import com.mednext.entity.Hospital;
import com.mednext.repository.HospitalRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HospitalService {

    private final HospitalRepository hospitalRepository;

    public HospitalService(HospitalRepository hospitalRepository) {
        this.hospitalRepository = hospitalRepository;
    }

    public Hospital createHospital(Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    public Hospital getHospitalById(Long id) {
        return hospitalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hospital not found with id: " + id));
    }

    public Hospital getHospitalByUserId(Long userId) {
        return hospitalRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Hospital not found for user id: " + userId));
    }

    public Hospital updateHospital(Long id, Hospital hospitalDetails) {
        Hospital existingHospital = getHospitalById(id);
        
        if (hospitalDetails.getName() != null) {
            existingHospital.setName(hospitalDetails.getName());
        }
        if (hospitalDetails.getAddress() != null) {
            existingHospital.setAddress(hospitalDetails.getAddress());
        }
        if (hospitalDetails.getCity() != null) {
            existingHospital.setCity(hospitalDetails.getCity());
        }
        
        return hospitalRepository.save(existingHospital);
    }

    public void deleteHospital(Long id) {
        Hospital existingHospital = getHospitalById(id);
        hospitalRepository.delete(existingHospital);
    }
}
