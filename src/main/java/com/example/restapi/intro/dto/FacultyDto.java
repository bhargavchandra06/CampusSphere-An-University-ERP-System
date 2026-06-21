package com.example.restapi.intro.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public class FacultyDto {

    private Long id;

    @NotBlank(message = "Faculty name is required")
    private String facultyName;

    @Email(message = "Invalid email")
    private String email;

    public DepartmentDto getDepartment() {
        return department;
    }

    public void setDepartment(DepartmentDto department) {
        this.department = department;
    }

    private DepartmentDto department;

    public List<CourseSummaryDto> getCourses() {
        return courses;
    }

    public void setCourses(List<CourseSummaryDto> courses) {
        this.courses = courses;
    }

    private List<CourseSummaryDto> courses;

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    @NotBlank(message = "Designation is required")
    private String  designation;





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



    public void setId(Long id) {
        this.id = id;
    }

    public void setFacultyName(String facultyName) {
        this.facultyName = facultyName;
    }

    public void setEmail(String email) {
        this.email = email;
    }


}