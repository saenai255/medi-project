package project.app.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import project.app.entity.Medication;

@Data
@NoArgsConstructor
public class MedicationDto {
    private int id;
    private String name;
    private String sideEffects;
    private String dosage;

    public static void mapTo(Medication medication, MedicationDto medicationDto) {
        medication.setDosage(medicationDto.getDosage());
        medication.setName(medicationDto.getName());
        medication.setSideEffects(medicationDto.getSideEffects());
        medication.setId(medicationDto.getId());
    }
}
