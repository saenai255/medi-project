package project.app.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import project.app.dto.CaretakerDto;
import project.app.dto.PatientDto;
import project.app.entity.Caretaker;
import project.app.entity.Patient;
import project.app.error.AppBadRequestException;
import project.app.repository.CaretakerRepository;
import project.app.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/caretaker")
@RequiredArgsConstructor
public class CaretakerController {
    private final UserService userService;
    private final CaretakerRepository caretakerRepository;

    @PostMapping
    public Caretaker postUser(@RequestBody CaretakerDto dto) {
        return this.userService.persistCaretaker(dto);
    }

    @GetMapping
    public List<Caretaker> getAll() {
        return this.caretakerRepository.findAll();
    }

    @GetMapping("/{id}")
    public Caretaker getOne(@PathVariable int id) {
        return this.caretakerRepository.findById(id).orElseThrow(() -> new AppBadRequestException("Could not find caretaker."));
    }
}
