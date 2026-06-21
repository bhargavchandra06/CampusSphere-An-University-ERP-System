import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getCourseById } from "@/api/courseApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute(
  "/admin/courses/$id"
)({
  component: CourseDetailsPage,
});

function CourseDetailsPage() {

  const { id } = Route.useParams() as { id: string };

  const [course, setCourse] = useState<any>(null);

  useEffect(() => {

    getCourseById(Number(id))
      .then(setCourse)
      .catch(console.error);

  }, [id]);

  if (!course) {
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

        <CardContent className="space-y-2">

          <p>
            <b>Course Name:</b>{" "}
            {course.courseName}
          </p>

          <p>
            <b>Course Code:</b>{" "}
            {course.courseCode}
          </p>

          <p>
            <b>Credits:</b>{" "}
            {course.credits}
          </p>

          <p>
            <b>Department:</b>{" "}
            {course.department?.departmentName}
          </p>

          <p>
            <b>Faculty:</b>{" "}
            {course.faculty
              ? course.faculty.facultyName
              : "Not Assigned"}
          </p>

        </CardContent>

      </Card>

      <Card>

        <CardHeader>
          <CardTitle>
            Students Enrolled
          </CardTitle>
        </CardHeader>

        <CardContent>

          {course.students?.length === 0 ? (

            <p>
              No students enrolled.
            </p>

          ) : (

            <div className="space-y-2">

              {course.students?.map(
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

    </div>
  );
}