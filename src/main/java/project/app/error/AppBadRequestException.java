package project.app.error;

public class AppBadRequestException extends AppBaseException {
    public AppBadRequestException(String message) {
        super(message);
    }
}
