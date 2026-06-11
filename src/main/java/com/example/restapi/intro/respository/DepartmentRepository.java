package com.example.restapi.intro.respository;

import com.example.restapi.intro.entity.DepartmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository
        extends JpaRepository<DepartmentEntity, Long> {
}