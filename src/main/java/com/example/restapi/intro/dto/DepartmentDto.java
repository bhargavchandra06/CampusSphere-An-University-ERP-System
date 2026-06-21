package com.example.restapi.intro.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public class DepartmentDto {

    private Long id;

    @NotBlank(message = "Department Name is Required")
    private String departmentName;

    public DepartmentDto() {
    }

    public List<StudentSummaryDto> getStudents() {
        return students;
    }

    public List<FacultySummaryDto> getFaculties() {
        return faculties;
    }

    public List<CourseSummaryDto> getCourses() {
        return courses;
    }

    public void setCourses(List<CourseSummaryDto> courses) {
        this.courses = courses;
    }

    private List<CourseSummaryDto> courses;

    public void setFaculties(List<FacultySummaryDto> faculties) {
        this.faculties = faculties;
    }

    private List<FacultySummaryDto> faculties;

    public void setStudents(List<StudentSummaryDto> students) {
        this.students = students;
    }

    private List<StudentSummaryDto> students;

    public Long getId() {
        return id;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }
}