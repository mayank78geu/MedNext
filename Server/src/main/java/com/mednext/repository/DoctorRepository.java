package com.mednext.repository;

import com.mednext.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    Optional<Doctor> findByUserId(Long userId);

    List<Doctor> findByNameContainingIgnoreCase(String name);

    List<Doctor> findBySpecializationContainingIgnoreCase(String specialization);

    List<Doctor> findByHospitalId(Long hospitalId);
}