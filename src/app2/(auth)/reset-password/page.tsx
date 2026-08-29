"use client";

import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import AuthLayout from "../AuthLayout";
import { useAuth } from "@/context/AuthContext";
import { validateResetPasswordForm } from "@/utils/authValidation";
import { getPasswordStrength } from "@/utils/authUtils";
import styles from "../AuthForm.module.css";

export type ResetPasswordRoute = "login" | "forgot-password";

interface ResetPasswordPageProps {
  onNavigate: (route: ResetPasswordRoute) => void;
  token?: string;
}

/* loading.tsx equivalent */
export function ResetPasswordLoading() {
  return (
    <AuthLayout isLoading>
      <div style={{ height: 300 }} />
    </AuthLayout>
  );
}

/* error.tsx equivalent — invalid/expired token */
export function ResetPasswordError({ onBack }: { onBack: () => void }) {
  return (
    <AuthLayout error="This reset link has expired or is invalid.">
      <div className={styles.successState}>
        <h2 className={styles.successTitle}>Link expired</h2>
        <p className={styles.successSub}>
          Password reset links expire after 30 minutes for security. Request a
          new one to continue.
        </p>
        <Button variant="primary" fullWidth onClick={onBack}>
          Request new link
        </Button>
      </div>
    </AuthLayout>
  );
}

export default function ResetPasswordPage({
  onNavigate,
  token = "mock-token",
}: ResetPasswordPageProps) {
//   throw new Error("ResetPasswordPage is not implemented yet. Please implement it.");

  const { resetPassword, isLoading, error, clearError } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const strength = password ? getPasswordStrength(password) : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    clearError();

    const result = validateResetPasswordForm({ password, confirmPassword });
    if (!result.valid) {
      setFieldErrors(result.errors);
      return;
    }
    setFieldErrors({});

    const res = await resetPassword(token, password);
    if (res.success) setDone(true);
  }

  if (done) {
    return (
      <>
        <div className={styles.successState}>
          <div className={styles.successIcon}>
            <CheckCircle size={24} />
          </div>
          <h2 className={styles.successTitle}>Password updated</h2>
          <p className={styles.successSub}>
            Your password has been reset successfully. Sign in with your new
            credentials.
          </p>
          <Button
            variant="primary"
            fullWidth
            onClick={() => onNavigate("login")}
          >
            Sign in
          </Button>
        </div>
      </>
    );
  }

  return (
    <AuthLayout isLoading={isLoading} error={error}>
      <div className={styles.header}>
        <button
          className={styles.back}
          onClick={() => onNavigate("forgot-password")}
        >
          <ArrowLeft size={13} /> Back
        </button>
        <h1 className={styles.title}>Set new password</h1>
        <p className={styles.subtitle}>
          Your new password must be at least 8 characters.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div>
          <Input
            label="New password"
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
          label="Confirm new password"
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
          Reset password
        </Button>
      </form>
    </AuthLayout>
  );
}
