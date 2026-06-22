import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/DashboardLayout";
import { DataTable, type Column } from "@/components/DataTable";
import { useEffect, useState } from "react";
import { getCurrentFacultyCourses } from "@/api/facultyApi";

export const Route = createFileRoute("/faculty/courses")({
  component: FacultyCourses,
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
    key: "dept",
    header: "Department",
    cell: (c) => c.department.departmentName,
    searchValue: (c) => c.department.departmentName,
  },

  {
    key: "credits",
    header: "Credits",
    cell: (c) => c.credits,
  },

  {
    key: "enrolled",
    header: "Enrolled",
    cell: (c) => c.students.length,
  },
];

function FacultyCourses() {

  const [courses, setCourses] =
    useState<any[]>([]);

  useEffect(() => {

    getCurrentFacultyCourses()
      .then(setCourses)
      .catch(console.error);

  }, []);

  return (
    <div>
      <PageHeader title="My Courses" description="Courses assigned to you." />
      <DataTable
        rows={courses}
        columns={columns}
        searchPlaceholder="Search your courses…"
      />
    </div>
  );
}
