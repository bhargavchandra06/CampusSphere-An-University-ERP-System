import { useEffect, useState } from "react";
import {
  getFaculties,
  updateFaculty,
} from "@/api/facultyApi";
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

interface EditFacultyDialogProps {
  onFacultyUpdated: () => void;
}

export function EditFacultyDialog({
  onFacultyUpdated,
}: EditFacultyDialogProps) {

  const [open, setOpen] = useState(false);

  const [faculties, setFaculties] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);

  const [facultyId, setFacultyId] = useState("");

  const [facultyName, setFacultyName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  useEffect(() => {

    getFaculties()
      .then(setFaculties)
      .catch(console.error);

    getDepartments()
      .then(setDepartments)
      .catch(console.error);

  }, []);

  const handleFacultyChange = (
    value: string
  ) => {

    setFacultyId(value);

    const faculty = faculties.find(
      (f) => String(f.id) === value
    );

    if (!faculty) return;

    setFacultyName(
      faculty.facultyName
    );

    setEmail(
      faculty.email
    );

    setDesignation(
      faculty.designation
    );

    setDepartmentId(
      String(faculty.department.id)
    );
  };

  const handleUpdate = async () => {

    try {

      await updateFaculty(
        Number(facultyId),
        {
          facultyName,
          email,
          designation,
          department: {
            id: Number(departmentId),
          },
        }
      );

      onFacultyUpdated();

      setOpen(false);

    } catch (error) {

      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>
        <Button variant="secondary">
          Edit Faculty
        </Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Edit Faculty
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div>
            <Label>Select Faculty</Label>

            <select
              className="w-full rounded-md border p-2"
              value={facultyId}
              onChange={(e) =>
                handleFacultyChange(
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

          <div>
            <Label>Faculty Name</Label>

            <Input
              value={facultyName}
              onChange={(e) =>
                setFacultyName(
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <Label>Email</Label>

            <Input
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <Label>Designation</Label>

            <Input
              value={designation}
              onChange={(e) =>
                setDesignation(
                  e.target.value
                )
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