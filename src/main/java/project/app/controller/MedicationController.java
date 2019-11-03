package project.app.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import project.app.dto.MedicationDto;
import project.app.entity.Medication;
import project.app.error.AppBadRequestException;
import project.app.repository.MedicationRepository;
import project.app.service.MedicationService;

import java.util.List;

@RestController
@RequestMapping("/api/medication")
@RequiredArgsConstructor
public class MedicationController {
    private final MedicationService medicationService;
    private final MedicationRepository medicationRepository;

    @PostMapping
    public Medication create(@RequestBody MedicationDto medicationDto) {
        return medicationService.create(medicationDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        medicationService.delete(id);
    }

    @GetMapping
    public List<Medication> getAll() {
        return medicationRepository.findAll();
    }

    @GetMapping("/{id}")
    public Medication getOne(@PathVariable int id) {
        return medicationRepository.findById(id).orElseThrow(() -> new AppBadRequestException("Could not find medication."));
    }
}
