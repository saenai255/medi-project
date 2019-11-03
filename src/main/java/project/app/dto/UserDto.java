package project.app.dto;

import lombok.*;
import project.app.entity.Caretaker;
import project.app.entity.Patient;
import project.app.entity.User;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class UserDto {
    private int id;
    private String firstName;
    private String lastName;
    private String birthName;
    private boolean isMale;
    private String address;
    private String username;
    private String password;
    private LocalDate birthDate;

    public static void mapTo(User user, UserDto userDto) {
        user.setAddress(userDto.getAddress());
        user.setBirthDate(userDto.getBirthDate());
        user.setBirthName(userDto.getBirthName());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setMale(userDto.isMale());
        user.setUsername(userDto.getUsername());

        if (user.getPassword() != null && user.getPassword().length() > 0) {
            if (userDto.getPassword() != null && userDto.getPassword().length() > 0) {
                user.setPassword(userDto.getPassword());
            }
        } else {
            user.setPassword(userDto.getPassword());
        }

        user.setId(user.getId());
    }
}
