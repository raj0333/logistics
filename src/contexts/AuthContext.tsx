import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export type UserRole = "customer" | "driver";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: UserRole) => void;
  loginWithGoogle: (role?: UserRole) => void;
  signup: (name: string, email: string, password: string, role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("dh_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, _password: string, role?: UserRole) => {
    const u: User = {
      id: crypto.randomUUID(),
      name: email.split("@")[0],
      email,
      role: role || "customer",
    };
    setUser(u);
    localStorage.setItem("dh_user", JSON.stringify(u));
  };

  const loginWithGoogle = (role?: UserRole) => {
    const u: User = {
      id: crypto.randomUUID(),
      name: "Google User",
      email: "user@gmail.com",
      role: role || "customer",
    };
    setUser(u);
    localStorage.setItem("dh_user", JSON.stringify(u));
  };

  const signup = (name: string, email: string, _password: string, role: UserRole) => {
    const u: User = { id: crypto.randomUUID(), name, email, role };
    setUser(u);
    localStorage.setItem("dh_user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("dh_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
