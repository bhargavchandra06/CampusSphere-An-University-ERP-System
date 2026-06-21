package com.example.restapi.intro.dto;


import com.example.restapi.intro.annotations.studentage;
import jakarta.persistence.Column;
import jakarta.validation.constraints.*;

import java.util.List;

public class StudentDto {


    private int id;

    public String getRollNo() {
        return rollNo;
    }

    public void setRollNo(String rollNo) {
        this.rollNo = rollNo;
    }

    @NotBlank(message = "Roll number is required")
    private String rollNo;
    @NotBlank(message = "Name Field is Required")// for Strings use NotBlank
    @Size(min = 3,max = 15,message = "Number of Characters should be minium - 3 and maximum-15")//use @Size When you are Dealing with Strings
    private String name;
    @Email(message = "Email Should be a Valid Email")
    private String email;

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    //    @Max(value = 30,message = "Maximum Age should be 30")//Use @Max and @Min when you are dealing with Numbers
//    @Min(value = 18,message = "Minium Age should be 18")
    @Positive
    @studentage
    private Integer age;

    private AddressDto address;

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

    public AddressDto getAddress() {
        return address;
    }

    public void setAddress(AddressDto address) {
        this.address = address;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }
    @NotBlank(message = "Phone number Field is Required")
    @Size(max = 10,message = "Maximum 10 number are allowed")
    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Phone number must contain exactly 10 digits"
    )
    private String phonenumber;



    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    @Min(value = 1, message = "Year should be at least 1")
    @Max(value = 4, message = "Year cannot exceed 4")
    private Integer year;

    public StudentDto() {
    }
    public int getId()
    {
        return  id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


}
