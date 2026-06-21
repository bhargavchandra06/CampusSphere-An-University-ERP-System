import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/DashboardLayout";
import { DataTable, type Column } from "@/components/DataTable";
import { getCourses } from "@/api/courseApi";
import { AddCourseDialog } from "@/components/AddCourseDialog";
import { EditCourseDialog } from "@/components/EditCourseDialog";
import { DeleteCourseDialog } from "@/components/DeleteCourseDialog";
import { AssignFacultyDialog } from "@/components/AssignFacultyDialog";
import { RemoveFacultyDialog } from "@/components/RemoveFacultyDialog";
import {
  createFileRoute,
  Link,
  Outlet,
} from "@tanstack/react-router";
export const Route = createFileRoute("/admin/courses")({
  component: CoursesPage,
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
    key: "faculty",
    header: "Faculty",
    cell: (c) => c.faculty ? c.faculty.facultyName : "Not Assigned",
    searchValue: (c) => c.faculty?.facultyName ?? "",
  },
  {
    key: "students",
    header: "Students",
    cell: (c) => c.students.length,
  },
  {
  key: "actions",
  header: "Actions",
  cell: (c) => (
    <Link
      to="/admin/courses/$id"
      params={{ id: String(c.id) }}
      className="text-blue-600 hover:underline"
    >
      View Details
    </Link>
  ),
},
];

function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);

useEffect(() => {
  fetchCourses();
}, []);

const fetchCourses = () => {
  getCourses()
    .then((data) => {
      console.log("Courses:", data);
      setCourses(data);
    })
    .catch((error) => {
      console.error("Error fetching courses:", error);
    });
};
  return (
  <>
    <div>

      <PageHeader
        title="Courses"
        description="Manage course catalog and faculty assignments."
        action={
          <div className="flex gap-2">

            <AddCourseDialog
              onCourseAdded={fetchCourses}
            />

            <EditCourseDialog
              onCourseUpdated={fetchCourses}
            />

            <DeleteCourseDialog
              onCourseDeleted={fetchCourses}
            />

            <AssignFacultyDialog
              onFacultyAssigned={fetchCourses}
            />

            <RemoveFacultyDialog
              onFacultyRemoved={fetchCourses}
            />

          </div>
        }
      />

      <DataTable
        rows={courses}
        columns={columns}
        searchPlaceholder="Search by code, title, faculty..."
      />

    </div>

    <Outlet />

  </>
);
}