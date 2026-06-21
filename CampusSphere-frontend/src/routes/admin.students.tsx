

import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/DashboardLayout";
import { DataTable, type Column } from "@/components/DataTable";
import { getStudents } from "@/api/studentApi";
import { AddStudentDialog } from "@/components/AddStudentDialog";
import { DeleteStudentDialog } from "@/components/DeleteStudentDialog";
import { EditStudentDialog } from "@/components/EditStudentDialog";
import { AssignCourseDialog } from "@/components/AssignCourseDialog";
import { RemoveCourseDialog } from "@/components/RemoveCourseDialog";
import { EditAddressDialog } from "@/components/EditAddressDialog";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/students")({
  component: StudentsPage,
});

const columns: Column<any>[] = [
  {
    key: "rollNo",
    header: "Roll No",
    cell: (s) => <span className="font-mono text-xs">{s.rollNo}</span>,
    searchValue: (s) => s.rollNo,
  },
  {
    key: "name",
    header: "Name",
    cell: (s) => <span className="font-medium text-foreground">{s.name}</span>,
    searchValue: (s) => s.name,
  },
  {
    key: "email",
    header: "Email",
    cell: (s) => s.email,
    searchValue: (s) => s.email,
  },
  {
    key: "dept",
    header: "Department",
    cell: (s) => s.department.departmentName,
    searchValue: (s) => s.department.departmentName,
  },
  {
    key: "year",
    header: "Year",
    cell: (s) => s.year,
    searchValue: (s) => String(s.year),
  },
  {
    key: "courses",
    header: "Courses",
    cell: (s) => s.courses.length,
  },
  {
  key: "actions",
  header: "Actions",
  cell: (s) => (
    <Link
      to="/admin/students/$id"
      params={{ id: String(s.id) }}
      className="text-blue-600 hover:underline"
    >
      View Details
    </Link>
  ),
},
];

function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);

useEffect(() => {
  fetchStudents();
}, []);

const fetchStudents = () => {
  getStudents()
    .then((data) => {
      setStudents(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

  return (
  <>
    <div>
      <PageHeader
        title="Students"
        description="Manage student records, enrollments, and assignments."
        action={
          <div className="flex gap-2">
            <AddStudentDialog
              onStudentAdded={fetchStudents}
            />

            <EditStudentDialog
              onStudentUpdated={fetchStudents}
            />

            <DeleteStudentDialog
              onStudentDeleted={fetchStudents}
            />

            <AssignCourseDialog
              onCourseAssigned={fetchStudents}
            />

            <RemoveCourseDialog
              onCourseRemoved={fetchStudents}
            />

            <EditAddressDialog
              onAddressUpdated={fetchStudents}
            />
          </div>
        }
      />

      <DataTable
        rows={students}
        columns={columns}
        searchPlaceholder="Search by name, roll no, email…"
      />
    </div>

    <Outlet />
  </>
);
}