import {
  createFileRoute,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/DashboardLayout";
import { DataTable, type Column } from "@/components/DataTable";
import { getDepartments } from "@/api/departmentApi";
import { AddDepartmentDialog } from "@/components/AddDepartmentDialog";
import { EditDepartmentDialog } from "@/components/EditDepartmentDialog";
import { DeleteDepartmentDialog } from "@/components/DeleteDepartmentDialog";

export const Route = createFileRoute("/admin/departments")({
  component: DepartmentsPage,
});

const columns: Column<any>[] = [
  {
    key: "id",
    header: "ID",
    cell: (d) => (
      <span className="font-mono text-xs">
        {d.id}
      </span>
    ),
    searchValue: (d) => String(d.id),
  },
  {
    key: "name",
    header: "Department",
    cell: (d) => (
      <span className="font-medium text-foreground">
        {d.departmentName}
      </span>
    ),
    searchValue: (d) => d.departmentName,
  },
  {
    key: "students",
    header: "Students",
    cell: (d) => d.students.length,
  },
  {
    key: "faculty",
    header: "Faculties",
    cell: (d) => d.faculties.length,
  },
  {
    key: "courses",
    header: "Courses",
    cell: (d) => d.courses.length,
  },
  {
  key: "actions",
  header: "Actions",
  cell: (d) => (
    <Link
      to="/admin/departments/$id"
      params={{ id: String(d.id) }}
      className="text-blue-600 hover:underline"
    >
      View Details
    </Link>
  ),
  },
];

function DepartmentsPage() {
  const [departments, setDepartments] = useState<any[]>([]);

 useEffect(() => {
  fetchDepartments();
}, []);

const fetchDepartments = () => {
  getDepartments()
    .then((data) => {
      console.log("Departments:", data);
      setDepartments(data);
    })
    .catch((error) => {
      console.error("Error fetching departments:", error);
    });
};
 return (
  <>
    <div>

      <PageHeader
        title="Departments"
        description="Academic departments and their resources."
        action={
          <div className="flex gap-2">

            <AddDepartmentDialog
              onDepartmentAdded={fetchDepartments}
            />

            <EditDepartmentDialog
              onDepartmentUpdated={fetchDepartments}
            />

            <DeleteDepartmentDialog
              onDepartmentDeleted={fetchDepartments}
            />

          </div>
        }
      />

      <DataTable
        rows={departments}
        columns={columns}
        searchPlaceholder="Search departments..."
      />

    </div>

    <Outlet />

  </>
);
}