import { useEffect, useState } from "react";
import {
  getCourses,
  updateCourse,
} from "@/api/courseApi";
import { getDepartments } from "@/api/departmentApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditCourseDialogProps {
  onCourseUpdated: () => void;
}

export function EditCourseDialog({
  onCourseUpdated,
}: EditCourseDialogProps) {

  const [open, setOpen] = useState(false);

  const [courses, setCourses] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);

  const [courseId, setCourseId] = useState("");

  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [credits, setCredits] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  useEffect(() => {

    getCourses()
      .then(setCourses)
      .catch(console.error);

    getDepartments()
      .then(setDepartments)
      .catch(console.error);

  }, []);

  const handleCourseChange = (
    value: string
  ) => {

    setCourseId(value);

    const course = courses.find(
      (c) => String(c.id) === value
    );

    if (!course) return;

    setCourseCode(course.courseCode);
    setCourseName(course.courseName);
    setCredits(String(course.credits));
    setDepartmentId(String(course.department.id));
  };

  const handleUpdate = async () => {

    try {

      await updateCourse(
        Number(courseId),
        {
          courseCode,
          courseName,
          credits: Number(credits),
          department: {
            id: Number(departmentId),
          },
        }
      );

      onCourseUpdated();

      setOpen(false);

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>
        <Button variant="secondary">
          Edit Course
        </Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Edit Course
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div>
            <Label>Select Course</Label>

            <select
              className="w-full rounded-md border p-2"
              value={courseId}
              onChange={(e) =>
                handleCourseChange(
                  e.target.value
                )
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

          <div>
            <Label>Course Code</Label>

            <Input
              value={courseCode}
              onChange={(e) =>
                setCourseCode(e.target.value)
              }
            />
          </div>

          <div>
            <Label>Course Name</Label>

            <Input
              value={courseName}
              onChange={(e) =>
                setCourseName(e.target.value)
              }
            />
          </div>

          <div>
            <Label>Credits</Label>

            <Input
              type="number"
              value={credits}
              onChange={(e) =>
                setCredits(e.target.value)
              }
            />
          </div>

          <div>

            <Label>Department</Label>

            <select
              className="w-full rounded-md border p-2"
              value={departmentId}
              onChange={(e) =>
                setDepartmentId(
                  e.target.value
                )
              }
            >
              {departments.map((department) => (
                <option
                  key={department.id}
                  value={department.id}
                >
                  {department.departmentName}
                </option>
              ))}
            </select>

          </div>

          <Button
            className="w-full"
            onClick={handleUpdate}
          >
            Update
          </Button>

        </div>

      </DialogContent>

    </Dialog>
  );
}