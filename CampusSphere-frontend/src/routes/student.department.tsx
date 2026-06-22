import { createFileRoute } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { PageHeader } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { getCurrentStudentDepartment } from "@/api/studentApi";

export const Route = createFileRoute("/student/department")({
  component: StudentDepartment,
});
function StudentDepartment() {

  const [department, setDepartment] =
    useState<any>(null);

    const [search, setSearch] = useState("");

  useEffect(() => {

    getCurrentStudentDepartment()
      .then(setDepartment)
      .catch(console.error);

  }, []);

  if (!department) {

    return <div>Loading...</div>;

  }
  const filteredFaculty =
  department.faculties?.filter((f: any) =>
    f.facultyName
      .toLowerCase()
      .includes(search.toLowerCase())
  ) || [];

  return (
    <div>
      <PageHeader title="My Department" />
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="h-7 w-7" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-lg font-semibold text-foreground">{department.departmentName}</div> 
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="rounded-md border border-border p-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Total Courses offered</div>
              <div className="mt-1 text-lg font-semibold text-foreground">{department.courses?.length || 0}</div>
            </div>
            <div className="rounded-md border border-border p-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Faculty</div>
              <div className="mt-1 text-lg font-semibold text-foreground">{department.faculties?.length || 0}</div>
            </div>
            <div className="rounded-md border border-border p-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Students</div>
              <div className="mt-1 text-lg font-semibold text-foreground">{department.students?.length || 0}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Department faculty</CardTitle>
        </CardHeader>
        <div className="mt-3">
            <input
              type="text"
              placeholder="Search faculty..."
              className="w-full rounded-md border p-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        <CardContent className="divide-y divide-border">
       {filteredFaculty.map((f:any) => (
            <div key={f.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-foreground">{f.name}</div>
                <div className="truncate text-xs text-muted-foreground">{f.email}</div>
                <Link
                      to="/student/faculties/$id"
                      params={{
                        id: String(f.id),
                      }}
                      className="text-blue-600 hover:underline text-xs"
                    >
                      View Details
                    </Link>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{f.designation}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
