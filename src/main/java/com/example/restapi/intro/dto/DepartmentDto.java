package com.example.restapi.intro.dto;

import jakarta.validation.constraints.NotBlank;

public class DepartmentDto {

    private Long id;

    @NotBlank(message = "Department Name is Required")
    private String departmentName;

    public DepartmentDto() {
    }

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