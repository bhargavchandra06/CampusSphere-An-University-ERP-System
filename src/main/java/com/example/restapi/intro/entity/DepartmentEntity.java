package com.example.restapi.intro.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "departments")
public class DepartmentEntity extends AuditingBaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String departmentName;

    @OneToMany(mappedBy = "department")
    @JsonBackReference
    private List<StudentEntity> students;

    public List<FacultyEntity> getFaculties() {
        return faculties;
    }

    public void setFaculties(List<FacultyEntity> faculties) {
        this.faculties = faculties;
    }

    @OneToMany(mappedBy = "department")
    @JsonBackReference
    private List<FacultyEntity> faculties = new ArrayList<>();

    public List<CourseEntity> getCourses() {
        return courses;
    }

    public void setCourses(List<CourseEntity> courses) {
        this.courses = courses;
    }

    @OneToMany(mappedBy = "department")
    @JsonBackReference
    private List<CourseEntity> courses = new ArrayList<>();

    public DepartmentEntity() {
    }

    public Long getId() {
        return id;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public List<StudentEntity> getStudents() {
        return students;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public void setStudents(List<StudentEntity> students) {
        this.students = students;
    }
}