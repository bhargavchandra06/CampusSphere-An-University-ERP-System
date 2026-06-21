package com.example.restapi.intro.configs;


import com.example.restapi.intro.dto.*;
import com.example.restapi.intro.entity.CourseEntity;
import com.example.restapi.intro.entity.DepartmentEntity;
import com.example.restapi.intro.entity.FacultyEntity;
import com.example.restapi.intro.entity.StudentEntity;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig {
    @Bean
    public ModelMapper getModelMapper()
    {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.createTypeMap(
                CourseEntity.class,
                CourseSummaryDto.class
        );
        modelMapper.createTypeMap(
                FacultyEntity.class,
                FacultySummaryDto.class
        );
        modelMapper.createTypeMap(
                StudentEntity.class,
                StudentSummaryDto.class
        );
        modelMapper.createTypeMap(
                CourseEntity.class,
                CourseDto.class
        );
        modelMapper.createTypeMap(
                FacultyEntity.class,
                FacultyDto.class
        );

        modelMapper.createTypeMap(
                StudentEntity.class,
                StudentDto.class
        );

        modelMapper.createTypeMap(
                DepartmentEntity.class,
                DepartmentDto.class
        );
        return modelMapper;

    }
}
