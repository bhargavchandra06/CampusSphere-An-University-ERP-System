package com.example.restapi.intro.controller;

import com.example.restapi.intro.dto.CourseDto;
import com.example.restapi.intro.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(
            CourseService courseService
    ) {
        this.courseService = courseService;
    }

    @PostMapping
    public ResponseEntity<CourseDto> createCourse(
            @RequestBody @Valid CourseDto dto
    )
    {
        return ResponseEntity.ok(
                courseService.createCourse(dto)
        );
    }

    @GetMapping
    public ResponseEntity<List<CourseDto>>
    getAllCourses()
    {
        return ResponseEntity.ok(
                courseService.getAllCourses()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDto>
    getCourseById(
            @PathVariable Long id
    )
    {
        return ResponseEntity.ok(
                courseService.getCourseById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseDto>
    updateCourse(
            @PathVariable Long id,
            @RequestBody @Valid CourseDto dto
    )
    {
        return ResponseEntity.ok(
                courseService.updateCourse(id,dto)
        );
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CourseDto>
    partialUpdate(
            @PathVariable Long id,
            @RequestBody Map<String,Object> fields
    )
    {
        return ResponseEntity.ok(
                courseService.partialUpdate(id,fields)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean>
    deleteCourse(
            @PathVariable Long id
    )
    {
        return ResponseEntity.ok(
                courseService.deleteCourse(id)
        );
    }

    @PutMapping("/{courseId}/faculty/{facultyId}")
    public ResponseEntity<CourseDto>
    assignFaculty(
            @PathVariable Long courseId,
            @PathVariable Long facultyId
    )
    {
        return ResponseEntity.ok(
                courseService.assignFaculty(
                        courseId,
                        facultyId
                )
        );
    }
}