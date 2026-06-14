package com.example.restapi.intro.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "courses")
public class CourseEntity extends AuditingBaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String courseName;

    @Column(nullable = false, unique = true)
    private String courseCode;

    @Column(nullable = false)
    private Integer credits;

    @ManyToOne
    @JoinColumn(name = "faculty_id")
    private FacultyEntity faculty;

    @ManyToMany(mappedBy = "courses")
    private List<StudentEntity> students = new ArrayList<>();

    public CourseEntity() {
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

    public FacultyEntity getFaculty() {
        return faculty;
    }

    public List<StudentEntity> getStudents() {
        return students;
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

    public void setFaculty(FacultyEntity faculty) {
        this.faculty = faculty;
    }

    public void setStudents(List<StudentEntity> students) {
        this.students = students;
    }
}