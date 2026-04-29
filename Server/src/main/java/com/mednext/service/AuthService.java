package com.mednext.service;

import com.mednext.config.JwtUtil;
import com.mednext.dto.*;
import com.mednext.entity.User;
import com.mednext.entity.Patient;
import com.mednext.entity.Doctor;
import com.mednext.entity.Hospital;
import com.mednext.repository.UserRepository;
import com.mednext.repository.PatientRepository;
import com.mednext.repository.DoctorRepository;
import com.mednext.repository.HospitalRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final HospitalRepository hospitalRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       PatientRepository patientRepository,
                       DoctorRepository doctorRepository,
                       HospitalRepository hospitalRepository,
                       BCryptPasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.hospitalRepository = hospitalRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // REGISTER
    public ApiResponse<?> register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return ApiResponse.error("Email already exists");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        userRepository.save(user);

        // Automatically create the respective role profile
        if ("PATIENT".equalsIgnoreCase(user.getRole())) {
            Patient patient = Patient.builder().name(user.getName()).userId(user.getId()).build();
            patientRepository.save(patient);
        } else if ("DOCTOR".equalsIgnoreCase(user.getRole())) {
            Doctor doctor = Doctor.builder().name(user.getName()).userId(user.getId()).build();
            doctorRepository.save(doctor);
        } else if ("HOSPITAL".equalsIgnoreCase(user.getRole())) {
            Hospital hospital = Hospital.builder().name(user.getName()).userId(user.getId()).build();
            hospitalRepository.save(hospital);
        }

        return ApiResponse.success("User registered successfully", null);
    }

    // LOGIN
    public ApiResponse<?> login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ApiResponse.error("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        AuthResponse response = new AuthResponse(token, user.getRole());

        return ApiResponse.success("Login successful", response);
    }
}