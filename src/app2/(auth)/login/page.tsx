"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/context/AuthContext";
import { validateLoginForm } from "@/utils/authValidation";
import styles from "../AuthForm.module.css";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    clearError();

    const result = validateLoginForm({ email, password });
    if (!result.valid) {
      setFieldErrors(result.errors);
      return;
    }
    setFieldErrors({});

    const res = await login({ email, password, rememberMe });
    
    if (res.success) {
      router.push("/dashboard");
    }
  }

  return (
    <>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => router.push("/")}>
          <ArrowLeft size={13} /> Back to home
        </button>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>
          Sign in to your LibraryOS account to continue.
        </p>
      </div>

      {/* Demo hint */}
      <div
        style={{
          padding: "10px 14px",
          borderRadius: 8,
          background: "color-mix(in srgb, var(--accent) 7%, transparent)",
          border:
            "1px solid color-mix(in srgb, var(--accent) 20%, transparent)",
          fontSize: 12,
          color: "var(--muted-foreground)",
          marginBottom: 20,
          lineHeight: 1.5,
        }}
      >
        <strong style={{ color: "var(--accent)" }}>Demo credentials: </strong>
        alice@library.dev / password123
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          label="Email address"
          type="email"
          placeholder="you@library.dev"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldErrors.email}
          autoComplete="email"
          required
        />

        <div>
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
            autoComplete="current-password"
            required
            trailingIcon={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--muted-foreground)",
                  display: "flex",
                  padding: 0,
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            }
          />
          <div className={styles.forgotLink}>
            <button
              type="button"
              className={styles.footerLink}
              onClick={() => router.push("/forgot-password")}
            >
              Forgot password?
            </button>
          </div>
        </div>

        <label className={styles.checkRow}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            style={{ accentColor: "var(--accent)", width: 14, height: 14 }}
          />
          Remember me for 30 days
        </label>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          className={styles.submitBtn}
          loading={isLoading}
        >
          Sign in
        </Button>
      </form>

      <div className={styles.divider}>or continue with</div>

      <button className={styles.socialBtn} type="button">
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
          />
          <path
            fill="#34A853"
            d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"
          />
          <path
            fill="#EA4335"
            d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
          />
        </svg>
        Continue with Google
      </button>

      <div className={styles.footer}>
        Don't have an account?{" "}
        <button
          type="button"
          className={styles.footerLink}
          onClick={() => router.push("/register")}
        >
          Sign up free
        </button>
      </div>
    </>
  );
}
