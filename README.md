# 🎓 CampusSphere – An University ERP System

CampusSphere is a full-stack University ERP system designed to digitize and streamline academic administration. The platform provides dedicated portals for Administrators, Faculty, and Students, enabling efficient management of departments, students, faculty, courses, and academic activities.

The application follows a role-based architecture and is deployed on AWS with HTTPS and a custom domain.

**Live URLs**

* Frontend: https://campussphere.online
* Backend API: https://api.campussphere.online
* Swagger UI: https://api.campussphere.online/swagger-ui/index.html

**Live Demo-Video**
* CampusSphere-Application-Demo : https://drive.google.com/file/d/12DwY8zTWh8HqmMSIRv7PQ6z1tXmE5OPg/view?usp=drivesdk
* CampusSphere-AWS-Servicec-Demo : https://drive.google.com/file/d/1HkeyLEG5-EyzPXKateeE27_haKK6yeKg/view?usp=drivesdk

✨ Features

CampusSphere provides dedicated modules for administrators, faculty members, and students, ensuring efficient management of academic activities and secure access to resources.

🔐 Authentication & Security
Role-Based Access Control (RBAC) – Provides separate access privileges for Admin, Faculty, and Student users.
Secure Login System – Ensures authenticated access to the application.
Password Change Functionality – Allows users to securely update their passwords.
JWT-Based Authentication – Protects APIs using token-based authentication mechanisms.
HTTPS Enabled Communication – Secures data transmission using SSL certificates provided by AWS Certificate Manager.

👨‍💼 Admin Module
Dashboard Analytics – Displays key statistics and system information.
Student Management – Create, update, view, and manage student records.
Faculty Management – Manage faculty information and profiles.
Department Management – Maintain academic departments within the university.
Course Management – Create and organize courses offered by departments.
Profile Management – Allows administrators to view and update personal details.
Password Management – Enables secure password updates.

👨‍🏫 Faculty Module
Faculty Dashboard – Provides an overview of assigned academic activities.
Assigned Courses Management – View courses allocated to faculty members.
Students by Course – Access students enrolled in specific courses.
Profile Management – Update and maintain personal information.
Password Management – Securely change account passwords.

👨‍🎓 Student Module
Student Dashboard – Displays academic information and quick access features.
Enrolled Courses – View courses assigned to the student.
Department Information – Access department-related details.
Profile Management – View and update profile information.
Password Management – Change account credentials securely.

📖 API Documentation
Swagger UI Integration – Provides interactive API documentation for testing and exploration.
RESTful API Support – Enables communication between frontend and backend services.
OpenAPI Specification – Standardized API documentation format.

☁️ Cloud Deployment
AWS Elastic Beanstalk Deployment – Hosts and manages the Spring Boot backend.
Amazon RDS MySQL Database – Provides managed and scalable database services.
Application Load Balancer (ALB) – Distributes incoming traffic efficiently.
AWS Certificate Manager (ACM) – Enables secure HTTPS communication.
CloudFront CDN – Improves performance through content caching and global delivery.
Amazon S3 Hosting – Stores and serves static frontend assets.
Custom Domain Support – Provides access through campussphere.online and api.campussphere.online.

## 🛠️ Technology Stack

CampusSphere is built using a modern full-stack architecture consisting of a React frontend, a Spring Boot backend, and AWS cloud services. The following technologies and tools were used throughout the development and deployment of the application.

### Backend

- **Java 21** – Primary programming language used for backend development.
- **Spring Boot** – Framework used to build RESTful APIs and simplify application development.
- **Spring Data JPA** – Provides abstraction for database operations and repository management.
- **Hibernate** – ORM framework used for mapping Java objects to relational database tables.
- **Maven** – Build automation and dependency management tool.
- **REST APIs** – Enables communication between frontend and backend services.
- **Swagger OpenAPI** – Used for API documentation and interactive testing.

### Frontend

- **React** – JavaScript library used for building dynamic user interfaces.
- **JavaScript** – Core scripting language used in frontend development.
- **HTML5** – Provides the structure and content of web pages.
- **CSS3** – Used for styling and responsive design.

### Database

- **MySQL** – Relational database used to store application data.
- **Amazon RDS** – Managed database service used to host MySQL in the cloud.

### Cloud & Deployment

- **AWS Elastic Beanstalk** – Used to deploy and manage the Spring Boot backend.
- **AWS Application Load Balancer (ALB)** – Distributes incoming traffic across application instances.
- **AWS CloudFront** – Content delivery network used to improve performance and reduce latency.
- **Amazon S3** – Hosts the static frontend assets.
- **AWS Certificate Manager (ACM)** – Provides SSL/TLS certificates for secure HTTPS communication.
- **Route 53** – Manages DNS records and custom domains.
- **Custom Domain with HTTPS** – Enables secure access using `campussphere.online` and `api.campussphere.online`.

### Security

- **Spring Security** – Provides authentication and authorization mechanisms.
- **Role-Based Access Control (RBAC)** – Restricts access based on user roles such as Admin, Faculty, and Student.
- **Password Encryption** – Secures user credentials before storing them.
- **HTTPS Communication** – Ensures secure data transmission between client and server.

### API Documentation

- **Swagger UI** – Interactive interface for testing and exploring REST APIs.
- **OpenAPI Specification** – Standard format used for API documentation.

### Development Tools

- **IntelliJ IDEA** – Primary IDE used for backend development.
- **Visual Studio Code** – Used for frontend development and project management.
- **Postman** – Tool used for API testing and debugging.
- **DBeaver** – Database management and query execution tool.
- **Git** – Version control system used to track changes.
- **GitHub** – Remote repository used for source code hosting and collaboration.

### Architecture Pattern

- **Layered Architecture** – Separates presentation, business, and data access layers.
- **RESTful API Design** – Enables scalable communication between frontend and backend.
- **DTO Pattern** – Used to transfer data between layers efficiently.
- **Repository Pattern** – Encapsulates data access logic.
- **Service Layer Pattern** – Contains business logic and application rules.

## 🏗️ System Architecture

CampusSphere follows a layered architecture that separates the presentation, business, and data access layers. Users interact with the application through a React frontend, which communicates with Spring Boot REST APIs. Business logic is handled by the service layer, while the repository layer manages database operations on Amazon RDS MySQL. This separation improves maintainability, scalability, and code organization.

Architecture Diagram


![img_5.png](screenshots/img_5.png)


## ☁️ AWS Infrastructure

CampusSphere is deployed on AWS using a combination of managed services to ensure scalability, availability, and secure communication. The frontend is hosted on Amazon S3 and delivered through CloudFront, while the Spring Boot backend runs on Elastic Beanstalk behind an Application Load Balancer. Data is stored in Amazon RDS MySQL, and HTTPS is enabled using AWS Certificate Manager with custom domains configured for both frontend and backend.


![img_6.png](screenshots/img_6.png)


## 🔐 Authentication & Authorization

CampusSphere implements JWT-based authentication and role-based authorization using Spring Security. Users authenticate through the login API, receive a JWT token, and access protected resources based on their roles. This ensures secure communication and restricts access to Admin, Faculty, and Student functionalities.


![img_2.png](screenshots/img_2.png)



## 🗄️ Database Schema

CampusSphere follows a normalized relational database design to efficiently manage academic entities and their relationships. Departments organize students, faculty members, and courses, while faculty members teach courses and students can enroll in multiple courses. The schema ensures data consistency, reduces redundancy, and maintains referential integrity.

### E-R Diagram

![img_3.png](screenshots/img_3.png)

![img_4.png](screenshots/img_4.png)

## Screenshots

### Login-Page

![login.png](screenshots/general/login.png)

### Swagger-UI

![swagger-ui.png](screenshots/general/swagger-ui.png)

### Admin-UI
-Admin-Dashboard


![admin-change-password.png](screenshots/admin/admin-dashboard.png)


-Admin-courses


![admin-courses.png](screenshots/admin/admin-courses.png)


-Admin-Students


![admin-students.png](screenshots/admin/admin-students.png)


-Admin-Profile

![admin-profile.png](screenshots/admin/admin-profile.png)


-Admin-Faculty

![admin-faculties.png](screenshots/admin/admin-faculties.png)


-Admin-Departments

![admin-departments.png](screenshots/admin/admin-departments.png)


-change-password

![admin-change-password.png](screenshots/admin/admin-change-password.png)


### Faculty-UI

-Faculty-Dashboard


![faculty-dashboard.png](screenshots/faculty/faculty-dashboard.png)


-Faculty-Profile


![faculty-profile.png](screenshots/faculty/faculty-profile.png)


-Faculty-courses


![faculty-courses.png](screenshots/faculty/faculty-courses.png)


-Faculty-Students-By-Courses


![faculty-students-by-course.png](screenshots/faculty/faculty-students-by-course.png)


### Student-UI

-student-profile


![student-profile.png](screenshots/student/student-profile.png)


-student-courses


![student-courses.png](screenshots/student/student-courses.png)


-student-dashboard


![student-dashboard.png](screenshots/student/student-dashboard.png)


-student-department


![student-department.png](screenshots/student/student-department.png)


## AWS

-S3


![s3-bucket.png](screenshots/aws/s3-bucket.png)


-ACM


![acm-certificate-frontend.png](screenshots/aws/acm-certificate-frontend.png)



![acm-certificate-backend.png](screenshots/aws/acm-certificate-backend.png)


-Elastic Beanstalk


![elasticbeanstalk-environment.png](screenshots/aws/elasticbeanstalk-environment.png)


-CloudFront


![cloudfront-distribution.png](screenshots/aws/cloudfront-distribution.png)


-Application-Load-Balancer


![application-load-balancer.png](screenshots/aws/application-load-balancer.png)


-RDS-DATABASE

![rds-instance.png](screenshots/aws/rds-instance.png)



### DEPLOYMENT FLOW DIAGRAM


![img_7.png](screenshots/img_7.png)



![img_8.png](screenshots/img_8.png)



## ⚙️ Installation & Setup

Follow the steps below to set up CampusSphere locally for development and testing purposes.

### Prerequisites

#### Backend Requirements

* Java 21
* Maven 3.9+
* MySQL 8+
* Git

#### Frontend Requirements

* Node.js 18+
* npm 9+

---

### Clone the Repository

```bash
git clone https://github.com/bhargavchandra06/CampusSphere-An-University-ERP-System.git

cd CampusSphere-An-University-ERP-System
```

---

### Backend Setup

1. Configure your MySQL database.
2. Update the database credentials in `application.properties`.
3. Build and run the Spring Boot application.

```bash
mvn clean install

mvn spring-boot:run
```


### Frontend Setup

Navigate to the frontend directory and install dependencies.

```bash
cd CampusSphere-frontend

npm install

npm start
```


## 🔮 Future Enhancements

The following enhancements can further improve the scalability, performance, and functionality of CampusSphere:

* **Docker Containerization** – Package the application into portable containers for consistent deployment across environments.
* **CI/CD Automation** – Implement GitHub Actions for automated build, testing, and deployment workflows.
* **Redis Caching** – Improve application performance by reducing database load.
* **Email Notification Service** – Send notifications for course enrollment, password resets, and important academic updates.
* **Audit Logging & Monitoring** – Track user activities and monitor application health.
* **Role-Based Dashboard Analytics** – Provide advanced insights and reporting for administrators and faculty members.
* **Microservices Architecture** – Split the monolithic application into independently deployable services.
* **Kubernetes Deployment** – Enable container orchestration and automated scaling.
* **Mobile Application Support** – Extend CampusSphere functionality to Android and iOS platforms.
* **AI-Powered Academic Assistant** – Assist students with academic information and course recommendations.


## 📊 Project Highlights

- Full-Stack University ERP System
- Multi-Role Access (Admin, Faculty, Student)
- JWT-Based Authentication & Authorization
- RESTful API Architecture
- Swagger API Documentation
- AWS Cloud Deployment
- HTTPS Enabled with Custom Domains
- Amazon RDS MySQL Integration
- CloudFront CDN Distribution
- Production-Oriented Architecture


## 👨‍💻 Author

### Bhargav Chandra

Final Year B.Tech Student specializing in Computer Science and Business Systems with interests in Java Backend Development, Cloud Computing, DevOps, Artificial Intelligence, and Scalable Software Systems.





