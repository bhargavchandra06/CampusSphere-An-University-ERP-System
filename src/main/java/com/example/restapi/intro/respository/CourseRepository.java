package com.example.restapi.intro.respository;

import com.example.restapi.intro.entity.CourseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository
        extends JpaRepository<CourseEntity, Long> {

    List<CourseEntity>
    findByFacultyId(Long facultyId);
}