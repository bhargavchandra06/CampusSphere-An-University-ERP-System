import { createFileRoute } from "@tanstack/react-router";
import { Users, GraduationCap, BookOpen, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { StatCard } from "@/components/StatCard";
import { PageHeader } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStudents } from "@/api/studentApi";
import { getFaculties } from "@/api/facultyApi";
import { getCourses } from "@/api/courseApi";
import { getDepartments } from "@/api/departmentApi";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [faculties, setFaculties] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    getStudents().then(setStudents);
    getFaculties().then(setFaculties);
    getCourses().then(setCourses);
    getDepartments().then(setDepartments);
  }, []);

  const recentStudents = students.slice(0, 5);

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Welcome back. Here's what's happening on campus."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Students"
          value={students.length}
          icon={Users}
          tone="primary"
          hint="Across all departments"
        />

        <StatCard
          label="Faculties"
          value={faculties.length}
          icon={GraduationCap}
          tone="emerald"
          hint="Active staff"
        />

        <StatCard
          label="Courses"
          value={courses.length}
          icon={BookOpen}
          tone="amber"
          hint="Courses offered"
        />

        <StatCard
          label="Departments"
          value={departments.length}
          icon={Building2}
          tone="rose"
          hint="Academic units"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Recently added students
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {recentStudents.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-foreground">
                    {s.name}
                  </div>

                  <div className="truncate text-xs text-muted-foreground">
                    {s.rollNo} • {s.department.departmentName}
                  </div>
                </div>

                <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                  Year {s.year}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Departments at a glance
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {departments.map((d) => (
              <div
                key={d.id}
                className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-foreground">
                    {d.departmentName}
                  </div>

                  <div className="truncate text-xs text-muted-foreground">
                    Faculties: {d.faculties.length} • Courses: {d.courses.length}
                  </div>
                </div>

                <span className="shrink-0 text-sm font-semibold text-primary">
                  {d.students.length}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}