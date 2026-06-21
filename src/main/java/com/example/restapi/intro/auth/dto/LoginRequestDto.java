package com.example.restapi.intro.auth.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginRequestDto {

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @NotBlank
    private String username;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @NotBlank
    private String password;
}