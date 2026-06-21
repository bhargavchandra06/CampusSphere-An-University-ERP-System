import {
  createFileRoute,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/DashboardLayout";
import { DataTable, type Column } from "@/components/DataTable";
import { getFaculties } from "@/api/facultyApi";
import { AddFacultyDialog } from "@/components/AddFacultyDialog";
import { EditFacultyDialog } from "@/components/EditFacultyDialog";
import { DeleteFacultyDialog } from "@/components/DeleteFacultyDialog";

export const Route = createFileRoute("/admin/faculties")({
  component: FacultiesPage,
});

const columns: Column<any>[] = [
  {
    key: "id",
    header: "ID",
    cell: (f) => (
      <span className="font-mono text-xs">
        {f.id}
      </span>
    ),
    searchValue: (f) => String(f.id),
  },
  {
    key: "name",
    header: "Name",
    cell: (f) => (
      <span className="font-medium text-foreground">
        {f.facultyName}
      </span>
    ),
    searchValue: (f) => f.facultyName,
  },
  {
    key: "email",
    header: "Email",
    cell: (f) => f.email,
    searchValue: (f) => f.email,
  },
  {
    key: "dept",
    header: "Department",
    cell: (f) => f.department.departmentName,
    searchValue: (f) => f.department.departmentName,
  },
  {
    key: "designation",
    header: "Designation",
    cell: (f) => f.designation,
    searchValue: (f) => f.designation,
  },
  {
    key: "courses",
    header: "Courses",
    cell: (f) => f.courses.length,
  },
  {
    key: "actions",
    header: "Actions",
    cell: (f) => (
      <Link
        to="/admin/faculties/$id"
        params={{ id: String(f.id) }}
        className="text-blue-600 hover:underline"
      >
        View Details
      </Link>
    ),
  },
];

function FacultiesPage() {

  const [faculties, setFaculties] =
    useState<any[]>([]);

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = () => {
    getFaculties()
      .then((data) => {
        console.log("Faculties:", data);
        setFaculties(data);
      })
      .catch((error) => {
        console.error(
          "Error fetching faculties:",
          error
        );
      });
  };

  return (
  <>
    <div>
      <PageHeader
        title="Faculties"
        description="Manage faculty members and their department assignments."
        action={
          <div className="flex gap-2">

            <AddFacultyDialog
              onFacultyAdded={fetchFaculties}
            />

            <EditFacultyDialog
              onFacultyUpdated={fetchFaculties}
            />

            <DeleteFacultyDialog
              onFacultyDeleted={fetchFaculties}
            />

          </div>
        }
      />

      <DataTable
        rows={faculties}
        columns={columns}
        searchPlaceholder="Search by name, email, designation..."
      />
    </div>

    <Outlet />
  </>
);
}