"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client";

export type UserRole = "user" | "admin";

export interface AuthUser {
  id: string;
  memberId: string | null;
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
  ) => Promise<{ success: boolean; error?: string; authUser?: AuthUser }>;
  signup: (credentials: SignupCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (token: string, password: string) => Promise<{ success: boolean; error?: string }>;
  verifyEmail: (token: string) => Promise<{ success: boolean; error?: string }>;
  resendVerification: (email: string) => Promise<{ success: boolean; error?: string }>;
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

/** Get initials from a name: "Alice Chen" → "AC" */
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/** Build an AuthUser from Supabase user metadata */
function buildAuthUser(supabaseUser: {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
  app_metadata?: Record<string, unknown>;
  email_confirmed_at?: string;
  created_at: string;
}): AuthUser {
  const name =
    (supabaseUser.user_metadata?.full_name as string) ||
    (supabaseUser.user_metadata?.name as string) ||
    supabaseUser.email?.split("@")[0] ||
    "User";

  return {
    id: supabaseUser.id,
    memberId: (supabaseUser.app_metadata?.member_id as string) || null,
    name,
    email: supabaseUser.email || "",
    role: "user", // Default, will be updated from members table
    emailVerified: !!supabaseUser.email_confirmed_at,
    createdAt: supabaseUser.created_at,
    avatharInitials: getInitials(name),
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  const clearError = useCallback(() => setError(null), []);

  // On mount, check for existing session
  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        const authUser = buildAuthUser(session.user);

        // Look up member data from the members table
        if (session.user.email) {
          const { data: memberRows } = await supabase
            .from('members')
            .select('member_id, role')
            .eq('email', session.user.email)
            .limit(1)
            .single();

          if (memberRows) {
            authUser.id = memberRows.member_id;
            authUser.memberId = memberRows.member_id;
            authUser.role = memberRows.role as UserRole;
          }
        }

        setUser(authUser);
      }
      setIsLoading(false);
    }
    getSession();

    // Listen for auth state changes (login/logout/token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const authUser = buildAuthUser(session.user);

          // Look up member data from the members table
          if (session.user.email) {
            const { data: memberRows } = await supabase
              .from('members')
              .select('member_id, role')
              .eq('email', session.user.email)
              .limit(1)
              .single();

            if (memberRows) {
              authUser.id = memberRows.member_id;
              authUser.memberId = memberRows.member_id;
              authUser.role = memberRows.role as UserRole;
            }
          }

          setUser(authUser);
        } else {
          setUser(null);
        }
      },
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    setIsLoading(false);

    if (authError) {
      const msg = authError.message.includes("Invalid login credentials")
        ? "Invalid email or password."
        : authError.message;
      setError(msg);
      return { success: false, error: msg };
    }

    if (data.user) {
      // Look up member data from the members table by email
      const { data: memberRows } = await supabase
        .from('members')
        .select('member_id, role')
        .eq('email', data.user.email!)
        .limit(1)
        .single();

      const authUser = buildAuthUser(data.user);

      if (memberRows) {
        authUser.id = memberRows.member_id;
        authUser.memberId = memberRows.member_id;
        authUser.role = memberRows.role as UserRole;
      }

      setUser(authUser);
      return { success: true, authUser };
    }

    return { success: false, error: "Login failed." };
  }, [supabase]);

  const signup = useCallback(async (credentials: SignupCredentials) => {
    setIsLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          full_name: credentials.name,
        },
      },
    });

    setIsLoading(false);

    if (authError) {
      const msg = authError.message.includes("already registered")
        ? "An account with this email already exists."
        : authError.message;
      setError(msg);
      return { success: false, error: msg };
    }

    // Supabase may auto-sign-in if email confirm is disabled.
    // If it did, the onAuthStateChange listener will pick up the user.
    return { success: true };
  }, [supabase]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setIsLoading(false);
    router.push("/");
  }, [supabase, router]);

  const forgotPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setIsLoading(false);

    if (authError) {
      setError(authError.message);
      return { success: false, error: authError.message };
    }

    return { success: true };
  }, [supabase]);

  const resetPassword = useCallback(async (token: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.updateUser({
      password,
    });

    setIsLoading(false);

    if (authError) {
      setError(authError.message);
      return { success: false, error: authError.message };
    }

    return { success: true };
  }, [supabase]);

  const verifyEmail = useCallback(async (_token: string) => {
    setIsLoading(true);
    setIsLoading(false);
    // Supabase handles email verification automatically via the confirmation link.
    // The onAuthStateChange listener will update the user when verified.
    return { success: true };
  }, []);

  const resendVerification = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    setIsLoading(false);

    if (authError) {
      setError(authError.message);
      return { success: false, error: authError.message };
    }

    return { success: true };
  }, [supabase]);

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
