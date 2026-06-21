import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute(
  "/admin/change-password"
)({
  component: ChangePasswordPage,
});

function ChangePasswordPage() {

  const { changePassword } = useAuth();

  const [oldPassword, setOldPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleSubmit = async () => {

    if (newPassword !== confirmPassword) {

      alert(
        "New password and confirm password do not match"
      );

      return;
    }

    try {

      await changePassword(
        oldPassword,
        newPassword
      );

      alert(
        "Password changed successfully"
      );

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (error) {

      console.error(error);

      alert(
        "Failed to change password"
      );

    }

  };

  return (

    <div className="space-y-6">

      <Card>

        <CardHeader>

          <CardTitle>
            Change Password
          </CardTitle>

        </CardHeader>

        <CardContent className="space-y-4">

          <div>

            <Label>
              Current Password
            </Label>

            <Input
              type="password"
              value={oldPassword}
              onChange={(e) =>
                setOldPassword(
                  e.target.value
                )
              }
            />

          </div>

          <div>

            <Label>
              New Password
            </Label>

            <Input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
            />

          </div>

          <div>

            <Label>
              Confirm Password
            </Label>

            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

          </div>

          <Button
            className="w-full"
            onClick={handleSubmit}
          >
            Update Password
          </Button>

        </CardContent>

      </Card>

    </div>

  );
}