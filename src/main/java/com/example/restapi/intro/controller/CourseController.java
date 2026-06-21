package com.example.restapi.intro.controller;

import com.example.restapi.intro.dto.CourseDto;
import com.example.restapi.intro.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.example.restapi.intro.dto.StudentDto;

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

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CourseDto> createCourse(
            @RequestBody @Valid CourseDto dto
    )
    {
        return ResponseEntity.ok(
                courseService.createCourse(dto)
        );
    }

    @GetMapping("/all")
    @PreAuthorize(
            "hasAnyRole('ADMIN','FACULTY','STUDENT')"
    )
    public ResponseEntity<List<CourseDto>>
    getAllCourses()
    {
        return ResponseEntity.ok(
                courseService.getAllCourses()
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize(
            "hasAnyRole('ADMIN','FACULTY','STUDENT')"
    )
    public ResponseEntity<CourseDto>
    getCourseById(
            @PathVariable Long id
    )
    {
        return ResponseEntity.ok(
                courseService.getCourseById(id)
        );
    }
    @GetMapping("/{courseId}/students")
    @PreAuthorize(
            "hasAnyRole('ADMIN','FACULTY')"
    )
    public ResponseEntity<List<StudentDto>>
    getStudentsByCourse(
            @PathVariable Long courseId
    )
    {
        return ResponseEntity.ok(
                courseService.getStudentsByCourse(
                        courseId
                )
        );
    }
    @GetMapping("/search")
    @PreAuthorize(
            "hasAnyRole('ADMIN','FACULTY','STUDENT')"
    )
    public ResponseEntity<List<CourseDto>>
    searchCourses(
            @RequestParam(defaultValue = "")
            String keyword
    )
    {
        return ResponseEntity.ok(
                courseService.searchCourses(
                        keyword
                )
        );
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
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
    @PutMapping("/{courseId}/department/{departmentId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CourseDto> assignDepartment(
            @PathVariable Long courseId,
            @PathVariable Long departmentId
    )
    {
        return ResponseEntity.ok(
                courseService.assignDepartment(
                        courseId,
                        departmentId
                )
        );
    }


    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
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
    @PreAuthorize("hasRole('ADMIN')")
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
    @PreAuthorize("hasRole('ADMIN')")
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

    @DeleteMapping("/{courseId}/faculty")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CourseDto> removeFaculty(
            @PathVariable Long courseId
    )
    {
        return ResponseEntity.ok(
                courseService.removeFaculty(
                        courseId
                )
        );
    }
}