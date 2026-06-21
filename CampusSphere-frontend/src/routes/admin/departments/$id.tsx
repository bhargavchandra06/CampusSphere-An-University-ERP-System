import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getDepartmentById } from "@/api/departmentApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute(
  "/admin/departments/$id"
)({
  component: DepartmentDetailsPage,
});

function DepartmentDetailsPage() {

  const { id } = Route.useParams();

  const [department, setDepartment] =
    useState<any>(null);

  useEffect(() => {

    getDepartmentById(Number(id))
      .then(setDepartment)
      .catch(console.error);

  }, [id]);

  if (!department) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">

      <Card>

        <CardHeader>
          <CardTitle>
            Basic Information
          </CardTitle>
        </CardHeader>

        <CardContent>

          <p>
            <b>Department:</b>{" "}
            {department.departmentName}
          </p>

        </CardContent>

      </Card>

      <Card>

        <CardHeader>
          <CardTitle>
            Students
          </CardTitle>
        </CardHeader>

        <CardContent>

          {department.students.length === 0 ? (

            <p>No students.</p>

          ) : (

            <div className="space-y-2">

              {department.students.map(
                (student: any) => (

                  <div
                    key={student.id}
                    className="border rounded p-2"
                  >

                    <p>
                      <b>Roll No:</b>{" "}
                      {student.rollNo}
                    </p>

                    <p>
                      <b>Name:</b>{" "}
                      {student.name}
                    </p>

                  </div>

                )
              )}

            </div>

          )}

        </CardContent>

      </Card>

      <Card>

        <CardHeader>
          <CardTitle>
            Faculties
          </CardTitle>
        </CardHeader>

        <CardContent>

          {department.faculties.length === 0 ? (

            <p>No faculties.</p>

          ) : (

            <div className="space-y-2">

              {department.faculties.map(
                (faculty: any) => (

                  <div
                    key={faculty.id}
                    className="border rounded p-2"
                  >

                    <p>
                      <b>Name:</b>{" "}
                      {faculty.facultyName}
                    </p>

                    <p>
                      <b>Designation:</b>{" "}
                      {faculty.designation}
                    </p>

                  </div>

                )
              )}

            </div>

          )}

        </CardContent>

      </Card>

      <Card>

        <CardHeader>
          <CardTitle>
            Courses
          </CardTitle>
        </CardHeader>

        <CardContent>

          {department.courses.length === 0 ? (

            <p>No courses.</p>

          ) : (

            <div className="space-y-2">

              {department.courses.map(
                (course: any) => (

                  <div
                    key={course.id}
                    className="border rounded p-2"
                  >

                    <p>
                      <b>Course:</b>{" "}
                      {course.courseName}
                    </p>

                    <p>
                      <b>Code:</b>{" "}
                      {course.courseCode}
                    </p>

                  </div>

                )
              )}

            </div>

          )}

        </CardContent>

      </Card>

    </div>
  );
}