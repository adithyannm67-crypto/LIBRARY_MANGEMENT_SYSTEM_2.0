"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import EyeOnOffTrailingIcon from "@/components/features/eye-on-off-trailingIcon";
import { useAuth } from "@/context/AuthContext";
import { validateLoginForm } from "@/utils/authValidation";
import styles from "../AuthForm.module.css";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Navigate after a successful login. The navigation runs in an effect (after
  // the async login action has fully settled) rather than inside the async
  // event handler — this avoids React 19.2's "cleaning up async info that was
  // not on the parent Suspense boundary" internal error.
  useEffect(() => {
    if (user) {
      router.push(`${user.role}/dashboard`);
    }
  }, [user, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    clearError();

    const result = validateLoginForm({ email, password });
    if (!result.valid) {
      setFieldErrors(result.errors);
      return;
    }
    setFieldErrors({});

    await login({ email, password, rememberMe });
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
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>
          Sign in to your LibraryOS account to continue.
        </p>
      </div>

      {/* Demo hint */}
      
      

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {[
        { e: "alice@library.dev", p: "password123" },
        { e: "bob@library.dev", p: "password123" },
      ].map((cred, index) => (
        <DemoHint
          key={index}
          setEmail={setEmail}
          setPassword={setPassword}
          
          email={cred.e}
          password={cred.p}
        />
      ))}
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
            <EyeOnOffTrailingIcon
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
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
        <FcGoogle size={20} className="mr-0.5" />
        Continue with Google
      </button>

      <div className={styles.footer}>
        Don't have an account?{" "}
        <button
          type="button"
          className={styles.footerLink}
          onClick={() => router.push("/sign-up")}
        >
          Sign up free
        </button>
      </div>
    </div>
  );
}

const DemoHint = ({
  setEmail,
  setPassword,
  email,
  password,
  
}: {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  
  email: string;
  password: string;
}) => {
  return (
    <button
      onClick={() => {
        setEmail(email);
        setPassword(password);
      
      }}
      style={{
        padding: "10px 14px",
        borderRadius: 8,
        background: "color-mix(in srgb, var(--accent) 7%, transparent)",
        border: "1px solid color-mix(in srgb, var(--accent) 20%, transparent)",
        fontSize: 12,
        color: "var(--muted-foreground)",
        marginBottom: 20,
        lineHeight: 1.5,
      }}
    >
      <strong style={{ color: "var(--accent)" }}>Demo credentials: </strong>
      {email} / {password}{" "}
    </button>
  );
};
