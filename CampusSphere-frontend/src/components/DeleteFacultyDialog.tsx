import { useEffect, useState } from "react";
import {
  getFaculties,
  deleteFaculty,
} from "@/api/facultyApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface DeleteFacultyDialogProps {
  onFacultyDeleted: () => void;
}

export function DeleteFacultyDialog({
  onFacultyDeleted,
}: DeleteFacultyDialogProps) {

  const [open, setOpen] = useState(false);

  const [faculties, setFaculties] = useState<any[]>([]);

  const [facultyId, setFacultyId] = useState("");

  useEffect(() => {
    getFaculties()
      .then(setFaculties)
      .catch(console.error);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>
        <Button variant="destructive">
          Delete Faculty
        </Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Delete Faculty
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div>
            <Label>Select Faculty</Label>

            <select
              className="w-full rounded-md border p-2"
              value={facultyId}
              onChange={(e) =>
                setFacultyId(
                  e.target.value
                )
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
            variant="destructive"
            className="w-full"
            onClick={async () => {

              try {

                await deleteFaculty(
                  Number(facultyId)
                );

                onFacultyDeleted();

                setOpen(false);

                setFacultyId("");

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