package project.app.service;

import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.stereotype.Service;
import project.app.dto.MedicationDto;
import project.app.entity.Medication;
import project.app.entity.MedicationPlan;
import project.app.error.AppBadRequestException;
import project.app.repository.MedicationPlanRepository;
import project.app.repository.MedicationRepository;
import project.app.repository.PatientRepository;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class MedicationService {
    private final MedicationRepository medicationRepository;
    private final MedicationPlanRepository medicationPlanRepository;
    private final PatientRepository patientRepository;

    public Medication create(MedicationDto medicationDto) {
        if (medicationDto.getDosage() == null || medicationDto.getDosage().length() < 3) {
            throw new AppBadRequestException("Dosage text is too short.");
        }

        if (medicationDto.getName() == null || medicationDto.getName().length() < 3) {
            throw new AppBadRequestException("Name text is too short.");
        }

        if (medicationDto.getSideEffects() == null || medicationDto.getSideEffects().length() < 3) {
            throw new AppBadRequestException("Side effects text is too short.");
        }

        val medication = medicationRepository.findById(medicationDto.getId()).orElse(new Medication());
        MedicationDto.mapTo(medication, medicationDto);
        return medicationRepository.save(medication);
    }

    @Transactional
    public void delete(int id) {
        val medication = this.medicationRepository.findById(id).orElseThrow(() -> new AppBadRequestException("Could not find such medication."));

        for (val mp : medication.getMedicationPlans()) {
            val patient = mp.getPatient();
            patient.getMedicationPlans().clear();

            this.patientRepository.save(patient);
        }

        this.medicationPlanRepository.deleteAll(medication.getMedicationPlans());
        this.medicationRepository.delete(medication);
    }
}
