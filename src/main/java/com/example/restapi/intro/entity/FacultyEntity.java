package com.example.restapi.intro.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "faculties")
public class FacultyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String facultyName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String specialization;

    public List<CourseEntity> getCourses() {
        return courses;
    }

    public void setCourses(List<CourseEntity> courses) {
        this.courses = courses;
    }

    @OneToMany(mappedBy = "faculty")
    @JsonBackReference
    private List<CourseEntity> courses;

    public FacultyEntity() {
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