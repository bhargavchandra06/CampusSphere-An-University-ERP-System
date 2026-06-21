import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getCurrentFaculty } from "@/api/facultyApi";

export const Route = createFileRoute("/faculty/profile")({
  component: FacultyProfile,
});

function Field({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}
function FacultyProfile() {

  const [faculty, setFaculty] = useState<any>(null);

  useEffect(() => {

    getCurrentFaculty()
      .then(setFaculty)
      .catch(console.error);

  }, []);

  if (!faculty) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      <PageHeader title="My Profile" />

      <Card>

        <CardContent className="p-6">

          <div className="flex items-center gap-4 border-b border-border pb-6">

            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary/10 text-xl font-semibold text-primary">

              {faculty.facultyName.charAt(0)}

            </div>

            <div className="min-w-0">

              <div className="truncate text-lg font-semibold text-foreground">

                {faculty.facultyName}

              </div>

              <div className="truncate text-sm text-muted-foreground">

                {faculty.designation}

              </div>

            </div>

          </div>

          <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3">

            <Field
              label="ID"
              value={faculty.id}
            />

            <Field
              label="Email"
              value={faculty.email}
            />

            <Field
              label="Department"
              value={faculty.department.departmentName}
            />

            <Field
              label="Courses Assigned"
              value={faculty.courses.length}
            />

          </div>

        </CardContent>

      </Card>

    </div>
  );
}
