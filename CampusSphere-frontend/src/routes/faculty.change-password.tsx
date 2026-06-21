import { createFileRoute } from "@tanstack/react-router";
import { ChangePasswordForm } from "@/components/ChangePasswordForm";
import { PageHeader } from "@/components/layout/DashboardLayout";

export const Route = createFileRoute("/faculty/change-password")({
  component: () => (
    <div>
      <PageHeader title="Change Password" description="Update your account password." />
      <ChangePasswordForm />
    </div>
  ),
});
