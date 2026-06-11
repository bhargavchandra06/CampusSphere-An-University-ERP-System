package com.example.restapi.intro.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class FacultyDto {

    private Long id;

    @NotBlank(message = "Faculty name is required")
    private String facultyName;

    @Email(message = "Invalid email")
    private String email;

    @NotBlank(message = "Specialization is required")
    private String specialization;

    public FacultyDto() {
    }

    public Long getId() {
        return id;
    }

    public String getFacultyName() {
        return facultyName;
    }

    public String getEmail() {
        return email;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFacultyName(String facultyName) {
        this.facultyName = facultyName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }
}