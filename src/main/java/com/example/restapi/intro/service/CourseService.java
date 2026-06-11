package com.example.restapi.intro.service;

import com.example.restapi.intro.dto.CourseDto;
import com.example.restapi.intro.entity.CourseEntity;
import com.example.restapi.intro.entity.FacultyEntity;
import com.example.restapi.intro.exceptions.ResourceNotFoundException;
import com.example.restapi.intro.respository.CourseRepository;
import com.example.restapi.intro.respository.FacultyRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ReflectionUtils;
import com.example.restapi.intro.dto.StudentDto;
import com.example.restapi.intro.entity.StudentEntity;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final ModelMapper modelMapper;

    public CourseService(CourseRepository courseRepository, ModelMapper modelMapper, FacultyRepository facultyRepository) {
        this.courseRepository = courseRepository;
        this.modelMapper = modelMapper;
        this.facultyRepository = facultyRepository;
    }

    private final FacultyRepository facultyRepository;

    private CourseEntity getCourseEntityById(Long id)
    {
        return courseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Course not found with id : " + id
                        )
                );
    }

    public CourseDto createCourse(CourseDto dto)
    {
        CourseEntity entity =
                modelMapper.map(dto, CourseEntity.class);

        CourseEntity saved =
                courseRepository.save(entity);

        return modelMapper.map(saved, CourseDto.class);
    }

    public List<CourseDto> getAllCourses()
    {
        return courseRepository.findAll()
                .stream()
                .map(course ->
                        modelMapper.map(
                                course,
                                CourseDto.class
                        ))
                .toList();
    }

    public CourseDto getCourseById(Long id)
    {
        return modelMapper.map(
                getCourseEntityById(id),
                CourseDto.class
        );
    }

    @Transactional
    public CourseDto updateCourse(
            Long id,
            CourseDto dto
    )
    {
        CourseEntity course =
                getCourseEntityById(id);

        course.setCourseName(
                dto.getCourseName()
        );

        course.setCourseCode(
                dto.getCourseCode()
        );

        course.setCredits(
                dto.getCredits()
        );

        return modelMapper.map(
                course,
                CourseDto.class
        );
    }

    public boolean deleteCourse(Long id)
    {
        CourseEntity course =
                getCourseEntityById(id);

        courseRepository.delete(course);

        return true;
    }

    @Transactional
    public CourseDto partialUpdate(
            Long id,
            Map<String,Object> fields
    )
    {
        CourseEntity course =
                getCourseEntityById(id);

        fields.forEach((fieldName,value)->{

            Field field =
                    ReflectionUtils.findField(
                            CourseEntity.class,
                            fieldName
                    );

            if(field != null)
            {
                field.setAccessible(true);

                ReflectionUtils.setField(
                        field,
                        course,
                        value
                );
            }
        });

        return modelMapper.map(
                course,
                CourseDto.class
        );
    }
    @Transactional
    public CourseDto assignFaculty(
            Long courseId,
            Long facultyId
    )
    {
        CourseEntity course =
                courseRepository.findById(courseId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Course not found"
                                )
                        );

        FacultyEntity faculty =
                facultyRepository.findById(facultyId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Faculty not found"
                                )
                        );

        course.setFaculty(faculty);

        return modelMapper.map(
                course,
                CourseDto.class
        );
    }
    public List<StudentDto> getStudentsByCourse(
            Long courseId
    )
    {
        CourseEntity course =
                courseRepository.findById(courseId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Course not found with id : "
                                                + courseId
                                )
                        );

        return course.getStudents()
                .stream()
                .map(student ->
                        modelMapper.map(
                                student,
                                StudentDto.class
                        ))
                .toList();
    }
}