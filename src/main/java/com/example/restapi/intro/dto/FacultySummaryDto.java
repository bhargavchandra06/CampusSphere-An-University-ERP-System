package com.example.restapi.intro.dto;

public class FacultySummaryDto {

    private Long id;

    private String facultyName;

    private String email;

    private String designation;

    public FacultySummaryDto() {
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

    public String getDesignation() {
        return designation;
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

    public void setDesignation(String designation) {
        this.designation = designation;
    }
}