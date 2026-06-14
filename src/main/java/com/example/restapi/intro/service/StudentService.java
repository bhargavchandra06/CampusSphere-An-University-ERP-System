package com.example.restapi.intro.service;
import org.springframework.http.MediaType;
import com.example.restapi.intro.dto.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.client.RestClient;
import com.example.restapi.intro.entity.AddressEntity;
import com.example.restapi.intro.entity.DepartmentEntity;
import com.example.restapi.intro.entity.StudentEntity;
import com.example.restapi.intro.exceptions.ResourceNotFoundException;
import com.example.restapi.intro.projections.StudentNameEmailProjection;
import com.example.restapi.intro.respository.AddressRepository;
import com.example.restapi.intro.entity.CourseEntity;
import com.example.restapi.intro.respository.CourseRepository;
import com.example.restapi.intro.respository.DepartmentRepository;
import com.example.restapi.intro.respository.StudentRepository;
import com.example.restapi.intro.specifications.StudentSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import lombok.Getter;
import lombok.Setter;
import org.jspecify.annotations.Nullable;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ReflectionUtils;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Getter
@Setter
@Service
public class StudentService {

 private final StudentRepository studentRepository;
 private final DepartmentRepository departmentRepository;
 private final AddressRepository addressRepository;
    private final CourseRepository courseRepository;

    public StudentService(StudentRepository studentRepository, DepartmentRepository departmentRepository, AddressRepository addressRepository, CourseRepository courseRepository, ObjectMapper objectMapper, ModelMapper modelMapper, RestClient restClient) {
        this.studentRepository = studentRepository;
        this.departmentRepository = departmentRepository;
        this.addressRepository = addressRepository;
        this.courseRepository = courseRepository;
        this.objectMapper = objectMapper;
        this.modelMapper = modelMapper;
        this.restClient = restClient;
    }

    private final ObjectMapper objectMapper;


    private final ModelMapper modelMapper;
    private final RestClient restClient;

    public Optional<StudentDto> getStudentbyId(Integer id)
    {
        Optional<StudentEntity> studentEntity =  studentRepository.findById(id);
        return studentEntity.map(studentEntity1 -> modelMapper.map(studentEntity1,StudentDto.class));
    }
    public List<StudentDto> getAllStudents()
    {
        List<StudentEntity> studentEntities = studentRepository.findAll();
//        return  studentEntities.stream()
//                .map(studentEntity -> modelMapper.map(studentEntity,StudentDto.class)).collect(Collectors.toList());
        List<StudentDto> studentDtos = new ArrayList<>();
        for(StudentEntity studentEntity : studentEntities)
        {
            StudentDto studentDto = modelMapper.map(studentEntity,StudentDto.class);
            studentDtos.add(studentDto);
        }
        return studentDtos;
   }
    public StudentDto createNewstudent(StudentDto studentDto)
    {
        StudentEntity toSaveEntity =
                modelMapper.map(studentDto, StudentEntity.class);

        if(toSaveEntity.getAddress() != null)
        {
            toSaveEntity.getAddress()
                    .setStudent(toSaveEntity);
        }

        StudentEntity savedEntity =
                studentRepository.save(toSaveEntity);

        return modelMapper.map(
                savedEntity,
                StudentDto.class
        );

    }
    public StudentDto updateStudentbyId(Integer id, StudentDto studentDto) {
        is_exit(id);
        StudentEntity existing =
                studentRepository.findById(id)
                        .orElseThrow();

        modelMapper.map(studentDto, existing);

        existing.setId(id);

        StudentEntity saved =
                studentRepository.save(existing);

        return modelMapper.map(saved, StudentDto.class);
    }
    public void is_exit(Integer id)
    {
        boolean exits = studentRepository.existsById(id);
        if(!exits) throw new ResourceNotFoundException("Student not found with id : "+id);
    }
    public boolean deletebyId(Integer id) {
        is_exit(id);
        studentRepository.deleteById(id);
        return true;
    }
    @Transactional
    public StudentDto assignAddress(
            Integer studentId,
            Long addressId
    )
    {
        StudentEntity student =
                studentRepository.findById(studentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Student not found with id : " + studentId
                                )
                        );

        AddressEntity address =
                addressRepository.findById(addressId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Address not found with id : " + addressId
                                )
                        );

        student.setAddress(address);
        address.setStudent(student);

        return modelMapper.map(
                student,
                StudentDto.class
        );
    }
    @Transactional
    public StudentDto assignDepartment(
            Integer studentId,
            Long departmentId
    )
    {
        StudentEntity student =
                studentRepository.findById(studentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Student not found with id : "
                                                + studentId
                                )
                        );

        DepartmentEntity department =
                departmentRepository.findById(departmentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Department not found with id : "
                                                + departmentId
                                )
                        );

        student.setDepartment(department);

        return modelMapper.map(
                student,
                StudentDto.class
        );
    }
    @Transactional
    public StudentDto assignCourse(
            Integer studentId,
            Long courseId
    )
    {
        StudentEntity student =
                studentRepository.findById(studentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Student not found with id : "
                                                + studentId
                                )
                        );

        CourseEntity course =
                courseRepository.findById(courseId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Course not found with id : "
                                                + courseId
                                )
                        );

        student.getCourses().add(course);

        return modelMapper.map(
                student,
                StudentDto.class
        );
    }
    @Transactional
    public StudentDto removeCourse(
            Integer studentId,
            Long courseId
    )
    {
        StudentEntity student =
                studentRepository.findById(studentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Student not found with id : "
                                                + studentId
                                )
                        );

        student.getCourses()
                .removeIf(course ->
                        course.getId().equals(courseId));

        return modelMapper.map(
                student,
                StudentDto.class
        );
    }

    public StudentDto update_Partial(Map<String, Object> mp, Integer id) {

         is_exit(id);
        StudentEntity studentEntity = studentRepository.findById(id)
                .orElseThrow();

        mp.forEach((fieldName, value) -> {

            Field field = ReflectionUtils.findField(
                    StudentEntity.class,
                    fieldName
            );

            if(field != null) {
                field.setAccessible(true);
                ReflectionUtils.setField(
                        field,
                        studentEntity,
                        value
                );
            }
        });

        StudentEntity saved =
                studentRepository.save(studentEntity);

        return modelMapper.map(
                saved,
                StudentDto.class
        );
    }

    public List<StudentDto> getStudentsByAgeRange(Integer minAge, Integer maxAge) {
        return studentRepository
                .findByAgeGreaterThanAndAgeLessThan(minAge,maxAge)
                .stream()
                .map(student ->
                        modelMapper.map(student,StudentDto.class))
                .toList();
    }

    public List<StudentDto> sortStudents(
            String field,
            String direction
    )
    {
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(field).descending()
                : Sort.by(field).ascending();

        return studentRepository.findAll(sort)
                .stream()
                .map(student ->
                        modelMapper.map(student, StudentDto.class))
                .toList();
    }
    public Page<StudentDto> getStudentsWithPagination(
            Integer pageNumber,
            Integer pageSize,
            String sortBy,
            String sortDirection
    )
    {
        Sort sort = sortDirection.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable =
                PageRequest.of(
                        pageNumber,
                        pageSize,
                        sort
                );

        Page<StudentEntity> students =
                studentRepository.findAll(pageable);

        return students.map(student ->
                modelMapper.map(
                        student,
                        StudentDto.class
                ));
    }

    public DepartmentDto getDepartmentByStudentId(
            Integer studentId
    )
    {
        StudentEntity student =
                studentRepository.findById(studentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Student not found with id : "
                                                + studentId
                                )
                        );

        return modelMapper.map(
                student.getDepartment(),
                DepartmentDto.class
        );
    }
    public List<CourseDto> getCoursesByStudent(
            Integer studentId
    )
    {
        StudentEntity student =
                studentRepository.findById(studentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Student not found with id : "
                                                + studentId
                                )
                        );

        return student.getCourses()
                .stream()
                .map(course ->
                        modelMapper.map(
                                course,
                                CourseDto.class
                        ))
                .toList();
    }

    public List<StudentNameEmailProjection>
    getStudentNamesAndEmails()
    {
        return studentRepository
                .findAllProjectedBy();
    }

    public List<StudentDto> filterStudents(
            String name,
            Integer age,
            String department
    )
    {
        Specification<StudentEntity> spec =
                (root, query, cb) -> cb.conjunction();

        if(name != null)
        {
            spec = spec.and(
                    StudentSpecification.hasName(name)
            );
        }

        if(age != null)
        {
            spec = spec.and(
                    StudentSpecification.hasAge(age)
            );
        }

        if(department != null)
        {
            spec = spec.and(
                    StudentSpecification.hasDepartment(department)
            );
        }

        return studentRepository.findAll(spec)
                .stream()
                .map(student ->
                        modelMapper.map(
                                student,
                                StudentDto.class
                        ))
                .toList();
    }
    @Transactional
    public StudentDto assignNewAddress(
            Integer studentId,
            AddressDto addressDto
    )
    {
        StudentEntity student =
                studentRepository.findById(studentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Student not found with id : "
                                                + studentId
                                )
                        );

        AddressEntity address =
                modelMapper.map(
                        addressDto,
                        AddressEntity.class
                );

        address.setStudent(student);
        student.setAddress(address);

        studentRepository.save(student);

        return modelMapper.map(
                student,
                StudentDto.class
        );
    }
    public String getAdvice() throws Exception
    {
        String response =
                restClient.get()
                        .uri("https://api.adviceslip.com/advice")
                        .retrieve()
                        .body(String.class);

        AdviceResponseDto dto =
                objectMapper.readValue(
                        response,
                        AdviceResponseDto.class
                );

        return dto.getSlip().getAdvice();
    }
    public UserDto getExternalUser()
    {
        return restClient.get()
                .uri("https://jsonplaceholder.typicode.com/users/1")
                .retrieve()
                .body(UserDto.class);
    }
}
