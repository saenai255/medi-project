package project.app.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class PatientDto extends UserDto {
    private int caretakerId;
    private String medicalRecord;
    private List<MedicationPlanDto> medicationPlans;
}
