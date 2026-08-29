import React from 'react';
import clsx from 'clsx';
import styles from './LoadingState.module.css';

export interface LoadingStateProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots';
  fullPage?: boolean;
  overlay?: boolean;
  inline?: boolean;
  className?: string;
}

export default function LoadingState({
  label,
  size = 'md',
  variant = 'spinner',
  fullPage,
  overlay,
  inline,
  className,
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-label={label ?? 'Loading'}
      className={clsx(
        styles.root,
        styles[size],
        fullPage && styles.fullPage,
        overlay && styles.overlay,
        inline && styles.inline,
        className,
      )}
    >
      {variant === 'dots'
        ? <div className={styles.dots}>{[0,1,2].map(i => <div key={i} className={styles.dot} />)}</div>
        : <div className={styles.spinner} aria-hidden="true" />
      }
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
