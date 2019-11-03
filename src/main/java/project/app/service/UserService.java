package project.app.service;

import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import project.app.config.WebSecurityConfiguration;
import project.app.controller.PatientController;
import project.app.dto.CaretakerDto;
import project.app.dto.MedicationPlanDto;
import project.app.dto.PatientDto;
import project.app.dto.UserDto;
import project.app.entity.*;
import project.app.error.AppBadRequestException;
import project.app.repository.*;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final CaretakerRepository caretakerRepository;
    private final MedicationPlanRepository medicationPlanRepository;
    private final MedicationRepository medicationRepository;

    public User getPrincipal() {
        return ((WebSecurityConfiguration.UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
    }

    @Transactional
    public Patient persistPatient(PatientDto patientDto) {
        val caretaker = validatePatient(patientDto);

        Patient patient = patientRepository.findById(patientDto.getId()).orElseGet(Patient::new);
        UserDto.mapTo(patient, patientDto);

        patient.setMedicalRecord(patientDto.getMedicalRecord());
        patient.setCaretaker(caretaker);
        patient.setRole(Role.PATIENT);

        userRepository.save(patient);

        medicationPlanRepository.deleteAllByPatient(patient);
        patient.setMedicationPlans(new ArrayList<>());


        for (val medicalPlanDto : patientDto.getMedicationPlans()) {
            val medicationPlan = new MedicationPlan();
            MedicationPlanDto.mapTo(medicationPlan, medicalPlanDto, medicationRepository);
            medicationPlan.setPatient(patient);

            medicationPlanRepository.save(medicationPlan);
            patient.getMedicationPlans().add(medicationPlan);
        }

        return patient;
    }

    public Caretaker persistCaretaker(CaretakerDto caretakerDto) {
        validateUser(caretakerDto);

        Caretaker caretaker = caretakerRepository.findById(caretakerDto.getId()).orElseGet(Caretaker::new);
        UserDto.mapTo(caretaker, caretakerDto);

        caretaker.setRole(Role.CARETAKER);

        userRepository.save(caretaker);

        return caretaker;
    }

    private void validateUser(UserDto userDto) {
        if (userDto.getAddress() == null || userDto.getAddress().length() < 3) {
            throw new AppBadRequestException("Address field is too short.");
        }

        if (userDto.getBirthDate() == null || userDto.getBirthDate().isAfter(LocalDate.now())) {
            throw new AppBadRequestException("Birth date is invalid.");
        }

        if (userDto.getBirthName() == null || userDto.getBirthName().length() < 3) {
            throw new AppBadRequestException("Birth name is too short.");
        }

        if (userDto.getFirstName() == null || userDto.getFirstName().length() < 3) {
            throw new AppBadRequestException("First name is too short.");
        }

        if (userDto.getLastName() == null || userDto.getLastName().length() < 3) {
            throw new AppBadRequestException("Last name is too short.");
        }

        if (userDto.getUsername() == null || userDto.getUsername().length() < 3) {
            throw new AppBadRequestException("Username is too short.");
        }
    }

    private Caretaker validatePatient(PatientDto patientDto) {
        validateUser(patientDto);

        if (patientDto.getCaretakerId() == 0) {
            throw new AppBadRequestException("Given caretaker is invalid.");
        }

        val caretaker = ((Caretaker) userRepository.findById(patientDto.getCaretakerId()).orElseThrow(() -> new AppBadRequestException("Caretaker does not exist.")));
        if (caretaker.getRole() != Role.CARETAKER) {
            throw new AppBadRequestException("Given caretaker is invalid.");
        }

        return caretaker;
    }

    public void deleteUser(int id) {
        val patient = this.patientRepository.findById(id);
        if (patient.isPresent()) {
            this.deletePatient(patient.get());
            return;
        }

        val caretaker = this.caretakerRepository.findById(id);
        if (caretaker.isPresent()) {
            this.deleteCaretaker(caretaker.get());
            return;
        }

        throw new AppBadRequestException("Could not delete given user.");
    }

    @Transactional
    public void deletePatient(Patient patient) {
        this.medicationPlanRepository.deleteAllByPatient(patient);
        this.patientRepository.delete(patient);
    }

    @Transactional
    public void deleteCaretaker(Caretaker caretaker) {
        val patients = caretaker.getPatients().parallelStream()
                .peek(patient -> patient.setCaretaker(null)).collect(Collectors.toList());
        this.patientRepository.saveAll(patients);
        this.caretakerRepository.delete(caretaker);
    }
}
