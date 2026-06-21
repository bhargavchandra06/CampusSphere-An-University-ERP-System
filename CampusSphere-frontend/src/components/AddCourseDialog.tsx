import { useEffect, useState } from "react";
import { createCourse } from "@/api/courseApi";
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

interface AddCourseDialogProps {
  onCourseAdded: () => void;
}

export function AddCourseDialog({
  onCourseAdded,
}: AddCourseDialogProps) {

  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [credits, setCredits] = useState("");

  const [departments, setDepartments] = useState<any[]>([]);
  const [departmentId, setDepartmentId] = useState("");

  useEffect(() => {
    getDepartments()
      .then((data) => {
        setDepartments(data);

        if (data.length > 0) {
          setDepartmentId(String(data[0].id));
        }
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async () => {
    try {

      await createCourse({
        courseName,
        courseCode,
        credits: Number(credits),
        department: {
          id: Number(departmentId),
        },
      });

      alert("Course created successfully");

      onCourseAdded();

      setCourseName("");
      setCourseCode("");
      setCredits("");

      if (departments.length > 0) {
        setDepartmentId(String(departments[0].id));
      }

    } catch (error) {

      console.error(error);
      alert("Failed to create course");

    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Add Course
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add Course
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

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
                setDepartmentId(e.target.value)
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
            onClick={handleSubmit}
          >
            Save
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}