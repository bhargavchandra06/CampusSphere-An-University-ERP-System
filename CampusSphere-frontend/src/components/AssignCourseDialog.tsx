import { useEffect, useState } from "react";
import { getStudents, assignCourse } from "@/api/studentApi";
import { getCourses } from "@/api/courseApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface AssignCourseDialogProps {
  onCourseAssigned: () => void;
}

export function AssignCourseDialog({
  onCourseAssigned,
}: AssignCourseDialogProps) {

  const [open, setOpen] = useState(false);

  const [students, setStudents] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);

  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");

  useEffect(() => {
    getStudents()
      .then(setStudents)
      .catch(console.error);

    getCourses()
      .then(setCourses)
      .catch(console.error);
  }, []);

 const handleAssign = async () => {
  try {

    await assignCourse(
      Number(studentId),
      Number(courseId)
    );

    onCourseAssigned();

    setOpen(false);

    setStudentId("");
    setCourseId("");

  } catch (error: any) {

    console.error(error);

    alert(
      error.response?.data?.message ||
      "Course assignment failed"
    );

  }
};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Assign Course
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Assign Course
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div>
            <Label>Student</Label>

            <select
              className="w-full rounded-md border p-2"
              value={studentId}
              onChange={(e) =>
                setStudentId(e.target.value)
              }
            >
              <option value="">
                Select Student
              </option>

              {students.map((student) => (
                <option
                  key={student.id}
                  value={student.id}
                >
                  {student.name} ({student.rollNo})
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Course</Label>

            <select
              className="w-full rounded-md border p-2"
              value={courseId}
              onChange={(e) =>
                setCourseId(e.target.value)
              }
            >
              <option value="">
                Select Course
              </option>

              {courses.map((course) => (
                <option
                  key={course.id}
                  value={course.id}
                >
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          <Button
            className="w-full"
            onClick={handleAssign}
          >
            Assign
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}