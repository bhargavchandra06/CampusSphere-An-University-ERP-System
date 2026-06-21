package com.example.restapi.intro.controller;

import com.example.restapi.intro.dto.CourseDto;
import com.example.restapi.intro.dto.FacultyDto;
import com.example.restapi.intro.dto.StudentDto;
import com.example.restapi.intro.service.FacultyService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/faculties")
public class FacultyController {

    private final FacultyService facultyService;

    public FacultyController(
            FacultyService facultyService
    ) {
        this.facultyService = facultyService;
    }
    @GetMapping("/me")
    @PreAuthorize("hasRole('FACULTY')")
    public ResponseEntity<FacultyDto> getCurrentFaculty()
    {
        return ResponseEntity.ok(
                facultyService.getCurrentFaculty()
        );
    }
    @GetMapping("/me/courses")
    @PreAuthorize("hasRole('FACULTY')")
    public ResponseEntity<List<CourseDto>>
    getCurrentFacultyCourses()
    {
        return ResponseEntity.ok(
                facultyService.getCurrentFacultyCourses()
        );
    }
    @GetMapping("/me/courses/{courseId}/students")
    @PreAuthorize("hasRole('FACULTY')")
    public ResponseEntity<List<StudentDto>>
    getStudentsByMyCourse(
            @PathVariable Long courseId
    ) {
        return ResponseEntity.ok(
                facultyService.getStudentsByMyCourse(courseId)
        );
    }
    @GetMapping("/search")
    @PreAuthorize(
            "hasAnyRole('ADMIN','FACULTY','STUDENT')"
    )
    public ResponseEntity<List<FacultyDto>>
    searchFaculty(
            @RequestParam(defaultValue = "")
            String keyword
    )
    {
        return ResponseEntity.ok(
                facultyService.searchFaculty(keyword)
        );
    }



    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FacultyDto> createFaculty(
            @RequestBody @Valid FacultyDto facultyDto
    ) {
        return ResponseEntity.ok(
                facultyService.createFaculty(facultyDto)
        );
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<FacultyDto>> getAllFaculties()
    {
        return ResponseEntity.ok(
                facultyService.getAllFaculties()
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','STUDENT')")
    public ResponseEntity<FacultyDto> getFacultyById(
            @PathVariable Long id
    )
    {
        return ResponseEntity.ok(
                facultyService.getFacultyById(id)
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FacultyDto> updateFaculty(
            @PathVariable Long id,
            @RequestBody @Valid FacultyDto facultyDto
    )
    {
        return ResponseEntity.ok(
                facultyService.updateFaculty(
                        id,
                        facultyDto
                )
        );
    }
    @PutMapping("/{facultyId}/department/{departmentId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FacultyDto> assignDepartment(
            @PathVariable Long facultyId,
            @PathVariable Long departmentId
    )
    {
        return ResponseEntity.ok(
                facultyService.assignDepartment(
                        facultyId,
                        departmentId
                )
        );
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FacultyDto> partialUpdate(
            @PathVariable Long id,
            @RequestBody Map<String,Object> fields
    )
    {
        return ResponseEntity.ok(
                facultyService.partialUpdate(
                        id,
                        fields
                )
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean> deleteFaculty(
            @PathVariable Long id
    )
    {
        return ResponseEntity.ok(
                facultyService.deleteFaculty(id)
        );
    }
    @GetMapping("/{facultyId}/courses")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<CourseDto>>
    getCoursesByFaculty(
            @PathVariable Long facultyId
    )
    {
        return ResponseEntity.ok(
                facultyService.getCoursesByFaculty(
                        facultyId
                )
        );
    }
}