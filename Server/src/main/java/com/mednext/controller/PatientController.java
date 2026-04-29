package com.mednext.controller;

import com.mednext.entity.Patient;
import com.mednext.service.PatientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:5173")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/{id}")
    public Patient getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }

    /**
     * Returns the patient for a given userId.
     * Returns 404 (not 500) when no patient record exists yet — the frontend
     * uses this to decide whether to prompt "Complete Profile".
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<Patient> getPatientByUserId(@PathVariable Long userId) {
        Patient patient = patientService.findPatientByUserId(userId);
        if (patient == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(patient);
    }

    @PostMapping
    public Patient createPatient(@RequestBody Patient patient) {
        return patientService.createPatient(patient);
    }

    @PutMapping("/{id}")
    public Patient updatePatient(@PathVariable Long id, @RequestBody Patient patientDetails) {
        return patientService.updatePatient(id, patientDetails);
    }

    /**
     * Upsert: if a patient record does not exist yet for this userId,
     * create one (linking it to the userId). Otherwise update in place.
     * Previously this would throw a 500 when no record existed.
     */
    @PutMapping("/user/{userId}")
    public ResponseEntity<Patient> updatePatientByUserId(
            @PathVariable Long userId,
            @RequestBody Patient patientDetails) {

        Patient existing = patientService.findPatientByUserId(userId);

        if (existing == null) {
            // First-time save — create the record
            patientDetails.setUserId(userId);
            Patient created = patientService.createPatient(patientDetails);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        }

        Patient updated = patientService.updatePatient(existing.getId(), patientDetails);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
    }
}
