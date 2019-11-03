package project.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@NoArgsConstructor
@ToString(of = "id")
@EqualsAndHashCode(of = "id")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Enumerated
    private Role role;
    private String firstName;
    private String lastName;
    private String birthName;
    private boolean isMale;
    private String address;
    @Column(unique = true)
    private String username;
    @JsonIgnore
    private String password;
    private LocalDate birthDate;
}
