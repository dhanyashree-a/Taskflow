package com.taskflow.backend.auth;

public class AuthResponse {

    private String message;
    private String token;
    private String name;

    public AuthResponse() {
    }

    public AuthResponse(String message, String token, String name) {
        this.message = message;
        this.token = token;
        this.name = name;
    }

    public String getMessage() {
        return message;
    }

    public String getToken() {
        return token;
    }

    public String getName() {
        return name;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setName(String name) {
        this.name = name;
    }
}