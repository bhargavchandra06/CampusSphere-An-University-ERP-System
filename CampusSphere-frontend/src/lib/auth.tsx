import { createContext, useContext, useState, type ReactNode } from "react";
import api from "@/lib/axios";
export type Role = "ADMIN" | "FACULTY" | "STUDENT";

export interface AuthUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (username: string, password: string, role: Role) => Promise<AuthUser>;
  logout: () => void;
  changePassword: (oldPwd: string, newPwd: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "campussphere.auth";

// Mock credentials — replace with backend JWT login later
function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());

  const login = async (username: string, password: string, role: Role): Promise<AuthUser> => {
    const response = await api.post("/auth/login", { username, password, role });
    const data = response.data;
    const loggedInUser: AuthUser = {
      id: "",
      username: data.username,
      name: data.username,
      email: data.username,
      role: data.role,
    };
    setUser(loggedInUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
    localStorage.setItem("token", data.token);
    return loggedInUser;
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem("token");
  };

  const changePassword = async (oldPwd: string, newPwd: string) => {
    await api.put("/auth/change-password", {
      oldPassword: oldPwd,
      newPassword: newPwd,
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function dashboardPathFor(role: Role): string {
  if (role === "ADMIN") return "/admin";
  if (role === "FACULTY") return "/faculty";
  return "/student";
}
