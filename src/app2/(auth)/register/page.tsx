"use client";

import React, { useState } from "react";
import {useRouter} from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { useAuth } from "@/context/AuthContext";
import { validateSignupForm } from "@/utils/authValidation";
import { getPasswordStrength } from "@/utils/authUtils";
import styles from "../AuthForm.module.css";




export default function SignupPage() {
  const router = useRouter();
  const { signup, isLoading, error, clearError } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const strength = password ? getPasswordStrength(password) : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    clearError();

    const result = validateSignupForm({
      name,
      email,
      password,
      confirmPassword,
    });
    if (!result.valid) {
      setFieldErrors(result.errors);
      return;
    }
    setFieldErrors({});

    const res = await signup({ name, email, password, confirmPassword });
    if (res.success) {
      router.push("/verify-email");
    }
  }

  return (
    <>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => router.push("/")}>
          <ArrowLeft size={13} /> Back to home
        </button>
        <h1 className={styles.title}>Create your account</h1>
        <p className={styles.subtitle}>
          Get started with LibraryOS — free for up to 500 books.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          label="Full name"
          type="text"
          placeholder="Alice Chen"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={fieldErrors.name}
          autoComplete="name"
          required
        />

        <Input
          label="Work email"
          type="email"
          placeholder="you@institution.edu"
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
            placeholder="Min. 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
            autoComplete="new-password"
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

          {/* Password strength meter */}
          {strength && (
            <div className={styles.strengthMeter}>
              <div className={styles.strengthBars}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={styles.strengthBar}
                    style={{
                      background:
                        i < strength.score ? strength.color : "var(--border)",
                    }}
                  />
                ))}
              </div>
              <div
                className={styles.strengthLabel}
                style={{ color: strength.color }}
              >
                {strength.label}
              </div>
            </div>
          )}
        </div>

        <Input
          label="Confirm password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={fieldErrors.confirmPassword}
          autoComplete="new-password"
          required
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          className={styles.submitBtn}
          loading={isLoading}
        >
          Create account
        </Button>
      </form>

      <p className={styles.terms}>
        By creating an account you agree to our{" "}
        <button type="button" className={styles.termsLink}>
          Terms of Service
        </button>{" "}
        and{" "}
        <button type="button" className={styles.termsLink}>
          Privacy Policy
        </button>
        .
      </p>

      <div className={styles.footer}>
        Already have an account?{" "}
        <button
          type="button"
          className={styles.footerLink}
          onClick={() => router.push("/login")}
        >
          Sign in
        </button>
      </div>
    </>
  );
}
