package com.example.restapi.intro.dto;


import com.example.restapi.intro.annotations.studentage;
import jakarta.validation.constraints.*;

public class StudentDto {


    private int id;
    @NotBlank(message = "Name Field is Required")// for Strings use NotBlank
    @Size(min = 3,max = 8,message = "Number of Characters should be minium - 3 and maximum-8")//use @Size When you are Dealing with Strings
    private String name;
    @Email(message = "Email Should be a Valid Email")
    private String email;
//    @Max(value = 30,message = "Maximum Age should be 30")//Use @Max and @Min when you are dealing with Numbers
//    @Min(value = 18,message = "Minium Age should be 18")
    @Positive
    @studentage
    private Integer age;

    public Integer getPhonumber() {
        return phonenumber;
    }

    public void setPhonumber(Integer phonenumber) {
        this.phonenumber = phonenumber;
    }

    private Integer phonenumber;

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

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
