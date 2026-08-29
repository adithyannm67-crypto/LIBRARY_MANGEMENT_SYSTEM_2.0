"use client";

import React, { useState } from 'react';
import { ArrowLeft, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import AuthLayout from '../AuthLayout';
import { useAuth } from '@/context/AuthContext';
import { validateForgotPasswordForm } from '@/utils/authValidation';
import { maskEmail } from '@/utils/authUtils';
import styles from '../AuthForm.module.css';

export type ForgotPasswordRoute = 'login' | 'reset-password';

interface ForgotPasswordPageProps {
  onNavigate: (route: ForgotPasswordRoute) => void;
}

/* loading.tsx equivalent */
export function ForgotPasswordLoading() {
  return <AuthLayout isLoading><div style={{ height: 260 }} /></AuthLayout>;
}

export default function ForgotPasswordPage({ onNavigate }: ForgotPasswordPageProps) {
  throw new Error("ForgotPasswordPage is not implemented yet. Please implement it.");
  const { forgotPassword, isLoading, error, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    clearError();

    const result = validateForgotPasswordForm({ email });
    if (!result.valid) {
      setFieldErrors(result.errors);
      return;
    }
    setFieldErrors({});

    const res = await forgotPassword(email);
    if (res.success) setSent(true);
  }

  if (sent) {
    return (
      <AuthLayout>
        <div className={styles.successState}>
          <div className={styles.successIcon}>
            <Mail size={24} />
          </div>
          <h2 className={styles.successTitle}>Check your email</h2>
          <p className={styles.successSub}>
            We sent a password reset link to{' '}
            <strong>{maskEmail(email)}</strong>. The link expires in 30 minutes.
          </p>
          <Button
            variant="primary"
            fullWidth
            onClick={() => onNavigate('reset-password')}
          >
            Open reset form
          </Button>
          <p className={styles.hint}>
            Didn't receive it?{' '}
            <button
              type="button"
              className={styles.hintLink}
              onClick={() => { setSent(false); }}
            >
              Try again
            </button>
            {' '}or check your spam folder.
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout isLoading={isLoading} error={error}>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => onNavigate('login')}>
          <ArrowLeft size={13} /> Back to sign in
        </button>
        <h1 className={styles.title}>Reset your password</h1>
        <p className={styles.subtitle}>
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          label="Email address"
          type="email"
          placeholder="you@library.dev"
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={fieldErrors.email}
          autoComplete="email"
          required
        />

        <Button type="submit" variant="primary" fullWidth className={styles.submitBtn} loading={isLoading}>
          Send reset link
        </Button>
      </form>

      <div className={styles.footer}>
        Remember your password?{' '}
        <button type="button" className={styles.footerLink} onClick={() => onNavigate('login')}>
          Sign in
        </button>
      </div>
    </AuthLayout>
  );
}
