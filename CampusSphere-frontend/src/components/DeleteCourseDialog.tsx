import { useEffect, useState } from "react";
import {
  getCourses,
  deleteCourse,
} from "@/api/courseApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface DeleteCourseDialogProps {
  onCourseDeleted: () => void;
}

export function DeleteCourseDialog({
  onCourseDeleted,
}: DeleteCourseDialogProps) {

  const [open, setOpen] = useState(false);

  const [courses, setCourses] = useState<any[]>([]);

  const [courseId, setCourseId] = useState("");

  useEffect(() => {
    getCourses()
      .then(setCourses)
      .catch(console.error);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>
        <Button variant="destructive">
          Delete Course
        </Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Delete Course
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div>

            <Label>Select Course</Label>

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
            variant="destructive"
            className="w-full"
            onClick={async () => {

              try {

                await deleteCourse(
                  Number(courseId)
                );

                onCourseDeleted();

                setOpen(false);

                setCourseId("");

              } catch (error) {

                console.error(error);

              }

            }}
          >
            Delete
          </Button>

        </div>

      </DialogContent>

    </Dialog>
  );
}