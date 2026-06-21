import {
  createFileRoute,
} from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PageHeader } from "@/components/layout/DashboardLayout";

import { useEffect, useState } from "react";

import {
  getFacultyById,
} from "@/api/facultyApi";

export const Route = createFileRoute(
  "/student/faculties/$id"
)({
  component: FacultyDetails,
});

function FacultyDetails() {

  const { id } = Route.useParams();

  const [faculty, setFaculty] =
    useState<any>(null);

  useEffect(() => {

    getFacultyById(
      Number(id)
    )
      .then(setFaculty)
      .catch(console.error);

  }, [id]);

  if (!faculty) {

    return <div>Loading...</div>;

  }

  return (

    <div className="space-y-6">

      <PageHeader
        title={faculty.facultyName}
        description={faculty.designation}
      />

      <Card>

        <CardHeader>

          <CardTitle>
            Faculty Information
          </CardTitle>

        </CardHeader>

        <CardContent className="space-y-4">

          <div>

            <p className="font-semibold">
              Email
            </p>

            <p>
              {faculty.email}
            </p>

          </div>

          <div>

            <p className="font-semibold">
              Department
            </p>

            <p>
              {faculty.department?.departmentName}
            </p>

          </div>

          <div>

            <p className="font-semibold">
              Designation
            </p>

            <p>
              {faculty.designation}
            </p>

          </div>

        </CardContent>

      </Card>

      <Card>

        <CardHeader>

          <CardTitle>
            Courses Handled
          </CardTitle>

        </CardHeader>

        <CardContent>

          <div className="space-y-3">

            {faculty.courses?.map(
              (course: any) => (

                <div
                  key={course.id}
                  className="rounded-md border p-3"
                >

                  <div className="font-medium">

                    {course.courseName}

                  </div>

                  <div className="text-sm text-muted-foreground">

                    {course.courseCode}

                  </div>

                </div>

              )
            )}

          </div>

        </CardContent>

      </Card>

    </div>

  );

}