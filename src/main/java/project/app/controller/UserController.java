package project.app.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import project.app.entity.Patient;
import project.app.entity.User;
import project.app.error.AppBadRequestException;
import project.app.repository.UserRepository;
import project.app.service.UserService;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;

    @GetMapping
    public User getUser() {
        return userService.getPrincipal();
    }

    @DeleteMapping("/{id}")
    public void deleteOne(@PathVariable int id) {
        userService.deleteUser(id);
    }


    @GetMapping("/{id}")
    public User getOne(@PathVariable int id) {
        return this.userRepository.findById(id).orElseThrow(() -> new AppBadRequestException("Could not find user."));
    }
}