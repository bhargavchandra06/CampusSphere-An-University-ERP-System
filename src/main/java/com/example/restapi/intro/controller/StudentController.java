package com.example.restapi.intro.controller;
import org.springframework.data.domain.Page;
import com.example.restapi.intro.dto.DepartmentDto;
import com.example.restapi.intro.dto.StudentDto;
import com.example.restapi.intro.entity.StudentEntity;
import com.example.restapi.intro.exceptions.ResourceNotFoundException;
import com.example.restapi.intro.respository.StudentRepository;
import com.example.restapi.intro.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.restapi.intro.dto.CourseDto;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;


@RestController
@RequestMapping("/student")
public class StudentController {
  private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentDto> getStudent(@PathVariable Integer id)
    {
        Optional<StudentDto> studentDto =  studentService.getStudentbyId(id);
        return studentDto
                .map(ResponseEntity::ok).orElseThrow(()-> new ResourceNotFoundException("Student not found with id : "+id));
    }

    @GetMapping
    public ResponseEntity<List<StudentDto>> getallStudents(@RequestParam(required = false) Integer id,@RequestParam(required = false) String name)
    {
        return ResponseEntity.ok(studentService.getAllStudents());
    }
    @GetMapping("/check/age-range")
    public ResponseEntity<List<StudentDto>> getStudentsByAgeRange(
            @RequestParam Integer minAge,
            @RequestParam Integer maxAge
    )
    {
        return ResponseEntity.ok(studentService.getStudentsByAgeRange(
                minAge,
                maxAge
        ));
    }
    @GetMapping("/sort")
    public ResponseEntity<List<StudentDto>> sortStudents(
            @RequestParam String field,
            @RequestParam String direction
    )
    {
        return ResponseEntity.ok(
                studentService.sortStudents(field, direction)
        );
    }
    @GetMapping("/{studentId}/department")
    public ResponseEntity<DepartmentDto>
    getDepartmentByStudentId(
            @PathVariable Integer studentId
    )
    {
        return ResponseEntity.ok(
                studentService.getDepartmentByStudentId(
                        studentId
                )
        );
    }
    @GetMapping("/page")
    public ResponseEntity<Page<StudentDto>>
    getStudentsWithPagination(
            @RequestParam(defaultValue = "0")
            Integer pageNumber,

            @RequestParam(defaultValue = "5")
            Integer pageSize,

            @RequestParam(defaultValue = "id")
            String sortBy,

            @RequestParam(defaultValue = "asc")
            String sortDirection
    )
    {
        return ResponseEntity.ok(
                studentService.getStudentsWithPagination(
                        pageNumber,
                        pageSize,
                        sortBy,
                        sortDirection
                )
        );
    }
    @GetMapping("/{studentId}/courses")
    public ResponseEntity<List<CourseDto>> getCoursesByStudent(
            @PathVariable Integer studentId
    )
    {
        return ResponseEntity.ok(
                studentService.getCoursesByStudent(
                        studentId
                )
        );
    }
    @PostMapping
    public ResponseEntity<StudentDto> createStudent(@RequestBody @Valid StudentDto studentDto)
    {

        StudentDto saved_student = studentService.createNewstudent(studentDto);
        return new ResponseEntity<>(saved_student, HttpStatus.CREATED);
    }
    @PostMapping("/test")
    public String test(@RequestBody @Valid StudentDto studentDto)
    {
        return studentDto.getName();
    }
    @PutMapping("/{id}")
    public ResponseEntity<StudentDto> updateStudent(@RequestBody @Valid StudentDto studentDto,@PathVariable Integer id)
    {
        return ResponseEntity.ok(studentService.updateStudentbyId(id,studentDto));
    }
    @PutMapping("/{studentId}/address/{addressId}")
    public ResponseEntity<StudentDto> assignAddress(
            @PathVariable Integer studentId,
            @PathVariable Long addressId
    )
    {
        return ResponseEntity.ok(
                studentService.assignAddress(
                        studentId,
                        addressId
                )
        );
    }
    @PutMapping("/{studentId}/department/{departmentId}")
    public ResponseEntity<StudentDto> assignDepartment(
            @PathVariable Integer studentId,
            @PathVariable Long departmentId
    )
    {
        return ResponseEntity.ok(
                studentService.assignDepartment(
                        studentId,
                        departmentId
                )
        );
    }
    @PutMapping("/{studentId}/course/{courseId}")
    public ResponseEntity<StudentDto> assignCourse(
            @PathVariable Integer studentId,
            @PathVariable Long courseId
    )
    {
        return ResponseEntity.ok(
                studentService.assignCourse(
                        studentId,
                        courseId
                )
        );
    }
    @DeleteMapping("/{studentId}/course/{courseId}")
    public ResponseEntity<StudentDto> removeCourse(
            @PathVariable Integer studentId,
            @PathVariable Long courseId
    )
    {
        return ResponseEntity.ok(
                studentService.removeCourse(
                        studentId,
                        courseId
                )
        );
    }
    @DeleteMapping("{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Integer id)
    {
        boolean gotDeleted = studentService.deletebyId(id);
        if(gotDeleted) return ResponseEntity.ok(true);
        return  ResponseEntity.notFound().build();
    }
    @PatchMapping("/{id}")
    public ResponseEntity<StudentDto> update(@RequestBody Map<String,Object> mp,@PathVariable Integer id)
    {
        StudentDto studentDto = studentService.update_Partial(mp,id);
        if(studentDto==null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(studentDto);
    }
}
