import React from "react";

import styles from "./AuthLayout.module.css";
import { AuthProvider } from "@/context/AuthContext";

import { brandFeatures } from "@/constants/authpage-constants";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.root}>
      {/* Brand panel */}
      <aside className={styles.brand}>
        <div className={styles.brandPattern} />
        <div className={styles.brandGrid} />

        <div className={styles.brandLogo}>
          <div className={styles.brandLogoMark}>L</div>
          <span className={styles.brandLogoText}>LibraryOS</span>
        </div>

        <div className={styles.brandContent}>
          <h1 className={styles.brandHeadline}>
            The modern platform for{" "}
            <span className={styles.brandAccent}>every library</span>
          </h1>
          <p className={styles.brandSub}>
            From small community branches to large university systems —
            LibraryOS handles it all.
          </p>

          <div className={styles.brandFeatures}>
            {brandFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.text} className={styles.brandFeature}>
                  <div className={styles.brandFeatureIcon}>
                    <Icon size={14} />
                  </div>
                  <span className={styles.brandFeatureText}>{f.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.brandFooter}>
          © 2026 LibraryOS, Inc. · Trusted by 2,400+ institutions
        </div>
      </aside>

      {/* Form panel */}
      <AuthProvider>
        <main className={styles.form}>{children}</main>
      </AuthProvider>
    </div>
  );
}
