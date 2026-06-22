import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuth, dashboardPathFor } from "@/lib/auth";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { user } = useAuth();
  return <Navigate to={user ? dashboardPathFor(user.role) : "/login"} />;
}
