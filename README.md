# Student Management System

A Spring Boot REST API project for managing students, courses, departments, faculties, and addresses. The project demonstrates CRUD operations, entity relationships, validation, exception handling, DTO mapping, and Spring Data JPA.

## Features

### Core Features

* CRUD Operations
* DTO Mapping using ModelMapper
* Bean Validation
* Custom Validation Annotation
* Global Exception Handling
* Partial Updates (PATCH)
* Sorting
* Custom JPA Queries
* MySQL Integration

### Relationships

* Student ↔ Address (One-to-One)
* Student ↔ Department (Many-to-One)
* Department ↔ Students (One-to-Many)
* Faculty ↔ Courses (One-to-Many)
* Student ↔ Course (Many-to-Many)

### Additional APIs

* Assign Address to Student
* Assign Department to Student
* Assign Faculty to Course
* Enroll Student in Course
* Remove Student from Course
* Get Courses of a Student
* Get Students of a Course
* Get Students by Department
* Get Courses by Faculty

## Tech Stack

* Java 21
* Spring Boot
* Spring Data JPA
* Hibernate
* MySQL
* Maven
* ModelMapper
* Lombok

## Project Structure

* Controller Layer
* Service Layer
* Repository Layer
* DTO Layer
* Entity Layer
* Exception Handling Layer
* Validation Layer

## Future Enhancements

* Swagger/OpenAPI Documentation
* JWT Authentication & Authorization
* Pagination
* Unit Testing (JUnit & Mockito)
* Dockerization

