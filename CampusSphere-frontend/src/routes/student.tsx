import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, User, BookOpen, Building2, KeyRound } from "lucide-react";
import { DashboardLayout, type NavItem } from "@/components/layout/DashboardLayout";

const nav: NavItem[] = [
  { label: "Dashboard", to: "/student", icon: LayoutDashboard },
  { label: "Profile", to: "/student/profile", icon: User },
  { label: "My Courses", to: "/student/courses", icon: BookOpen },
  { label: "My Department", to: "/student/department", icon: Building2 },
  { label: "Change Password", to: "/student/change-password", icon: KeyRound },
];

export const Route = createFileRoute("/student")({
  component: () => <DashboardLayout title="Student Portal" allow="STUDENT" nav={nav} />,
});
