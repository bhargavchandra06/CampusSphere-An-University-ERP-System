package com.example.restapi.intro.respository;

import com.example.restapi.intro.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<StudentEntity, Integer> {


    @Query("""
           SELECT s
           FROM StudentEntity s
           WHERE s.age > :minAge
           AND s.age < :maxAge
           """)//(JPQL) use this @Query in case of complex queries only like aggregate,sum,average..etc
//    @Query(
//            value = """
//            SELECT *
//            FROM students
//            WHERE age > :minAge
//            AND age < :maxAge
//            """,
//            nativeQuery = true
//    )//(SQL)
    List<StudentEntity> findByAgeGreaterThanAndAgeLessThan(Integer minAge, Integer maxAge); // normally this will ,but it will not work for complex queries in that case you can Use @Query

}
