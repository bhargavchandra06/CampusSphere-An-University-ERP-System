import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Users, Building2 } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { PageHeader } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  getCurrentFaculty,
  getCurrentFacultyCourses,
} from "@/api/facultyApi";

export const Route = createFileRoute("/faculty/")({
  component: FacultyDashboard,
});

function FacultyDashboard() {

  const [faculty, setFaculty] = useState<any>(null);

  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {

    getCurrentFaculty()
      .then(setFaculty)
      .catch(console.error);

    getCurrentFacultyCourses()
      .then(setCourses)
      .catch(console.error);

  }, []);

  if (!faculty) {

    return <div>Loading...</div>;

  }

  const totalStudents = courses.reduce(

    (sum, course) =>

      sum + (course.students.length || 0),
    0

  );

  return (

    <div>

      <PageHeader
        title={`Welcome, ${faculty.facultyName}`}
        description={faculty.designation}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <StatCard
          label="My Courses"
          value={courses.length}
          icon={BookOpen}
        />

        <StatCard
          label="My Students"
          value={totalStudents}
          icon={Users}
          tone="emerald"
        />

        <StatCard
          label="Department"
          value={faculty.department?.departmentName || "N/A"}
          icon={Building2}
          tone="amber"
        />

      </div>

      <Card className="mt-6">

        <CardHeader>

          <CardTitle className="text-base">

            Courses you teach

          </CardTitle>

        </CardHeader>

        <CardContent className="divide-y divide-border">

          {courses.map((course) => (

            <div
              key={course.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3 first:pt-0 last:pb-0"
            >

              <div className="min-w-0">

                <div className="truncate text-sm font-medium text-foreground">

                  {course.courseName}

                </div>

                <div className="truncate text-xs text-muted-foreground">

                  {course.courseCode} • {course.credits} credits

                </div>

              </div>

              <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">

               {course.students?.length || 0} enrolled

              </span>

            </div>

          ))}

        </CardContent>

      </Card>

    </div>

  );

}