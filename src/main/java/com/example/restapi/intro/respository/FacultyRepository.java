package com.example.restapi.intro.respository;

import com.example.restapi.intro.entity.FacultyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FacultyRepository
        extends JpaRepository<FacultyEntity, Long> {
    Optional<FacultyEntity> findByEmail(
            String email
    );
    List<FacultyEntity>
    findByFacultyNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrDesignationContainingIgnoreCase(
            String facultyName,
            String email,
            String designation
    );
}