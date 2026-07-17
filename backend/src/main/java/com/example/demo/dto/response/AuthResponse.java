package com.example.demo.dto.response;

import java.util.List;

/**
 * DTO for authentication response containing JWT token and user information.
 */
public class AuthResponse {

    private String token;
    private String type = "Bearer";
    private String username;
    private String email;
    private List<String> roles;

    public AuthResponse(String token, String username, String email, List<String> roles) {
        this.token = token;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }

    // Getters

    public String getToken() {
        return token;
    }

    public String getType() {
        return type;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public List<String> getRoles() {
        return roles;
    }
}
