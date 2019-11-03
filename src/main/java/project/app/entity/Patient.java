package project.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Patient extends User {
    @ManyToOne
    @JoinColumn
    @JsonIgnore
    private Caretaker caretaker;
    private String medicalRecord;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "patient", fetch = FetchType.EAGER)
    private List<MedicationPlan> medicationPlans;
}
