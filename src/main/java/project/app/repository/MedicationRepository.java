package project.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.app.entity.Medication;

public interface MedicationRepository extends JpaRepository<Medication, Integer> {
}
