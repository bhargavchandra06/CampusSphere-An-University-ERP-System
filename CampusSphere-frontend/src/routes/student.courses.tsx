import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/DashboardLayout";
import { DataTable, type Column } from "@/components/DataTable";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { getCurrentStudentCourses } from "@/api/studentApi";

export const Route = createFileRoute("/student/courses")({
  component: StudentCourses,
});

const columns: Column<any>[] = [
  {
    key: "code",
    header: "Code",
    cell: (c) => (
      <span className="font-mono text-xs">
        {c.courseCode}
      </span>
    ),
    searchValue: (c) => c.courseCode,
  },

  {
    key: "title",
    header: "Title",
    cell: (c) => (
      <span className="font-medium text-foreground">
        {c.courseName}
      </span>
    ),
    searchValue: (c) => c.courseName,
  },

  {
    key: "department",
    header: "Department",
    cell: (c) =>
      c.department?.departmentName,

    searchValue: (c) =>
      c.department?.departmentName ?? "",
  },

  {
    key: "credits",
    header: "Credits",
    cell: (c) => c.credits,
  },

  {
    key: "faculty",
    header: "Faculty",
    cell: (c) =>
      c.faculty?.facultyName ??
      "Not Assigned",

    searchValue: (c) =>
      c.faculty?.facultyName ?? "",
  },
];
function StudentCourses() {

  const [courses, setCourses] =
    useState<any[]>([]);

  useEffect(() => {

    getCurrentStudentCourses()
      .then(setCourses)
      .catch(console.error);

  }, []);

  return (

    <div>

      <PageHeader
        title="My Courses"
        description="Courses you are currently enrolled in."
      />

      <DataTable
        rows={courses}
        columns={columns}
        searchPlaceholder="Search your courses..."
      />

    </div>

  );

}