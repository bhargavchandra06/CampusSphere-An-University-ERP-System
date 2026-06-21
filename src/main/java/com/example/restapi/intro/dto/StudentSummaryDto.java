package com.example.restapi.intro.dto;

public class StudentSummaryDto {

    private Integer id;

    private String rollNo;

    private String name;

    public StudentSummaryDto() {
    }

    public Integer getId() {
        return id;
    }

    public String getRollNo() {
        return rollNo;
    }

    public String getName() {
        return name;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setRollNo(String rollNo) {
        this.rollNo = rollNo;
    }

    public void setName(String name) {
        this.name = name;
    }
}