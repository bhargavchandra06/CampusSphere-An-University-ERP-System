package com.example.restapi.intro.service;

import com.example.restapi.intro.dto.CourseDto;
import com.example.restapi.intro.dto.FacultyDto;
import com.example.restapi.intro.entity.FacultyEntity;
import com.example.restapi.intro.exceptions.ResourceNotFoundException;
import com.example.restapi.intro.respository.FacultyRepository;
import com.example.restapi.intro.respository.CourseRepository;
import org.modelmapper.ModelMapper;
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

    public FacultyService(FacultyRepository facultyRepository, ModelMapper modelMapper, CourseRepository courseRepository) {
        this.facultyRepository = facultyRepository;
        this.modelMapper = modelMapper;
        this.courseRepository = courseRepository;
    }

    private final CourseRepository courseRepository;



    private FacultyEntity getFacultyEntityById(Long id)
    {
        return facultyRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Faculty not found with id : " + id
                        )
                );
    }

    public FacultyDto createFaculty(FacultyDto facultyDto)
    {
        FacultyEntity faculty =
                modelMapper.map(
                        facultyDto,
                        FacultyEntity.class
                );

        FacultyEntity saved =
                facultyRepository.save(faculty);

        return modelMapper.map(
                saved,
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

        faculty.setSpecialization(
                facultyDto.getSpecialization()
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
}
