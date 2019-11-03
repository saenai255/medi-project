package project.app.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Caretaker extends User {
    @OneToMany(mappedBy = "caretaker", fetch = FetchType.EAGER)
    private List<Patient> patients;
}
