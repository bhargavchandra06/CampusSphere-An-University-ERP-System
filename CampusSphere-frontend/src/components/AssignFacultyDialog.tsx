import { useEffect, useState } from "react";
import { getCourses, assignFaculty } from "@/api/courseApi";
import { getFaculties } from "@/api/facultyApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface AssignFacultyDialogProps {
  onFacultyAssigned: () => void;
}

export function AssignFacultyDialog({
  onFacultyAssigned,
}: AssignFacultyDialogProps) {

  const [open, setOpen] = useState(false);

  const [courses, setCourses] = useState<any[]>([]);
  const [faculties, setFaculties] = useState<any[]>([]);

  const [courseId, setCourseId] = useState("");
  const [facultyId, setFacultyId] = useState("");

  useEffect(() => {

    getCourses()
      .then(setCourses)
      .catch(console.error);

    getFaculties()
      .then(setFaculties)
      .catch(console.error);

  }, []);

  const handleAssign = async () => {

    try {

      await assignFaculty(
        Number(courseId),
        Number(facultyId)
      );

      onFacultyAssigned();

      setOpen(false);

      setCourseId("");
      setFacultyId("");

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>
        <Button variant="outline">
          Assign Faculty
        </Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Assign Faculty
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

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

          <div>

            <Label>Faculty</Label>

            <select
              className="w-full rounded-md border p-2"
              value={facultyId}
              onChange={(e) =>
                setFacultyId(e.target.value)
              }
            >

              <option value="">
                Select Faculty
              </option>

              {faculties.map((faculty) => (

                <option
                  key={faculty.id}
                  value={faculty.id}
                >
                  {faculty.facultyName}
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