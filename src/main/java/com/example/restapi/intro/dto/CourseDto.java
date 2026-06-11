package com.example.restapi.intro.dto;

import jakarta.validation.constraints.*;

public class CourseDto {

    private Long id;

    @NotBlank(message = "Course Name is required")
    private String courseName;

    @NotBlank(message = "Course Code is required")
    private String courseCode;

    @Min(value = 1, message = "Credits must be at least 1")
    @Max(value = 6, message = "Credits cannot exceed 6")
    private Integer credits;

    private FacultyDto faculty;

    public FacultyDto getFaculty() {
        return faculty;
    }

    public void setFaculty(FacultyDto faculty) {
        this.faculty = faculty;
    }
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