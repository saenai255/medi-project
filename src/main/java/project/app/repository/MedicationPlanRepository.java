package project.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.app.entity.Caretaker;
import project.app.entity.MedicationPlan;
import project.app.entity.Patient;

import java.util.List;

public interface MedicationPlanRepository extends JpaRepository<MedicationPlan, Integer> {
    List<MedicationPlan> deleteAllByPatient(Patient patient);
}
