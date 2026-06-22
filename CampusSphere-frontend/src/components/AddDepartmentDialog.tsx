import { useState } from "react";
import { createDepartment } from "@/api/departmentApi";
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

interface AddDepartmentDialogProps {
  onDepartmentAdded: () => void;
}

export function AddDepartmentDialog({
  onDepartmentAdded,
}: AddDepartmentDialogProps) {

  const [departmentName, setDepartmentName] =
    useState("");

  const handleSubmit = async () => {

    try {

      await createDepartment({
        departmentName,
      });

      onDepartmentAdded();

      setDepartmentName("");

    } catch (error) {

      console.error(error);

    }

  };

  return (
    <Dialog>

      <DialogTrigger asChild>
        <Button>
          Add Department
        </Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Add Department
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

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
            onClick={handleSubmit}
          >
            Save
          </Button>

        </div>

      </DialogContent>

    </Dialog>
  );
}