package project.app.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.val;
import project.app.entity.MedicationPlan;
import project.app.error.AppBadRequestException;
import project.app.repository.MedicationRepository;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class MedicationPlanDto {
    private MedicationDto medication;
    private int dailyDosage;
    private LocalDate period;

    public static void mapTo(MedicationPlan medicationPlan, MedicationPlanDto medicationPlanDto, MedicationRepository medicationRepository) {
        medicationPlan.setPeriod(medicationPlanDto.getPeriod());
        medicationPlan.setDailyDosage(medicationPlanDto.getDailyDosage());

        val medication = medicationRepository.findById(medicationPlanDto.getMedication().getId()).orElseThrow(() -> new AppBadRequestException("Medication could not be found."));
        medicationPlan.setMedication(medication);
    }
}
