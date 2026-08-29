"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { useAuth } from "@/context/AuthContext";
import { validateSignupForm } from "@/utils/authValidation";
import { getPasswordStrength } from "@/utils/authUtils";
import styles from "../AuthForm.module.css";
import EyeOnOffTrailingIcon from "@/components/features/eye-on-off-trailingIcon";

export default function SignupPage() {
  const router = useRouter();
  const { signup, isLoading, error, clearError } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [signedUp, setSignedUp] = useState(false);

  // Navigate after a successful signup. The navigation runs in an effect (after
  // the async signup action has fully settled) rather than inside the async
  // event handler — this avoids React 19.2's "cleaning up async info that was
  // not on the parent Suspense boundary" internal error.
  useEffect(() => {
    if (signedUp) {
      router.push("/verify-email");
    }
  }, [signedUp, router]);

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
      setSignedUp(true);
    }
  }

  const backToHome = () => {
    router.push("/");
  };

  return (
    <div className="flex overflow-y-auto flex-col gap-3">
      <div className="mb-4.5">
        <button
          className="inline-flex cursor-pointer transition items-center gap-1.25 text-xs font-medium text-muted-foreground border border-none p-0 mb-5 hover:text-foreground"
          onClick={backToHome}
        >
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
              <EyeOnOffTrailingIcon
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
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
          onClick={() => router.push("/sign-in")}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
