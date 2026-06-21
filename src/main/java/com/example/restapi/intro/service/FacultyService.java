package com.example.restapi.intro.service;

import com.example.restapi.intro.auth.entity.Role;
import com.example.restapi.intro.auth.entity.UserEntity;
import com.example.restapi.intro.auth.repository.UserRepository;
import com.example.restapi.intro.dto.CourseDto;
import com.example.restapi.intro.dto.FacultyDto;
import com.example.restapi.intro.dto.StudentDto;
import com.example.restapi.intro.entity.CourseEntity;
import com.example.restapi.intro.entity.DepartmentEntity;
import com.example.restapi.intro.entity.FacultyEntity;
import com.example.restapi.intro.exceptions.ResourceNotFoundException;
import com.example.restapi.intro.respository.DepartmentRepository;
import com.example.restapi.intro.respository.FacultyRepository;
import com.example.restapi.intro.respository.CourseRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ReflectionUtils;


import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

@Service
public class FacultyService {

    private final FacultyRepository facultyRepository;
    private final ModelMapper modelMapper;

    public FacultyService(CourseRepository courseRepository, FacultyRepository facultyRepository, ModelMapper modelMapper, DepartmentRepository departmentRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.courseRepository = courseRepository;
        this.facultyRepository = facultyRepository;
        this.modelMapper = modelMapper;
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private final DepartmentRepository departmentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;



    private FacultyEntity getFacultyEntityById(Long id)
    {
        return facultyRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Faculty not found with id : " + id
                        )
                );
    }
    public FacultyDto getCurrentFaculty()
    {
        String username =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        FacultyEntity faculty =
                facultyRepository
                        .findByEmail(username)
                        .orElseThrow(
                                () -> new ResourceNotFoundException(
                                        "Faculty not found"
                                )
                        );

        return modelMapper.map(
                faculty,
                FacultyDto.class
        );
    }
    public List<StudentDto> getStudentsByMyCourse(Long courseId)
    {
        String username =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        FacultyEntity faculty =
                facultyRepository
                        .findByEmail(username)
                        .orElseThrow(
                                () -> new ResourceNotFoundException(
                                        "Faculty not found"
                                )
                        );

        CourseEntity course =
                courseRepository
                        .findById(courseId)
                        .orElseThrow(
                                () -> new ResourceNotFoundException(
                                        "Course not found"
                                )
                        );

        // Ownership check
        if (!course.getFaculty()
                .getId()
                .equals(faculty.getId()))
        {
            throw new AccessDeniedException(
                    "You are not assigned to this course"
            );
        }

        return course.getStudents()
                .stream()
                .map(student ->
                        modelMapper.map(
                                student,
                                StudentDto.class
                        )
                )
                .toList();
    }
    public List<CourseDto> getCurrentFacultyCourses()
    {
        String username =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        FacultyEntity faculty =
                facultyRepository
                        .findByEmail(username)
                        .orElseThrow(
                                () -> new ResourceNotFoundException(
                                        "Faculty not found"
                                )
                        );

        return faculty.getCourses()
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

    public List<FacultyDto> searchFaculty(
            String keyword
    )
    {
        return facultyRepository
                .findByFacultyNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrDesignationContainingIgnoreCase(
                        keyword,
                        keyword,
                        keyword
                )
                .stream()
                .map(
                        faculty ->
                                modelMapper.map(
                                        faculty,
                                        FacultyDto.class
                                )
                )
                .toList();
    }

    @Transactional
    public FacultyDto createFaculty(
            FacultyDto facultyDto
    ) {

        if(userRepository.existsByUsername(
                facultyDto.getEmail()
        )) {
            throw new RuntimeException(
                    "User already exists"
            );
        }

        UserEntity user = UserEntity.builder()
                .username(
                        facultyDto.getEmail()
                )
                .password(
                        passwordEncoder.encode(
                                "Temp@123"
                        )
                )
                .role(Role.FACULTY)
                .build();

        userRepository.save(user);

        FacultyEntity faculty =
                modelMapper.map(
                        facultyDto,
                        FacultyEntity.class
                );

        faculty.setUser(user);

        FacultyEntity savedFaculty =
                facultyRepository.save(faculty);

        return modelMapper.map(
                savedFaculty,
                FacultyDto.class
        );
    }

    public List<FacultyDto> getAllFaculties()
    {
        return facultyRepository.findAll()
                .stream()
                .map(faculty ->
                        modelMapper.map(
                                faculty,
                                FacultyDto.class
                        ))
                .toList();
    }

    public FacultyDto getFacultyById(Long id)
    {
        return modelMapper.map(
                getFacultyEntityById(id),
                FacultyDto.class
        );
    }

    @Transactional
    public FacultyDto updateFaculty(
            Long id,
            FacultyDto facultyDto
    )
    {
        FacultyEntity faculty =
                getFacultyEntityById(id);

        faculty.setFacultyName(
                facultyDto.getFacultyName()
        );

        faculty.setEmail(
                facultyDto.getEmail()
        );

        faculty.setDesignation(
                facultyDto.getDesignation()
        );

        return modelMapper.map(
                faculty,
                FacultyDto.class
        );
    }

    public boolean deleteFaculty(Long id)
    {
        FacultyEntity faculty =
                getFacultyEntityById(id);

        facultyRepository.delete(faculty);

        return true;
    }

    @Transactional
    public FacultyDto partialUpdate(
            Long id,
            Map<String,Object> fields
    )
    {
        FacultyEntity faculty =
                getFacultyEntityById(id);

        fields.forEach((fieldName,value)->{

            Field field =
                    ReflectionUtils.findField(
                            FacultyEntity.class,
                            fieldName
                    );

            if(field != null)
            {
                field.setAccessible(true);

                ReflectionUtils.setField(
                        field,
                        faculty,
                        value
                );
            }
        });

        return modelMapper.map(
                faculty,
                FacultyDto.class
        );
    }
    public List<CourseDto> getCoursesByFaculty(
            Long facultyId
    )
    {
        return courseRepository
                .findByFacultyId(facultyId)
                .stream()
                .map(course ->
                        modelMapper.map(
                                course,
                                CourseDto.class
                        ))
                .toList();
    }

    public FacultyDto assignDepartment(
            Long facultyId,
            Long departmentId
    )
    {
        FacultyEntity faculty =
                facultyRepository.findById(facultyId)
                        .orElseThrow(
                                () -> new ResourceNotFoundException(
                                        "Faculty not found"
                                )
                        );

        DepartmentEntity department =
                departmentRepository.findById(departmentId)
                        .orElseThrow(
                                () -> new ResourceNotFoundException(
                                        "Department not found"
                                )
                        );

        faculty.setDepartment(department);

        FacultyEntity savedFaculty =
                facultyRepository.save(faculty);

        return modelMapper.map(
                savedFaculty,
                FacultyDto.class
        );
    }

}
