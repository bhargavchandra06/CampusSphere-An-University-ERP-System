package com.example.restapi.intro.service;
import com.example.restapi.intro.auth.dto.UserDto;
import com.example.restapi.intro.auth.entity.Role;
import com.example.restapi.intro.auth.entity.UserEntity;
import com.example.restapi.intro.auth.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import com.example.restapi.intro.dto.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
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
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
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

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public StudentService(AddressRepository addressRepository, StudentRepository studentRepository, DepartmentRepository departmentRepository, CourseRepository courseRepository, UserRepository userRepository, PasswordEncoder passwordEncoder, ObjectMapper objectMapper, ModelMapper modelMapper, RestClient restClient) {
        this.addressRepository = addressRepository;
        this.studentRepository = studentRepository;
        this.departmentRepository = departmentRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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
    @Transactional
    public StudentDto createNewstudent(
            StudentDto studentDto
    ) {

        if(userRepository.existsByUsername(
                studentDto.getEmail()
        )) {
            throw new RuntimeException(
                    "User already exists"
            );
        }

        UserEntity user = UserEntity.builder()
                .username(studentDto.getEmail())
                .password(
                        passwordEncoder.encode(
                                "Temp@123"
                        )
                )
                .role(Role.STUDENT)
                .build();

        userRepository.save(user);

        StudentEntity toSaveEntity =
                modelMapper.map(
                        studentDto,
                        StudentEntity.class
                );

        toSaveEntity.setUser(user);

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
    public StudentDto getCurrentStudent()
    {
        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String username =
                authentication.getName();

        StudentEntity student =
                studentRepository
                        .findByEmail(username)
                        .orElseThrow(
                                () -> new ResourceNotFoundException(
                                        "Student not found"
                                )
                        );

        return modelMapper.map(
                student,
                StudentDto.class
        );
    }
    public DepartmentDto getCurrentStudentDepartment()
    {
        String username =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        StudentEntity student =
                studentRepository
                        .findByEmail(username)
                        .orElseThrow(
                                () -> new ResourceNotFoundException(
                                        "Student not found"
                                )
                        );

        DepartmentEntity department =
                student.getDepartment();

        if(department == null)
        {
            throw new ResourceNotFoundException(
                    "Department not assigned"
            );
        }

        return modelMapper.map(
                department,
                DepartmentDto.class
        );
    }
    public List<CourseDto> getCurrentStudentCourses()
    {
        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String username =
                authentication.getName();

        StudentEntity student =
                studentRepository
                        .findByEmail(username)
                        .orElseThrow(
                                () -> new ResourceNotFoundException(
                                        "Student not found"
                                )
                        );

        return student.getCourses()
                .stream()
                .map(
                        course ->
                                modelMapper.map(
                                        course,
                                        CourseDto.class
                                )
                )
                .toList();
    }
    public StudentDto updateStudentbyId(
            Integer id,
            StudentDto studentDto
    ) {

        StudentEntity existing =
                studentRepository.findById(id)
                        .orElseThrow();

        existing.setRollNo(
                studentDto.getRollNo()
        );

        existing.setName(
                studentDto.getName()
        );

        existing.setEmail(
                studentDto.getEmail()
        );

        existing.setAge(
                studentDto.getAge()
        );

        existing.setPhonenumber(
                studentDto.getPhonenumber()
        );

        existing.setYear(
                studentDto.getYear()
        );

        if (studentDto.getDepartment() != null) {

            DepartmentEntity department =
                    departmentRepository
                            .findById(
                                    studentDto.getDepartment().getId()
                            )
                            .orElseThrow();

            existing.setDepartment(
                    department
            );
        }

        StudentEntity saved =
                studentRepository.save(
                        existing
                );

        return modelMapper.map(
                saved,
                StudentDto.class
        );
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

        // Validation
        if (!student.getDepartment()
                .getId()
                .equals(course.getDepartment().getId()))
        {
            throw new RuntimeException(
                    "Student and Course belong to different departments"
            );
        }

        // Avoid duplicate course assignment
        if (student.getCourses().contains(course))
        {
            throw new RuntimeException(
                    "Student already enrolled in this course"
            );
        }

        student.getCourses().add(course);

        StudentEntity savedStudent =
                studentRepository.save(student);

        return modelMapper.map(
                savedStudent,
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
    public List<StudentDto> searchStudents(
            String keyword
    )
    {
        return studentRepository
                .findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                        keyword,
                        keyword
                )
                .stream()
                .map(student ->
                        modelMapper.map(
                                student,
                                StudentDto.class
                        ))
                .toList();
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
                student.getAddress();

        if (address == null)
        {
            address = new AddressEntity();

            address.setStudent(student);

            student.setAddress(address);
        }

        address.setCity(
                addressDto.getCity()
        );

        address.setState(
                addressDto.getState()
        );

        address.setPincode(
                addressDto.getPincode()
        );

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
