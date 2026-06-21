    package com.example.restapi.intro.entity;
    import com.example.restapi.intro.auth.entity.UserEntity;
    import com.fasterxml.jackson.annotation.JsonBackReference;
    import jakarta.persistence.*;

    import java.util.List;

    @Entity
    @Table(name = "faculties")
    public class FacultyEntity extends AuditingBaseEntity{

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false)
        private String facultyName;

        @Column(nullable = false, unique = true)
        private String email;

        public DepartmentEntity getDepartment() {
            return department;
        }

        public void setDepartment(DepartmentEntity department) {
            this.department = department;
        }

        @ManyToOne
        @JoinColumn(name = "department_id")
        private DepartmentEntity department;

        public String getDesignation() {
            return designation;
        }

        public void setDesignation(String designation) {
            this.designation = designation;
        }

        @Column(nullable = false)
        private String designation;

        public UserEntity getUser() {
            return user;
        }

        public void setUser(UserEntity user) {
            this.user = user;
        }

        @OneToOne
        @JoinColumn(
                name = "user_id",
                unique = true
        )
        private UserEntity user;

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