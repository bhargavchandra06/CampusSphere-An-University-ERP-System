import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getCurrentStudent } from "@/api/studentApi";

export const Route = createFileRoute("/student/profile")({
  component: StudentProfile,
});

function Field({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}

function StudentProfile() {

  const [student, setStudent] =
    useState<any>(null);

  useEffect(() => {

    getCurrentStudent()
      .then(setStudent)
      .catch(console.error);

  }, []);

  if (!student) {

    return <div>Loading...</div>;

  }

  return (

    <div>

      <PageHeader
        title="My Profile"
        description="Your personal academic record."
      />

      <Card>

        <CardContent className="p-6">

          <div className="flex items-center gap-4 border-b border-border pb-6">

            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary/10 text-xl font-semibold text-primary">

              {student.name.charAt(0)}

            </div>

            <div className="min-w-0">

              <div className="truncate text-lg font-semibold text-foreground">

                {student.name}

              </div>

              <div className="truncate text-sm text-muted-foreground">

                {student.email}

              </div>

            </div>

          </div>

          <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3">

            <Field
              label="Roll Number"
              value={student.rollNo}
            />

            <Field
              label="Department"
              value={
                student.department?.departmentName
                || "N/A"
              }
            />

            <Field
              label="Year"
              value={student.year}
            />

            <Field
              label="Age"
              value={student.age}
            />

            <Field
              label="Phone Number"
              value={student.phonenumber}
            />

            <Field
              label="Enrolled Courses"
              value={
                student.courses?.length || 0
              }
            />

          </div>

        </CardContent>

      </Card>

    </div>

  );

}