package com.example.restapi.intro.controller;

import com.example.restapi.intro.dto.CourseDto;
import com.example.restapi.intro.dto.FacultyDto;
import com.example.restapi.intro.service.FacultyService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
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

    @PostMapping
    public ResponseEntity<FacultyDto> createFaculty(
            @RequestBody @Valid FacultyDto facultyDto
    ) {
        return ResponseEntity.ok(
                facultyService.createFaculty(facultyDto)
        );
    }

    @GetMapping
    public ResponseEntity<List<FacultyDto>> getAllFaculties()
    {
        return ResponseEntity.ok(
                facultyService.getAllFaculties()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<FacultyDto> getFacultyById(
            @PathVariable Long id
    )
    {
        return ResponseEntity.ok(
                facultyService.getFacultyById(id)
        );
    }

    @PutMapping("/{id}")
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

    @PatchMapping("/{id}")
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
    public ResponseEntity<Boolean> deleteFaculty(
            @PathVariable Long id
    )
    {
        return ResponseEntity.ok(
                facultyService.deleteFaculty(id)
        );
    }
    @GetMapping("/{facultyId}/courses")
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