import React from 'react';
import { BookOpen, Users, BarChart2, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import styles from './AuthLayout.module.css';
import LoadingState from '../../components/ui/LoadingState';
import { AuthProvider } from '@/context/AuthContext';

interface AuthLayoutProps {
  children: React.ReactNode;
  isLoading?: boolean;
  error?: string | null;
  success?: string | null;
}

const brandFeatures = [
  { icon: <BookOpen size={14} />, text: 'Manage 1,000s of titles with smart search' },
  { icon: <Users size={14} />,    text: 'Member tracking and loan management' },
  { icon: <BarChart2 size={14} />, text: 'Real-time analytics and overdue alerts' },
  { icon: <Shield size={14} />,   text: 'Role-based access for your whole team' },
];

export default function AuthLayout({ children, isLoading, error, success }: AuthLayoutProps) {
  return (
    <div className={styles.root}>
      {/* Brand panel */}
      <div className={styles.brand}>
        <div className={styles.brandPattern} />
        <div className={styles.brandGrid} />

        <div className={styles.brandLogo}>
          <div className={styles.brandLogoMark}>L</div>
          <span className={styles.brandLogoText}>LibraryOS</span>
        </div>

        <div className={styles.brandContent}>
          <h1 className={styles.brandHeadline}>
            The modern platform for <span className={styles.brandAccent}>every library</span>
          </h1>
          <p className={styles.brandSub}>
            From small community branches to large university systems — LibraryOS handles it all.
          </p>

          <div className={styles.brandFeatures}>
            {brandFeatures.map(f => (
              <div key={f.text} className={styles.brandFeature}>
                <div className={styles.brandFeatureIcon}>{f.icon}</div>
                <span className={styles.brandFeatureText}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.brandFooter}>
          © 2026 LibraryOS, Inc. · Trusted by 2,400+ institutions
        </div>
      </div>

      {/* Form panel */}<AuthProvider>
      <main className={styles.form}>
        <div className={styles.formInner}>
          {error && (
            <div className={styles.errorBanner} role="alert">
              <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
              {error}
            </div>
          )}
          {success && (
            <div className={styles.successBanner} role="status">
              <CheckCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
              {success}
            </div>
          )}
          {children}
        </div>

        {isLoading && (
          <div className={styles.loadingOverlay}>
            <LoadingState label="Please wait…" size="md" />
          </div>
        )}
      </main></AuthProvider>
    </div>
  );
}
