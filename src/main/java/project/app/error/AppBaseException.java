package project.app.error;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
public class AppBaseException extends RuntimeException {
    public AppBaseException(String message) {
        super(message);
    }
}
