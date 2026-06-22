import { useEffect, useState } from "react";
import {
  getDepartments,
  deleteDepartment,
} from "@/api/departmentApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface DeleteDepartmentDialogProps {
  onDepartmentDeleted: () => void;
}

export function DeleteDepartmentDialog({
  onDepartmentDeleted,
}: DeleteDepartmentDialogProps) {

  const [open, setOpen] = useState(false);

  const [departments, setDepartments] =
    useState<any[]>([]);

  const [departmentId, setDepartmentId] =
    useState("");

  useEffect(() => {

    getDepartments()
      .then(setDepartments)
      .catch(console.error);

  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogTrigger asChild>

        <Button variant="destructive">
          Delete Department
        </Button>

      </DialogTrigger>

      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Delete Department
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-4">

          <div>

            <Label>
              Select Department
            </Label>

            <select
              className="w-full rounded-md border p-2"
              value={departmentId}
              onChange={(e) =>
                setDepartmentId(
                  e.target.value
                )
              }
            >

              <option value="">
                Select Department
              </option>

              {departments.map(
                (department) => (

                  <option
                    key={department.id}
                    value={department.id}
                  >
                    {department.departmentName}
                  </option>

                )
              )}

            </select>

          </div>

          <Button
            variant="destructive"
            className="w-full"
            onClick={async () => {

              try {

                await deleteDepartment(
                  Number(departmentId)
                );

                onDepartmentDeleted();

                setOpen(false);

                setDepartmentId("");

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