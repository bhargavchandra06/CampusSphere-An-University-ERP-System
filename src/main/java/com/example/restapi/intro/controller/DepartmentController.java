package com.example.restapi.intro.controller;

import com.example.restapi.intro.dto.DepartmentDto;
import com.example.restapi.intro.dto.StudentDto;
import com.example.restapi.intro.service.DepartmentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(
            DepartmentService departmentService
    ) {
        this.departmentService = departmentService;
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DepartmentDto> createDepartment(
            @RequestBody @Valid DepartmentDto dto
    )
    {
        return ResponseEntity.ok(
                departmentService.createDepartment(dto)
        );
    }

    @GetMapping("/search")
    @PreAuthorize(
            "hasAnyRole('ADMIN','FACULTY','STUDENT')"
    )
    public ResponseEntity<List<DepartmentDto>>
    searchDepartments(
            @RequestParam(defaultValue = "")
            String keyword
    )
    {
        return ResponseEntity.ok(
                departmentService.searchDepartments(
                        keyword
                )
        );
    }

    @GetMapping("/all")
    @PreAuthorize(
            "hasAnyRole('ADMIN','FACULTY','STUDENT')"
    )
    public ResponseEntity<List<DepartmentDto>>
    getAllDepartments()
    {
        return ResponseEntity.ok(
                departmentService.getAllDepartments()
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize(
            "hasAnyRole('ADMIN','FACULTY','STUDENT')"
    )
    public ResponseEntity<DepartmentDto>
    getDepartmentById(
            @PathVariable Long id
    )
    {
        return ResponseEntity.ok(
                departmentService.getDepartmentById(id)
        );
    }

    @GetMapping("/{departmentName}/students")
    @PreAuthorize(
            "hasAnyRole('ADMIN','FACULTY')"
    )
    public ResponseEntity<List<StudentDto>>
    getStudentsByDepartmentName(
            @PathVariable String departmentName
    )
    {
        return ResponseEntity.ok(
                departmentService
                        .getStudentsByDepartmentName(
                                departmentName
                        )
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DepartmentDto>
    updateDepartment(
            @PathVariable Long id,
            @RequestBody @Valid DepartmentDto dto
    )
    {
        return ResponseEntity.ok(
                departmentService.updateDepartment(
                        id,
                        dto
                )
        );
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DepartmentDto>
    partialUpdate(
            @PathVariable Long id,
            @RequestBody Map<String,Object> fields
    )
    {
        return ResponseEntity.ok(
                departmentService.partialUpdate(
                        id,
                        fields
                )
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean>
    deleteDepartment(
            @PathVariable Long id
    )
    {
        return ResponseEntity.ok(
                departmentService.deleteDepartment(id)
        );
    }
}