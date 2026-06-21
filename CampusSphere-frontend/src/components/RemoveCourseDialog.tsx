import { useEffect, useState } from "react";
import {
  getStudents,
  removeCourse,
} from "@/api/studentApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface RemoveCourseDialogProps {
  onCourseRemoved: () => void;
}

export function RemoveCourseDialog({
  onCourseRemoved,
}: RemoveCourseDialogProps) {

  const [open, setOpen] = useState(false);

  const [students, setStudents] = useState<any[]>([]);

  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");

  const [selectedStudent, setSelectedStudent] =
    useState<any>(null);

  useEffect(() => {
    getStudents()
      .then(setStudents)
      .catch(console.error);
  }, []);

  const handleStudentChange = (
    value: string
  ) => {

    setStudentId(value);

    const student = students.find(
      (s) => String(s.id) === value
    );

    setSelectedStudent(student);
    setCourseId("");
  };

  const handleRemove = async () => {
    try {

      await removeCourse(
        Number(studentId),
        Number(courseId)
      );

      onCourseRemoved();

      setOpen(false);

      setStudentId("");
      setCourseId("");
      setSelectedStudent(null);

    } catch (error: any) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to remove course"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          Remove Course
        </Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Remove Course
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div>
            <Label>Student</Label>

            <select
              className="w-full rounded-md border p-2"
              value={studentId}
              onChange={(e) =>
                handleStudentChange(
                  e.target.value
                )
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
                  {student.name}
                  {" "}
                  ({student.rollNo})
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
                setCourseId(
                  e.target.value
                )
              }
            >

              <option value="">
                Select Course
              </option>

              {selectedStudent?.courses?.map(
                (course: any) => (

                  <option
                    key={course.id}
                    value={course.id}
                  >
                    {course.courseName}
                  </option>

                )
              )}

            </select>

          </div>

          <Button
            className="w-full"
            onClick={handleRemove}
          >
            Remove
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}