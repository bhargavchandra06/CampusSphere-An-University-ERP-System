package com.example.restapi.intro.controller;
import com.example.restapi.intro.auth.dto.UserDto;
import com.example.restapi.intro.dto.*;
import com.example.restapi.intro.projections.StudentNameEmailProjection;
import org.springframework.data.domain.Page;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.example.restapi.intro.exceptions.ResourceNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import com.example.restapi.intro.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Tag(
        name = "Student APIs",
        description = "Operations related to students"
)
@RestController
@RequestMapping("/student")
public class StudentController {
  private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @Operation(
            summary = "Get Student By Id",
            description = "Returns a student using student id"
    )
    @GetMapping("/me")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<StudentDto> getCurrentStudent()
    {
        return ResponseEntity.ok(
                studentService.getCurrentStudent()
        );
    }
    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN','FACULTY')")
    public ResponseEntity<List<StudentDto>>
    searchStudents(
            @RequestParam(required = false, defaultValue = "") String keyword
    )
    {
        return ResponseEntity.ok(
                studentService.searchStudents(
                        keyword
                )
        );
    }
    @GetMapping("/me/department")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<DepartmentDto> getMyDepartment()
    {
        return ResponseEntity.ok(
                studentService.getCurrentStudentDepartment()
        );
    }
    @GetMapping("/me/courses")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<CourseDto>> getMyCourses()
    {
        return ResponseEntity.ok(
                studentService.getCurrentStudentCourses()
        );
    }
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','FACULTY')")
    public ResponseEntity<StudentDto> getStudent(@PathVariable Integer id)
    {
        Optional<StudentDto> studentDto =  studentService.getStudentbyId(id);
        return studentDto
                .map(ResponseEntity::ok).orElseThrow(()-> new ResourceNotFoundException("Student not found with id : "+id));
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ADMIN','FACULTY')")
    public ResponseEntity<List<StudentDto>> getallStudents(@RequestParam(required = false) Integer id,@RequestParam(required = false) String name)
    {
        return ResponseEntity.ok(studentService.getAllStudents());
    }
    @GetMapping("/check/age-range")
    @PreAuthorize("hasAnyRole('ADMIN','FACULTY')")
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
    @PreAuthorize("hasAnyRole('ADMIN','FACULTY')")
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
    @PreAuthorize("hasAnyRole('ADMIN','FACULTY')")
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
    @PreAuthorize("hasAnyRole('ADMIN','FACULTY')")
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
    @PreAuthorize("hasAnyRole('ADMIN','FACULTY')")
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
    @GetMapping("/projection")
    @PreAuthorize("hasAnyRole('ADMIN','FACULTY')")
    public ResponseEntity<List<StudentNameEmailProjection>>
    getStudentProjection()
    {
        return ResponseEntity.ok(
                studentService
                        .getStudentNamesAndEmails()
        );
    }
    @GetMapping("/filter")
    @PreAuthorize("hasAnyRole('ADMIN','FACULTY')")
    public ResponseEntity<List<StudentDto>>
    filterStudents(
            @RequestParam(required = false)
            String name,

            @RequestParam(required = false)
            Integer age,

            @RequestParam(required = false)
            String department
    )
    {
        return ResponseEntity.ok(
                studentService.filterStudents(
                        name,
                        age,
                        department
                )
        );
    }
    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StudentDto> createStudent(@RequestBody @Valid StudentDto studentDto)
    {

        StudentDto saved_student = studentService.createNewstudent(studentDto);
        return new ResponseEntity<>(saved_student, HttpStatus.CREATED);
    }
    @PostMapping("/test")
    @PreAuthorize("hasRole('ADMIN')")
    public String test(@RequestBody @Valid StudentDto studentDto)
    {
        return studentDto.getName();
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StudentDto> updateStudent(@RequestBody @Valid StudentDto studentDto,@PathVariable Integer id)
    {
        return ResponseEntity.ok(studentService.updateStudentbyId(id,studentDto));
    }
    @PutMapping("/{studentId}/address/{addressId}")
    @PreAuthorize("hasRole('ADMIN')")
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
    @GetMapping("/advice")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> getAdvice() throws Exception
    {
        return ResponseEntity.ok(
                studentService.getAdvice()
        );
    }
    @PutMapping("/{studentId}/address")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StudentDto> assignNewAddress(
            @PathVariable Integer studentId,
            @RequestBody @Valid AddressDto addressDto
    )
    {
        return ResponseEntity.ok(
                studentService.assignNewAddress(
                        studentId,
                        addressDto
                )
        );
    }
    @GetMapping("/external-user")
    @PreAuthorize("hasRole('ADMIN')")

    public ResponseEntity<UserDto> getExternalUser()
    {
        return ResponseEntity.ok(
                studentService.getExternalUser()
        );
    }

    @PutMapping("/{studentId}/department/{departmentId}")
    @PreAuthorize("hasRole('ADMIN')")
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
    @PreAuthorize("hasRole('ADMIN')")
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
    @PreAuthorize("hasRole('ADMIN')")
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
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean> delete(@PathVariable Integer id)
    {
        boolean gotDeleted = studentService.deletebyId(id);
        if(gotDeleted) return ResponseEntity.ok(true);
        return  ResponseEntity.notFound().build();
    }
    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StudentDto> update(@RequestBody Map<String,Object> mp,@PathVariable Integer id)
    {
        StudentDto studentDto = studentService.update_Partial(mp,id);
        if(studentDto==null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(studentDto);
    }

}
