"use client";
//I have tio remove the localstorage and use the cookie

import React, { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "user" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  emailVerified: boolean;
  createdAt: string;
  avatharInitials?: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthContextValue extends AuthState {
  login: (
    credentials: LoginCredentials,
  ) => Promise<{ success: boolean; error?: string,authUser?:AuthUser }>;
  signup: (
    credentials: SignupCredentials,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  forgotPassword: (
    email: string,
  ) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (
    token: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  verifyEmail: (token: string) => Promise<{ success: boolean; error?: string }>;
  resendVerification: (
    email: string,
  ) => Promise<{ success: boolean; error?: string }>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async () => ({ success: false }),
  signup: async () => ({ success: false }),
  logout: async () => {},
  forgotPassword: async () => ({ success: false }),
  resetPassword: async () => ({ success: false }),
  verifyEmail: async () => ({ success: false }),
  resendVerification: async () => ({ success: false }),
  clearError: () => {},
});

/* ── Mock data ── */
const MOCK_USERS: (AuthUser & { password: string })[] = [
  {
    id: "usr_1",
    name: "Alice Chen",
    email: "alice@library.dev",
    password: "password123",
    role: "admin",
    emailVerified: true,
    createdAt: "2024-01-15T10:00:00Z",
    avatharInitials: "AC",

  },
  {
    id: "usr_2",
    name: "Bob Martinez",
    email: "bob@library.dev",
    password: "password123",
    role: "user",
    emailVerified: true,
    createdAt: "2024-03-20T14:30:00Z",
    avatharInitials: "BM",
  },
];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const clearError = useCallback(() => setError(null), []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    await delay(800);

    const found = MOCK_USERS.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password,
    );

    setIsLoading(false);

    if (!found) {
      const msg =
        "Invalid email or password. Try alice@library.dev / password123";
      setError(msg);
      return { success: false, error: msg };
    }

    const { password: _, ...authUser } = found;
    setUser(authUser);
    
    return { success: true,authUser };
  }, []);

  const signup = useCallback(async (credentials: SignupCredentials) => {
    setIsLoading(true);
    setError(null);
    await delay(1000);

    const exists = MOCK_USERS.find((u) => u.email === credentials.email);

    setIsLoading(false);

    if (exists) {
      const msg = "An account with this email already exists.";
      setError(msg);
      return { success: false, error: msg };
    }

    const newUser: AuthUser = {
      id: `usr_${Date.now()}`,
      name: credentials.name,
      email: credentials.email,
      role: "user",
      emailVerified: false,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    // Store mock user in localStorage for persistence
    localStorage.setItem("mock_user", JSON.stringify(newUser));
    return { success: true };
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    await delay(300);
    setUser(null);
    setIsLoading(false);
    // Clear mock user from localStorage on logout
    localStorage.removeItem("mock_user");
    router.push("/");

  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    await delay(900);
    setIsLoading(false);
    // Always succeed (don't leak whether email exists)
    return { success: true };
  }, []);

  const resetPassword = useCallback(
    async (_token: string, _password: string) => {
      setIsLoading(true);
      await delay(800);
      setIsLoading(false);
      // TODO: call resetPassword service
      return { success: true };
    },
    [],
  );

  const verifyEmail = useCallback(
    async (_token: string) => {
      setIsLoading(true);
      await delay(600);
      if (user)
        setUser((prev) => (prev ? { ...prev, emailVerified: true } : null));
      setIsLoading(false);
      // TODO: call verifyEmail service
      return { success: true };
    },
    [user],
  );

  const resendVerification = useCallback(async (_email: string) => {
    setIsLoading(true);
    await delay(700);
    setIsLoading(false);
    // TODO: call resendVerification service
    return { success: true };
  }, []);

  console.log("AuthProvider render", { user, isLoading, error });

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        signup,
        logout,
        forgotPassword,
        resetPassword,
        verifyEmail,
        resendVerification,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
