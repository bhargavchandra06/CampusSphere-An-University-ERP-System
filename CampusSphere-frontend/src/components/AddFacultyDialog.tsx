import { useEffect, useState } from "react";
import { createFaculty } from "@/api/facultyApi";
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

interface AddFacultyDialogProps {
  onFacultyAdded: () => void;
}

export function AddFacultyDialog({
  onFacultyAdded,
}: AddFacultyDialogProps) {

  const [facultyName, setFacultyName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");

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

      await createFaculty({
        facultyName,
        email,
        designation,
        department: {
          id: Number(departmentId),
        },
      });

      alert("Faculty created successfully");

      onFacultyAdded();

      setFacultyName("");
      setEmail("");
      setDesignation("");

    } catch (error: any) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to create faculty"
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Faculty</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Faculty</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">


          <div>
            <Label>Faculty Name</Label>
            <Input
              value={facultyName}
              onChange={(e) =>
                setFacultyName(e.target.value)
              }
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div>
            <Label>Designation</Label>
            <Input
              value={designation}
              onChange={(e) =>
                setDesignation(e.target.value)
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
            onClick={handleSubmit}
          >
            Save
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}