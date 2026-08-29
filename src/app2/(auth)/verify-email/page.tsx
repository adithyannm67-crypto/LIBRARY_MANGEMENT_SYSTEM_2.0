"use client";

import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/Button';
import AuthLayout from '../AuthLayout';
import { useAuth } from '@/context/AuthContext';
import { maskEmail } from '@/utils/authUtils';
import styles from '../AuthForm.module.css';

export type VerifyEmailRoute = 'login' | 'dashboard';

interface VerifyEmailPageProps {
  onNavigate: (route: VerifyEmailRoute) => void;
  email?: string;
}

/* loading.tsx equivalent */
export function VerifyEmailLoading() {
  return <AuthLayout isLoading><div style={{ height: 280 }} /></AuthLayout>;
}

export default function VerifyEmailPage({ onNavigate, email = 'user@library.dev' }: VerifyEmailPageProps) {
    throw new Error("VerifyEmailPage is not implemented yet. Please implement it.");
  const { verifyEmail, resendVerification, user, isLoading, clearError } = useAuth();

  const [verified, setVerified] = useState(false);
  const [resent, setResent] = useState(false);
  const [resentCooldown, setResentCooldown] = useState(0);
  const [verifying, setVerifying] = useState(false);

  const displayEmail = user?.email ?? email;

  // Cooldown timer
  useEffect(() => {
    if (resentCooldown <= 0) return;
    const t = setInterval(() => setResentCooldown(n => Math.max(0, n - 1)), 1000);
    return () => clearInterval(t);
  }, [resentCooldown]);

  async function handleVerify() {
    setVerifying(true);
    clearError();
    // Mock: simulate clicking the link in the email
    const res = await verifyEmail('mock-token');
    setVerifying(false);
    if (res.success) setVerified(true);
  }

  async function handleResend() {
    clearError();
    const res = await resendVerification(displayEmail);
    if (res.success) {
      setResent(true);
      setResentCooldown(60);
    }
  }

  if (verified) {
    return (
      <AuthLayout>
        <div className={styles.successState}>
          <div className={styles.successIcon}>
            <CheckCircle size={24} />
          </div>
          <h2 className={styles.successTitle}>Email verified!</h2>
          <p className={styles.successSub}>
            Your email address has been verified. Your account is now fully active.
          </p>
          <Button variant="primary" fullWidth onClick={() => onNavigate('dashboard')}>
            Go to dashboard
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout isLoading={isLoading}>
      <div className={styles.successState}>
        <div className={styles.successIcon} style={{ background: 'color-mix(in srgb, var(--accent) 10%, transparent)', color: 'var(--accent)' }}>
          <Mail size={24} />
        </div>

        <h2 className={styles.successTitle}>Verify your email</h2>

        <p className={styles.successSub}>
          We sent a verification email to
        </p>

        <div className={styles.emailDisplay}>
          <Mail size={13} />
          {maskEmail(displayEmail)}
        </div>

        <p style={{ fontSize: 13, color: 'var(--muted-foreground)', marginBottom: 24, lineHeight: 1.6 }}>
          Click the link in the email to activate your account. The link expires in 24 hours.
        </p>

        {resent && (
          <div style={{
            padding: '10px 14px',
            borderRadius: 8,
            background: 'color-mix(in srgb, var(--success) 8%, transparent)',
            border: '1px solid color-mix(in srgb, var(--success) 20%, transparent)',
            color: 'var(--success)',
            fontSize: 12,
            marginBottom: 20,
          }}>
            Verification email resent successfully.
          </div>
        )}

        {/* Simulate clicking link (mock only) */}
        <Button
          variant="primary"
          fullWidth
          loading={verifying}
          onClick={handleVerify}
          style={{ marginBottom: 12 } as any}
        >
          Simulate email verification ↗
        </Button>

        <Button
          variant="outline"
          fullWidth
          leadingIcon={<RefreshCw size={13} />}
          disabled={resentCooldown > 0}
          onClick={handleResend}
        >
          {resentCooldown > 0 ? `Resend in ${resentCooldown}s` : "Resend verification email"}
        </Button>

        <p className={styles.hint}>
          Wrong address?{' '}
          <button type="button" className={styles.hintLink} onClick={() => onNavigate('login')}>
            Sign in with a different account
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
