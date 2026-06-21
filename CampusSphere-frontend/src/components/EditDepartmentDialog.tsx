import { useEffect, useState } from "react";
import {
  getDepartments,
  updateDepartment,
} from "@/api/departmentApi";
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

interface EditDepartmentDialogProps {
  onDepartmentUpdated: () => void;
}

export function EditDepartmentDialog({
  onDepartmentUpdated,
}: EditDepartmentDialogProps) {

  const [open, setOpen] = useState(false);

  const [departments, setDepartments] =
    useState<any[]>([]);

  const [departmentId, setDepartmentId] =
    useState("");

  const [departmentName, setDepartmentName] =
    useState("");

  useEffect(() => {

    getDepartments()
      .then(setDepartments)
      .catch(console.error);

  }, []);

  const handleDepartmentChange = (
    value: string
  ) => {

    setDepartmentId(value);

    const department = departments.find(
      (d) => String(d.id) === value
    );

    if (!department) return;

    setDepartmentName(
      department.departmentName
    );

  };

  const handleUpdate = async () => {

    try {

      await updateDepartment(
        Number(departmentId),
        {
          departmentName,
        }
      );

      onDepartmentUpdated();

      setOpen(false);

      setDepartmentId("");
      setDepartmentName("");

    } catch (error) {

      console.error(error);

    }

  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogTrigger asChild>

        <Button variant="secondary">
          Edit Department
        </Button>

      </DialogTrigger>

      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Edit Department
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
                handleDepartmentChange(
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

          <div>

            <Label>
              Department Name
            </Label>

            <Input
              value={departmentName}
              onChange={(e) =>
                setDepartmentName(
                  e.target.value
                )
              }
            />

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