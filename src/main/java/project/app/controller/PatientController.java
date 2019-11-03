package project.app.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import project.app.dto.PatientDto;
import project.app.entity.Patient;
import project.app.error.AppBadRequestException;
import project.app.repository.PatientRepository;
import project.app.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/patient")
@RequiredArgsConstructor
public class PatientController {
    private final UserService userService;
    private final PatientRepository patientRepository;

    @PostMapping
    public Patient postUser(@RequestBody PatientDto patientDto) {
        return this.userService.persistPatient(patientDto);
    }

    @GetMapping
    public List<Patient> getAll() {
        return this.patientRepository.findAll();
    }

    @GetMapping("/{id}")
    public Patient getOne(@PathVariable int id) {
        return this.patientRepository.findById(id).orElseThrow(() -> new AppBadRequestException("Could not find patient."));
    }
}
