package com.example.restapi.intro.dto;

import jakarta.validation.constraints.*;

import java.util.List;

public class CourseDto {

    private Long id;

    @NotBlank(message = "Course Name is required")
    private String courseName;

    @NotBlank(message = "Course Code is required")
    private String courseCode;

    @Min(value = 1, message = "Credits must be at least 1")
    @Max(value = 6, message = "Credits cannot exceed 6")
    private Integer credits;



    public DepartmentDto getDepartment() {
        return department;
    }

    public void setDepartment(DepartmentDto department) {
        this.department = department;
    }

    private DepartmentDto department;

    public List<StudentSummaryDto> getStudents() {
        return students;
    }

    public void setStudents(List<StudentSummaryDto> students) {
        this.students = students;
    }

    private List<StudentSummaryDto> students;

    public FacultySummaryDto getFaculty() {
        return faculty;
    }

    public void setFaculty(FacultySummaryDto faculty) {
        this.faculty = faculty;
    }

    private FacultySummaryDto faculty;
    public CourseDto() {
    }

    public Long getId() {
        return id;
    }

    public String getCourseName() {
        return courseName;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public Integer getCredits() {
        return credits;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public void setCredits(Integer credits) {
        this.credits = credits;
    }
}