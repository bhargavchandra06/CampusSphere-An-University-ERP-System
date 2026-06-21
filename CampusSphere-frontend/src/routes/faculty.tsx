import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, User, BookOpen, Users, KeyRound } from "lucide-react";
import { DashboardLayout, type NavItem } from "@/components/layout/DashboardLayout";

const nav: NavItem[] = [
  { label: "Dashboard", to: "/faculty", icon: LayoutDashboard },
  { label: "Profile", to: "/faculty/profile", icon: User },
  { label: "My Courses", to: "/faculty/courses", icon: BookOpen },
  { label: "Students by Course", to: "/faculty/students-by-course", icon: Users },
  { label: "Change Password", to: "/faculty/change-password", icon: KeyRound },
];

export const Route = createFileRoute("/faculty")({
  component: () => <DashboardLayout title="Faculty Portal" allow="FACULTY" nav={nav} />,
});
