import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, Users, GraduationCap, BookOpen, Building2 } from "lucide-react";
import { DashboardLayout, type NavItem } from "@/components/layout/DashboardLayout";

const nav: NavItem[] = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Students", to: "/admin/students", icon: Users },
  { label: "Faculties", to: "/admin/faculties", icon: GraduationCap },
  { label: "Courses", to: "/admin/courses", icon: BookOpen },
  { label: "Departments", to: "/admin/departments", icon: Building2 },
];

export const Route = createFileRoute("/admin")({
  component: () => <DashboardLayout title="Admin Console" allow="ADMIN" nav={nav} />,
});
