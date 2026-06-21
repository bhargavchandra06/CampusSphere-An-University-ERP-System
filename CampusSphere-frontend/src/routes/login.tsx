import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GraduationCap, Loader2 } from "lucide-react";
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

  useEffect(() => {
    if (user) router.navigate({ to: dashboardPathFor(user.role) });
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const u = await login(username, password);
      router.navigate({ to: dashboardPathFor(u.role) });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-2">
      <div className="hidden flex-col justify-between bg-primary p-12 text-primary-foreground md:flex">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-primary-foreground/15">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-lg font-semibold">CampusSphere</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold leading-tight">University ERP, reimagined.</h1>
          <p className="mt-4 max-w-md text-primary-foreground/80">
            One platform for administrators, faculty, and students — courses, departments,
            enrollments, and more.
          </p>
        </div>
        <div className="text-xs text-primary-foreground/70">© CampusSphere</div>
      </div>

      <div className="flex items-center justify-center bg-background p-6">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <div className="mb-6 flex items-center gap-2 md:hidden">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-base font-semibold">CampusSphere</span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">Sign in</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Welcome back. Use your campus credentials.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. admin"
                  autoComplete="username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
              </div>
              {error && (
                <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Signing in…" : "Sign in"}
              </Button>
            </form>

            <div className="mt-6 rounded-md border border-border bg-muted/50 p-3 text-xs text-muted-foreground">
              <div className="font-medium text-foreground">Demo credentials</div>
              <div className="mt-1 grid grid-cols-2 gap-1">
                <span>admin / admin</span>
                <span>faculty / faculty</span>
                <span>student / student</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
