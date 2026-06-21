# 🎓 CampusSphere – University ERP System

A full-stack **University Enterprise Resource Planning (ERP) System** built using **Spring Boot**, **React**, and **JWT Authentication**. CampusSphere provides separate portals for **Administrators**, **Faculty Members**, and **Students**, enabling efficient management of academic operations through role-based access control.

---

# 📌 Overview

CampusSphere is designed to digitize and streamline university operations by providing a centralized platform for managing:

* Students
* Faculty
* Departments
* Courses
* Authentication & Authorization
* Academic Information
* Profile Management

The application follows a **client-server architecture**, where:

* **Spring Boot** serves as the REST API backend.
* **React + TypeScript** serves as the frontend.
* **JWT-based authentication** secures all endpoints.
* **MySQL** stores persistent data.
* **Role-Based Access Control (RBAC)** restricts access based on user roles.

---

# 🏗 System Architecture

```
Frontend (React + TypeScript)
          │
          │ Axios API Calls
          ▼
Spring Boot REST APIs
          │
          ▼
Service Layer
(Business Logic)
          │
          ▼
Repository Layer (Spring Data JPA)
          │
          ▼
MySQL Database
```

---

# 🚀 Features

## 👨‍💼 Admin Portal

The administrator has complete control over the system.

### Student Management

* Add students
* Update student details
* Delete students
* Search students
* Filter students
* Pagination and sorting

### Faculty Management

* Create faculty members
* Assign departments
* Update faculty information
* Delete faculty records

### Course Management

* Create courses
* Assign faculty to courses
* View courses

### Department Management

* Create departments
* Assign students and faculty
* View department details

### Authentication

* Create users
* Role management
* Password change

---

## 👨‍🏫 Faculty Portal

Faculty members can:

### Dashboard

View:

* Total courses assigned
* Total students enrolled
* Department information

### Profile

View:

* Employee ID
* Designation
* Email
* Assigned department
* Number of courses handled

### My Courses

View all courses assigned to them.

### Students By Course

Select a course and view:

* Student names
* Roll numbers
* Email addresses
* Year
* Department

### Change Password

Securely update account credentials.

---

## 👨‍🎓 Student Portal

Students can:

### Dashboard

View:

* Enrolled courses
* Department information
* Academic year

### Profile

View:

* Roll number
* Email
* Department
* Year
* Number of enrolled courses

### My Courses

View currently enrolled courses.

### My Department

View:

* Department details
* Number of courses offered
* Number of faculty members
* Total students

### Search Faculty

Search faculty members belonging to their department.

### Faculty Details

View:

* Name
* Email
* Designation
* Department
* Courses handled

### Change Password

Update account password securely.

---

# 🔐 Authentication and Authorization

CampusSphere uses **Spring Security + JWT Authentication**.

### Roles

```java
ADMIN
FACULTY
STUDENT
```

Each request passes through:

```
JWT Filter
↓
Spring Security
↓
Authentication Manager
↓
UserDetailsService
↓
Role Verification
↓
Controller
```

Protected endpoints are secured using:

```java
@PreAuthorize("hasRole('ADMIN')")
@PreAuthorize("hasRole('FACULTY')")
@PreAuthorize("hasRole('STUDENT')")
```

---

# ⚙ Backend Technologies

## Spring Boot

Used for building RESTful APIs and implementing business logic.

### Spring MVC

Handles:

* Controllers
* Request mapping
* Response handling

### Spring Data JPA

Provides:

* Repository abstraction
* CRUD operations
* Pagination
* Sorting
* Query methods

### Hibernate

Acts as the ORM framework and manages entity persistence.

### Spring Security

Provides:

* Authentication
* Authorization
* Role-based access control

### JWT (JSON Web Tokens)

Used for:

* Stateless authentication
* Secure API access
* Session management

### Bean Validation

Implemented using:

```java
@NotBlank
@Email
@Size
@Min
@Max
@Pattern
@Positive
```

Custom validation:

```java
@studentage
```

### Swagger/OpenAPI

Used for:

* API documentation
* Endpoint testing

### ModelMapper

Used for converting:

```
Entity ↔ DTO
```

---

# 📚 DTO Architecture

Separate DTO classes are used to avoid exposing entities directly.

Examples:

```java
StudentDto
FacultyDto
DepartmentDto
CourseDto

StudentSummaryDto
FacultySummaryDto
CourseSummaryDto
```

Advantages:

* Separation of concerns
* Prevents circular references
* Cleaner API responses

---

# 🗃 Database Design

Entities:

### StudentEntity

Contains:

* id
* rollNo
* name
* email
* age
* phoneNumber
* year

Relationships:

* Many-to-Many → Courses
* Many-to-One → Department
* One-to-One → Address
* One-to-One → User

---

### FacultyEntity

Relationships:

* One-to-Many → Courses
* Many-to-One → Department
* One-to-One → User

---

### CourseEntity

Relationships:

* Many-to-One → Faculty
* Many-to-Many → Students
* Many-to-One → Department

---

### DepartmentEntity

Relationships:

* One-to-Many → Students
* One-to-Many → Faculty
* One-to-Many → Courses

---

### UserEntity

Stores:

* Username
* Password
* Role

---

# 🎨 Frontend Technologies

## React

Used for building reusable UI components.

## TypeScript

Provides:

* Type safety
* Better maintainability
* Improved scalability

## TanStack Router

Used for:

* File-based routing
* Nested routes
* Protected routes

## Tailwind CSS

Provides utility-first styling.

## Shadcn UI

Used for:

* Cards
* Tables
* Dialogs
* Forms
* Buttons
* Select components

## Axios

Handles communication between frontend and backend.

Example:

```typescript
api.get("/student/me")
api.post("/auth/login")
api.put("/student/update")
```

---

# 📂 Project Structure

```
CampusSphere
│
├── backend
│
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   ├── dto
│   ├── auth
│   ├── configs
│   ├── exceptions
│   └── annotations
│
├── frontend
│
│   ├── src
│   │
│   ├── api
│   ├── components
│   ├── routes
│   ├── lib
│   ├── hooks
│   └── assets
│
└── README.md
```

---

# 🔄 Concepts Implemented

✔ REST APIs

✔ Layered Architecture

✔ DTO Pattern

✔ Repository Pattern

✔ JWT Authentication

✔ Role-Based Access Control

✔ Spring Security

✔ Custom Validation

✔ Pagination

✔ Sorting

✔ Filtering

✔ Search Functionality

✔ Entity Relationships

✔ Many-to-Many Mapping

✔ One-to-One Mapping

✔ One-to-Many Mapping

✔ Global Exception Handling

✔ OpenAPI Documentation

✔ Reusable React Components

✔ Protected Routes

✔ Responsive UI

---
### Tech Stack

* Java
* Spring Boot
* Spring Security
* Hibernate
* MySQL
* React
* TypeScript
* Tailwind CSS
* Shadcn UI
* JWT Authentication
* REST APIs
---
# 🚧 Future Enhancements

* Attendance Management
* Marks and Grade Module
* Timetable Management
* Assignment Submission System
* Notifications Module
* Email Service
* File Uploads
* Dashboard Analytics
* Course Registration
* Semester Management
* Redis Caching
* Docker Deployment
* AWS Deployment
* Microservices Architecture


