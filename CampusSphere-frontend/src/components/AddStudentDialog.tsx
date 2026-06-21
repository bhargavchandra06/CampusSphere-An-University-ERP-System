import { useEffect, useState } from "react";
import { createStudent } from "@/api/studentApi";
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

interface AddStudentDialogProps {
  onStudentAdded: () => void;
}

export function AddStudentDialog({
  onStudentAdded,
}: AddStudentDialogProps) {
  const [open, setOpen] = useState(false);

  const [id, setId] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [year, setYear] = useState("");

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
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  const handleSubmit = async () => {
    try {
      await createStudent({
        id: Number(id),
        rollNo,
        name,
        email,
        age: Number(age),
        phonenumber: phoneNumber,
        year: Number(year),
        department: {
          id: Number(departmentId),
        },
      });

      onStudentAdded();
      setOpen(false);

      setId("");
      setRollNo("");
      setName("");
      setEmail("");
      setAge("");
      setPhoneNumber("");
      setYear("");

      if (departments.length > 0) {
        setDepartmentId(String(departments[0].id));
      }
    } catch (error) {
      console.error("Failed to create student", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Student</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>ID</Label>
            <Input
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          <div>
            <Label>Roll No</Label>
            <Input
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
            />
          </div>

          <div>
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label>Age</Label>
            <Input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div>
            <Label>Phone Number</Label>
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div>
            <Label>Year</Label>
            <Input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          <div>
            <Label>Department</Label>

            <select
              className="w-full rounded-md border p-2"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
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