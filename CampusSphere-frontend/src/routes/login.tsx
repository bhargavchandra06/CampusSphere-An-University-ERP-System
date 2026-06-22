import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  GraduationCap,
  Loader2,
  ShieldCheck,
  Shield,
  UserSquare2,
  Eye,
  EyeOff,
} from "lucide-react";

import { useAuth, dashboardPathFor } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Sign in — CampusSphere" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [role, setRole] = useState<
    "ADMIN" | "STUDENT" | "FACULTY"
  >("ADMIN");

  useEffect(() => {
    if (user) router.navigate({ to: dashboardPathFor(user.role) });
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const u = await login(username, password, role);
      router.navigate({ to: dashboardPathFor(u.role) });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative grid min-h-screen overflow-hidden md:grid-cols-2">
      {/* LEFT SIDE */}
     <div className="relative hidden overflow-hidden bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-700 p-12 text-white md:flex flex-col justify-between">
        {/* Animated blobs */}
          <div className="relative z-10">
             <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl animate-pulse"></div>

          <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-blue-300/10 blur-3xl animate-pulse"></div>

          <div className="absolute bottom-10 left-1/2 h-52 w-52 rounded-full bg-white/5 blur-3xl animate-pulse"></div>
          </div>
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/10">
            <GraduationCap className="h-7 w-7" />
          </div>
          <span className="text-2xl font-bold">
            CampusSphere
          </span>
        </div>

        <div>
          <h1 className="text-6xl font-bold leading-tight">
            University ERP,
            <br />
            <span className="text-cyan-300">
              reimagined.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg text-white/80">
            A unified platform for administrators,
            faculty, and students to manage courses,
            departments, enrollments, and academic
            records.
          </p>

          <div className="mt-14 grid grid-cols-2 gap-8">
            <div>
              <div className="text-lg font-semibold">
                🔐 Secure
              </div>
              <div className="text-sm text-white/70">
                JWT Authentication
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold">
                ⚡ Real-Time
              </div>
              <div className="text-sm text-white/70">
                Instant Academic Insights
              </div>
            </div>

            <div>
              <div className="text-lg font-semibold">
                🌐 Anywhere
              </div>
              <div className="text-sm text-white/70">
                Access from Any Device
              </div>
            </div>

            <div>
              <div className="text-lg font-semibold">
                🎓 Role-Based
              </div>
              <div className="text-sm text-white/70">
                Admin • Faculty • Student
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-white/70">
          © CampusSphere
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-12">
       <Card className="w-full max-w-lg rounded-3xl border border-white/30 bg-white/80 backdrop-blur-xl shadow-2xl">
          <CardContent className="p-10">
            <div className="mb-8 flex justify-center">
              <div className="rounded-full bg-primary/10 p-5">
                <ShieldCheck className="h-10 w-10 text-primary" />
              </div>
            </div>

            <h2 className="text-center text-4xl font-bold">
              Welcome Back
            </h2>

            <p className="mt-2 text-center text-muted-foreground">
              Sign in to continue to CampusSphere
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              <div className="space-y-2">
                <Label>Username</Label>

                <Input
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  placeholder="Enter username"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Password</Label>

                 <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                      />

                      <button
                        type="button"
                        className="absolute right-3 top-3 text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
              </div>
              <div className="space-y-3">
                  <Label>Login as</Label>

                  <div className="grid grid-cols-3 gap-4">

                    {/* ADMIN */}
                    <div
                      onClick={() => setRole("ADMIN")}
                      className={`cursor-pointer rounded-2xl border p-4 transition-all
                      ${
                        role === "ADMIN"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                      }`}
                    >
                      <div className="flex justify-center">
                        <Shield className="h-8 w-8 text-blue-600" />
                      </div>

                      <div className="mt-3 text-center font-semibold">
                        Admin
                      </div>

                      <div className="mt-1 text-center text-xs text-muted-foreground">
                        Full system access
                      </div>
                    </div>

                    {/* STUDENT */}
                    <div
                      onClick={() => setRole("STUDENT")}
                      className={`cursor-pointer rounded-2xl border p-4 transition-all
                      ${
                        role === "STUDENT"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                      }`}
                    >
                      <div className="flex justify-center">
                        <GraduationCap className="h-8 w-8 text-green-600" />
                      </div>

                      <div className="mt-3 text-center font-semibold">
                        Student
                      </div>

                      <div className="mt-1 text-center text-xs text-muted-foreground">
                        Courses & academics
                      </div>
                    </div>

                    {/* FACULTY */}
                    <div
                      onClick={() => setRole("FACULTY")}
                      className={`cursor-pointer rounded-2xl border p-4 transition-all
                      ${
                        role === "FACULTY"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                      }`}
                    >
                      <div className="flex justify-center">
                        <UserSquare2 className="h-8 w-8 text-purple-600" />
                      </div>

                      <div className="mt-3 text-center font-semibold">
                        Faculty
                      </div>

                      <div className="mt-1 text-center text-xs text-muted-foreground">
                        Courses & students
                      </div>
                    </div>

                  </div>
                </div>

              {error && (
                <div className="rounded-md border border-red-400 bg-red-50 px-3 py-2 text-sm text-red-500">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="h-14 w-full rounded-xl text-lg shadow-lg"
                disabled={loading}
                >
                {loading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}

                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-8 text-center text-sm text-muted-foreground">
              CampusSphere ERP • Secure Authentication
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

