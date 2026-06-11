package com.example.restapi.intro.respository;

import com.example.restapi.intro.entity.FacultyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyRepository
        extends JpaRepository<FacultyEntity, Long> {
}