import { useEffect, useState } from "react";
import {
  getStudents,
  updateStudent,
} from "@/api/studentApi";
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

interface EditStudentDialogProps {
  onStudentUpdated: () => void;
}

export function EditStudentDialog({
  onStudentUpdated,
}: EditStudentDialogProps) {
  const [open, setOpen] = useState(false);

  const [students, setStudents] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);

  const [studentId, setStudentId] = useState("");

  const [id, setId] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [year, setYear] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  useEffect(() => {
    getStudents()
      .then(setStudents)
      .catch(console.error);

    getDepartments()
      .then(setDepartments)
      .catch(console.error);
  }, []);

  const handleStudentChange = (value: string) => {
    setStudentId(value);

    const student = students.find(
      (s) => String(s.id) === value
    );

    if (!student) return;

    setId(String(student.id));
    setRollNo(student.rollNo);
    setName(student.name);
    setEmail(student.email);
    setAge(String(student.age));
    setPhoneNumber(student.phonenumber);
    setYear(String(student.year));
    setDepartmentId(String(student.department.id));
  };

  const handleUpdate = async () => {
    try {
      await updateStudent(
        Number(studentId),
        {
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
        }
      );

      onStudentUpdated();

      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          Edit Student
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div>
            <Label>Select Student</Label>

            <select
              className="w-full rounded-md border p-2"
              value={studentId}
              onChange={(e) =>
                handleStudentChange(e.target.value)
              }
            >
              <option value="">
                Select Student
              </option>

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

          <div>
            <Label>ID</Label>
            <Input value={id} disabled />
          </div>

          <div>
            <Label>Roll No</Label>
            <Input
              value={rollNo}
              onChange={(e) =>
                setRollNo(e.target.value)
              }
            />
          </div>

          <div>
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
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
            <Label>Age</Label>
            <Input
              type="number"
              value={age}
              onChange={(e) =>
                setAge(e.target.value)
              }
            />
          </div>

          <div>
            <Label>Phone Number</Label>
            <Input
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value)
              }
            />
          </div>

          <div>
            <Label>Year</Label>
            <Input
              type="number"
              value={year}
              onChange={(e) =>
                setYear(e.target.value)
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
            onClick={handleUpdate}
          >
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}