package project.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.app.entity.Caretaker;

public interface CaretakerRepository extends JpaRepository<Caretaker, Integer> {
}
