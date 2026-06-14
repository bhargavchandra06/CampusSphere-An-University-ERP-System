package com.example.restapi.intro.specifications;

import com.example.restapi.intro.entity.StudentEntity;
import org.springframework.data.jpa.domain.Specification;

public class StudentSpecification {
    public static Specification<StudentEntity>
    hasName(String name)
    {
        return (root, query, cb) ->
                cb.equal(root.get("name"), name);
    }
    public static Specification<StudentEntity>
    hasAge(Integer age)
    {
        return (root, query, cb) ->
                cb.equal(root.get("age"), age);
    }
    public static Specification<StudentEntity>
    hasDepartment(String department)
    {
        return (root, query, cb) ->
                cb.equal(
                        root.get("department")
                                .get("departmentName"),
                        department
                );
    }
}
