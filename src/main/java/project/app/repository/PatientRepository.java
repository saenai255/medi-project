package project.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.app.entity.Patient;
import project.app.entity.User;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Integer> {
}
