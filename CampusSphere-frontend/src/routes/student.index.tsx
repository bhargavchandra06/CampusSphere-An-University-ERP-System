import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Building2, GraduationCap } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { PageHeader } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  getCurrentStudent,
  getCurrentStudentCourses,
} from "@/api/studentApi";

export const Route = createFileRoute("/student/")({
  component: StudentDashboard,
});

function StudentDashboard() {

  const [student, setStudent] = useState<any>(null);

  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {

    getCurrentStudent()
      .then(setStudent)
      .catch(console.error);

    getCurrentStudentCourses()
      .then(setCourses)
      .catch(console.error);

  }, []);

  if (!student) {

    return <div>Loading...</div>;

  }

  return (

    <div>

      <PageHeader
        title={`Welcome, ${student.name}`}
        description={`Roll No • ${student.rollNo}`}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <StatCard
          label="Enrolled Courses"
          value={courses.length}
          icon={BookOpen}
        />

        <StatCard
          label="Department"
          value={student.department?.departmentName || "N/A"}
          icon={Building2}
          tone="emerald"
        />

        <StatCard
          label="Year"
          value={student.year}
          icon={GraduationCap}
          tone="amber"
        />

      </div>

      <Card className="mt-6">

        <CardHeader>

          <CardTitle className="text-base">

            Your courses this term

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

                  {course.courseCode}
                  {" • "}
                  {course.faculty?.facultyName || "Not Assigned"}

                </div>

              </div>

              <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">

                {course.credits} cr

              </span>

            </div>

          ))}

        </CardContent>

      </Card>

    </div>

  );

}