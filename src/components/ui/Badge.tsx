import React from 'react';
import clsx from 'clsx';
import styles from './Badge.module.css';

export type BadgeVariant = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'destructive' | 'outline';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  dotPulse?: boolean;
  pill?: boolean;
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot,
  dotPulse,
  pill = true,
  className,
}: BadgeProps) {
  return (
    <span className={clsx(
      styles.root,
      styles[variant],
      styles[size],
      !pill && styles.square,
      className,
    )}>
      {dotPulse && <span className={styles.dotPulse} aria-hidden="true" />}
      {!dotPulse && dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  );
}
