package com.example.restapi.intro.service;

import com.example.restapi.intro.dto.DepartmentDto;
import com.example.restapi.intro.dto.StudentDto;
import com.example.restapi.intro.entity.DepartmentEntity;
import com.example.restapi.intro.exceptions.ResourceNotFoundException;
import com.example.restapi.intro.respository.DepartmentRepository;
import com.example.restapi.intro.respository.StudentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final ModelMapper modelMapper;

    public DepartmentService(DepartmentRepository departmentRepository, ModelMapper modelMapper, StudentRepository studentRepository) {
        this.departmentRepository = departmentRepository;
        this.modelMapper = modelMapper;
        this.studentRepository = studentRepository;
    }

    private final StudentRepository studentRepository;

    private DepartmentEntity getDepartmentEntityById(Long id)
    {
        return departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Department not found with id : " + id
                        )
                );
    }

    public DepartmentDto createDepartment(
            DepartmentDto departmentDto
    )
    {
        DepartmentEntity entity =
                modelMapper.map(
                        departmentDto,
                        DepartmentEntity.class
                );

        DepartmentEntity saved =
                departmentRepository.save(entity);

        return modelMapper.map(
                saved,
                DepartmentDto.class
        );
    }

    public List<DepartmentDto> getAllDepartments()
    {
        return departmentRepository.findAll()
                .stream()
                .map(department ->
                        modelMapper.map(
                                department,
                                DepartmentDto.class
                        ))
                .toList();
    }

    public DepartmentDto getDepartmentById(Long id)
    {
        return modelMapper.map(
                getDepartmentEntityById(id),
                DepartmentDto.class
        );
    }

    @Transactional
    public DepartmentDto updateDepartment(
            Long id,
            DepartmentDto dto
    )
    {
        DepartmentEntity department =
                getDepartmentEntityById(id);

        department.setDepartmentName(
                dto.getDepartmentName()
        );

        return modelMapper.map(
                department,
                DepartmentDto.class
        );
    }

    public boolean deleteDepartment(Long id)
    {
        DepartmentEntity department =
                getDepartmentEntityById(id);

        departmentRepository.delete(department);

        return true;
    }

    @Transactional
    public DepartmentDto partialUpdate(
            Long id,
            Map<String,Object> fields
    )
    {
        DepartmentEntity department =
                getDepartmentEntityById(id);

        fields.forEach((fieldName,value)->{

            Field field =
                    ReflectionUtils.findField(
                            DepartmentEntity.class,
                            fieldName
                    );

            if(field != null)
            {
                field.setAccessible(true);

                ReflectionUtils.setField(
                        field,
                        department,
                        value
                );
            }
        });

        return modelMapper.map(
                department,
                DepartmentDto.class
        );
    }

    public List<StudentDto> getStudentsByDepartmentName(
            String departmentName
    )
    {
        return studentRepository
                .findByDepartmentDepartmentName(
                        departmentName
                )
                .stream()
                .map(student ->
                        modelMapper.map(
                                student,
                                StudentDto.class
                        ))
                .toList();
    }
}