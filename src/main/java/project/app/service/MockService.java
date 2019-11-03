package project.app.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.stereotype.Service;
import project.app.entity.*;
import project.app.repository.MedicationPlanRepository;
import project.app.repository.MedicationRepository;
import project.app.repository.UserRepository;

import javax.annotation.PostConstruct;
import java.time.Duration;
import java.time.LocalDate;
import java.time.temporal.TemporalAmount;
import java.time.temporal.TemporalUnit;
import java.util.Collections;

@Service
@Slf4j
@RequiredArgsConstructor
public class MockService {
    private final UserRepository userRepository;
    private final MedicationPlanRepository medicationPlanRepository;
    private final MedicationRepository medicationRepository;

    @PostConstruct
    public void doMock() {
        val doctor = new Doctor();
        doctor.setFirstName("Doctor");
        doctor.setLastName("Doctorescu");
        doctor.setAddress("Aleea Doctorilor 3");
        doctor.setBirthDate(LocalDate.of(1980, 1, 1));
        doctor.setBirthName("Doctorescu");
        doctor.setMale(true);
        doctor.setPassword("password");
        doctor.setUsername("doctor");
        doctor.setRole(Role.DOCTOR);

        userRepository.save(doctor);

        val caretaker = new Caretaker();
        caretaker.setFirstName("Caretaker");
        caretaker.setLastName("Caretakerescu");
        caretaker.setAddress("Aleea Caretakerilor 3");
        caretaker.setBirthDate(LocalDate.of(1980, 1, 2));
        caretaker.setBirthName("Caretakerescu");
        caretaker.setMale(true);
        caretaker.setPassword("password");
        caretaker.setUsername("caretaker");
        caretaker.setRole(Role.CARETAKER);

        userRepository.save(caretaker);

        val patient = new Patient();
        patient.setFirstName("Patient");
        patient.setLastName("Patientescu");
        patient.setAddress("Aleea Patientilor 3");
        patient.setBirthDate(LocalDate.of(1980, 1, 2));
        patient.setBirthName("Patientescu");
        patient.setMale(true);
        patient.setPassword("password");
        patient.setUsername("patient");
        patient.setRole(Role.PATIENT);
        patient.setMedicalRecord("Nu-i ok cu laptele.");
        patient.setCaretaker(caretaker);

        userRepository.save(patient);

        val medication = new Medication();
        medication.setSideEffects("Headaches, Insomnia");
        medication.setName("Algocalmin");
        medication.setDosage("1 pill");
        medicationRepository.save(medication);

        val medicationPlan = new MedicationPlan();
        medicationPlan.setDailyDosage(3);
        medicationPlan.setMedication(medication);
        medicationPlan.setPeriod(LocalDate.of(2020, 1, 2));
        medicationPlan.setPatient(patient);

        medicationPlanRepository.save(medicationPlan);


        log.info("Database seed complete.");
    }
}
