import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute(
  "/admin/profile"
)({
  component: ProfilePage,
});

function ProfilePage() {

  const { user } = useAuth();

  return (
    <div className="space-y-6">

      <Card>

        <CardHeader>
          <CardTitle>
            Account Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <div>
            <p className="font-semibold">
              Username
            </p>

            <p>
              {user?.username}
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Name
            </p>

            <p>
              {user?.name}
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Email
            </p>

            <p>
              {user?.email}
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Role
            </p>

            <p>
              {user?.role}
            </p>
          </div>

        </CardContent>

      </Card>

    </div>
  );
}