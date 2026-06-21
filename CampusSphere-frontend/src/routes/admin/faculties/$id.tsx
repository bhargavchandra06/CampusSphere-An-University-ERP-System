import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getFacultyById } from "@/api/facultyApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute(
  "/admin/faculties/$id"
)({
  component: FacultyDetailsPage,
});

function FacultyDetailsPage() {

  const { id } = Route.useParams();

  const [faculty, setFaculty] = useState<any>(null);

  useEffect(() => {

    getFacultyById(Number(id))
      .then(setFaculty)
      .catch(console.error);

  }, [id]);

  if (!faculty) {
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
            <b>ID:</b> {faculty.id}
          </p>

          <p>
            <b>Name:</b> {faculty.facultyName}
          </p>

          <p>
            <b>Email:</b> {faculty.email}
          </p>

          <p>
            <b>Designation:</b> {faculty.designation}
          </p>

          <p>
            <b>Department:</b>{" "}
            {faculty.department?.departmentName}
          </p>

        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Courses Handled
          </CardTitle>
        </CardHeader>

        <CardContent>

           {faculty.courses?.length === 0 ? (

            <p>
              No courses assigned.
            </p>

          ) : (

            <ul className="space-y-2">

              {faculty.courses?.map(
                (course: any) => (

                  <li key={course.id}>
                    {course.courseName}
                  </li>

                )
              )}

            </ul>

          )}

        </CardContent>
      </Card>

    </div>
  );
}