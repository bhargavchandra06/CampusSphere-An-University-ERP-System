import { useEffect, useState } from "react";
import {
  getStudents,
  updateAddress,
} from "@/api/studentApi";
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

interface EditAddressDialogProps {
  onAddressUpdated: () => void;
}

export function EditAddressDialog({
  onAddressUpdated,
}: EditAddressDialogProps) {

  const [open, setOpen] = useState(false);

  const [students, setStudents] = useState<any[]>([]);

  const [studentId, setStudentId] = useState("");

  const [addressId, setAddressId] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    getStudents()
      .then(setStudents)
      .catch(console.error);
  }, []);

  const handleStudentChange = (
    value: string
  ) => {

    setStudentId(value);

    const student = students.find(
      (s) => String(s.id) === value
    );

    if (!student) return;

    setAddressId(
      String(student.address?.id || "")
    );

    setCity(
      student.address?.city || ""
    );

    setState(
      student.address?.state || ""
    );

    setPincode(
      student.address?.pincode || ""
    );
  };

  const handleSave = async () => {
    try {

      await updateAddress(
        Number(studentId),
        {
          id: Number(addressId),
          city,
          state,
          pincode,
        }
      );

      onAddressUpdated();

      setOpen(false);

    } catch (error: any) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to update address"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>
        <Button variant="outline">
          Edit Address
        </Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Edit Address
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div>
            <Label>Student</Label>

            <select
              className="w-full rounded-md border p-2"
              value={studentId}
              onChange={(e) =>
                handleStudentChange(
                  e.target.value
                )
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
                  {student.name}
                </option>
              ))}

            </select>
          </div>

          <div>
            <Label>City</Label>

            <Input
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
            />
          </div>

          <div>
            <Label>State</Label>

            <Input
              value={state}
              onChange={(e) =>
                setState(e.target.value)
              }
            />
          </div>

          <div>
            <Label>Pincode</Label>

            <Input
              value={pincode}
              onChange={(e) =>
                setPincode(e.target.value)
              }
            />
          </div>

          <Button
            className="w-full"
            onClick={handleSave}
          >
            Save Address
          </Button>

        </div>

      </DialogContent>

    </Dialog>
  );
}