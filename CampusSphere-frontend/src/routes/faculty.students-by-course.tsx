import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/DashboardLayout";
import { DataTable, type Column } from "@/components/DataTable";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import {
  getCurrentFacultyCourses,
  getStudentsByMyCourse,
} from "@/api/facultyApi";

export const Route = createFileRoute("/faculty/students-by-course")({
  component: StudentsByCourse,
});

const columns: Column<any>[] = [
  {
    key: "id",
    header: "ID",
    cell: (s) => (
      <span className="font-mono text-xs">
        {s.id}
      </span>
    ),
    searchValue: (s) => String(s.id),
  },

  {
    key: "name",
    header: "Name",
    cell: (s) => (
      <span className="font-medium text-foreground">
        {s.name}
      </span>
    ),
    searchValue: (s) => s.name,
  },

  {
    key: "email",
    header: "Email",
    cell: (s) => s.email,
    searchValue: (s) => s.email,
  },

  {
    key: "department",
    header: "Department",
    cell: (s) => s.department?.departmentName,
    searchValue: (s) => s.department?.departmentName ?? "",
  },

  {
    key: "age",
    header: "Age",
    cell: (s) => s.age,
  },
];

function StudentsByCourse() {

  const [courses, setCourses] =
    useState<any[]>([]);

  const [students, setStudents] =
    useState<any[]>([]);

  const [selected, setSelected] =
    useState("");

  useEffect(() => {

    getCurrentFacultyCourses()
      .then((data) => {

        setCourses(data);

        if (data.length > 0) {

          setSelected(
            String(data[0].id)
          );

        }

      })
      .catch(console.error);

  }, []);

  useEffect(() => {

    if (!selected) {

      return;

    }

    getStudentsByMyCourse(
      Number(selected)
    )
      .then(setStudents)
      .catch(console.error);

  }, [selected]);

  return (

    <div>

      <PageHeader
        title="Students by Course"
        description="View students enrolled in each of your courses."
      />

      <Card className="mb-4">

        <CardContent className="grid grid-cols-1 items-end gap-3 p-4 sm:grid-cols-[minmax(0,1fr)_auto]">

          <div className="space-y-2">

            <Label htmlFor="course">

              Select a course

            </Label>

            <Select
              value={selected}
              onValueChange={setSelected}
            >

              <SelectTrigger id="course">

                <SelectValue
                  placeholder="Choose course"
                />

              </SelectTrigger>

              <SelectContent>

                {courses.map((course) => (

                  <SelectItem
                    key={course.id}
                    value={String(course.id)}
                  >

                    {course.courseCode}
                    {" - "}
                    {course.courseName}

                  </SelectItem>

                ))}

              </SelectContent>

            </Select>

          </div>

          <div className="text-sm text-muted-foreground">

            {students.length}
            {" "}
            students enrolled

          </div>

        </CardContent>

      </Card>

      <DataTable
        rows={students}
        columns={columns}
        searchPlaceholder="Search students..."
        emptyMessage="No students enrolled in this course."
      />

    </div>

  );

}

