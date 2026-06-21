import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "@/api/studentApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface DeleteStudentDialogProps {
  onStudentDeleted: () => void;
}

export function DeleteStudentDialog({
  onStudentDeleted,
}: DeleteStudentDialogProps) {

  const [open, setOpen] = useState(false);

  const [students, setStudents] = useState<any[]>([]);

  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    getStudents()
      .then(setStudents)
      .catch(console.error);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          Delete Student
        </Button>
      </DialogTrigger>

      <DialogContent>
  <DialogHeader>
    <DialogTitle>Delete Student</DialogTitle>
  </DialogHeader>

  <div className="space-y-4">
    <div>
      <Label>Select Student</Label>

      <select
        className="w-full rounded-md border p-2"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      >
        <option value="">Select Student</option>

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

    <Button
      variant="destructive"
      className="w-full"
      onClick={async () => {
        try {
          await deleteStudent(Number(studentId));

          onStudentDeleted();

          setOpen(false);

          setStudentId("");
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