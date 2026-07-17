package com.example.demo.dto.response;

/**
 * Simple DTO for returning a message in API responses.
 */
public class MessageResponse {

    private String message;

    public MessageResponse(String message) {
        this.message = message;
    }

    // Getter

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
