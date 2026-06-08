package com.example.restapi.intro.service;

import com.example.restapi.intro.dto.StudentDto;
import com.example.restapi.intro.entity.StudentEntity;
import com.example.restapi.intro.exceptions.ResourceNotFoundException;
import com.example.restapi.intro.respository.StudentRepository;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;
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
 private final ModelMapper modelMapper;


    public StudentService(StudentRepository studentRepository,ModelMapper modelMapper) {
        this.studentRepository = studentRepository;
        this.modelMapper = modelMapper;
    }
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
        System.out.println("DTO: " + studentDto.getName());

        StudentEntity toSaveEntity =
                modelMapper.map(studentDto, StudentEntity.class);

        System.out.println("Mapped");

        StudentEntity savedEntity =
                studentRepository.save(toSaveEntity);

        System.out.println("Saved");

        return modelMapper.map(savedEntity, StudentDto.class);
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
}
