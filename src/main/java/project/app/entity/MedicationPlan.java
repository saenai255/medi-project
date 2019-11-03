package project.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@ToString(of = "id")
public class MedicationPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private int id;
    @ManyToOne()
    @JoinColumn
    @JsonIgnore
    private Patient patient;
    @ManyToOne()
    private Medication medication;
    private int dailyDosage;
    private LocalDate period;
}
