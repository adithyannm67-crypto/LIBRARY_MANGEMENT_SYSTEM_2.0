import React from 'react';
import clsx from 'clsx';
import { AlertTriangle, RefreshCw, XCircle } from 'lucide-react';
import styles from './ErrorComponent.module.css';
import Button from './Button';

export interface ErrorComponentProps {
  title?: string;
  message?: string;
  detail?: string;
  onRetry?: () => void;
  variant?: 'full' | 'inline' | 'warning';
  className?: string;
}

export default function ErrorComponent({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  detail,
  onRetry,
  variant = 'full',
  className,
}: ErrorComponentProps) {
  if (variant === 'inline') {
    return (
      <div className={clsx(styles.root, styles.inline, className)}>
        <div className={clsx(styles.iconWrap)}><XCircle size={16} /></div>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          {message && <div className={styles.message}>{message}</div>}
        </div>
        {onRetry && <Button variant="outline" size="sm" onClick={onRetry} leadingIcon={<RefreshCw size={12} />}>Retry</Button>}
      </div>
    );
  }

  return (
    <div className={clsx(styles.root, className)}>
      <div className={clsx(styles.iconWrap, variant === 'warning' && styles.warning)}>
        {variant === 'warning' ? <AlertTriangle size={22} /> : <XCircle size={22} />}
      </div>
      <h3 className={styles.title}>{title}</h3>
      {message && <p className={styles.message}>{message}</p>}
      {detail && <pre className={styles.detail}>{detail}</pre>}
      {onRetry && (
        <div className={styles.actions}>
          <Button variant="primary" size="sm" onClick={onRetry} leadingIcon={<RefreshCw size={13} />}>Try again</Button>
        </div>
      )}
    </div>
  );
}
