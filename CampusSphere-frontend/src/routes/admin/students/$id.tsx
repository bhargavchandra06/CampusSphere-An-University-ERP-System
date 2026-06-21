import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getStudentById } from "@/api/studentApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/admin/students/$id")({
  component: StudentDetailsPage,
});

function StudentDetailsPage() {
  const {id} = Route.useParams() as { id: string }; 

  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    getStudentById(Number(id))
      .then(setStudent)
      .catch(console.error);
  }, [id]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <p><b>ID:</b> {student.id}</p>
          <p><b>Roll No:</b> {student.rollNo}</p>
          <p><b>Name:</b> {student.name}</p>
          <p><b>Email:</b> {student.email}</p>
          <p><b>Age:</b> {student.age}</p>
          <p><b>Phone:</b> {student.phonenumber}</p>
          <p><b>Year:</b> {student.year}</p>
          <p><b>Department:</b> {student.department.departmentName}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <p><b>City:</b> {student.address?.city}</p>
          <p><b>State:</b> {student.address?.state}</p>
          <p><b>Pincode:</b> {student.address?.pincode}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Courses</CardTitle>
        </CardHeader>

        <CardContent>
          {student.courses.length === 0 ? (
            <p>No courses assigned.</p>
          ) : (
            <ul className="space-y-2">
              {student.courses.map((course: any) => (
                <li key={course.id}>
                  {course.courseName}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

    </div>
  );
}