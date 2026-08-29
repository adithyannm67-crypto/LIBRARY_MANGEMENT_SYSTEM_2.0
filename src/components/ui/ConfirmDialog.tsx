import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { AlertTriangle, Info, Trash2, HelpCircle } from 'lucide-react';
import styles from './ConfirmDialog.module.css';
import Button from './Button';

export type ConfirmDialogVariant = 'default' | 'danger' | 'warning' | 'info';

export interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmDialogVariant;
  loading?: boolean;
}

const variantIcons: Record<ConfirmDialogVariant, React.ReactNode> = {
  default: <HelpCircle size={20} />,
  danger:  <Trash2 size={20} />,
  warning: <AlertTriangle size={20} />,
  info:    <Info size={20} />,
};

export default function ConfirmDialog({
  open,
  onConfirm,
  onCancel,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  loading,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', onKey);
    dialogRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className={styles.overlay} role="presentation" onClick={e => { if (e.target === e.currentTarget) onCancel(); }}>
      <div ref={dialogRef} role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" tabIndex={-1} className={styles.dialog}>
        <div className={clsx(styles.iconWrap, styles[variant])}>
          {variantIcons[variant]}
        </div>
        <h3 id="confirm-title" className={styles.title}>{title}</h3>
        {message && <p className={styles.message}>{message}</p>}
        <div className={styles.actions}>
          <Button variant="outline" size="sm" onClick={onCancel} disabled={loading}>{cancelLabel}</Button>
          <Button
            variant={variant === 'danger' ? 'destructive' : 'primary'}
            size="sm"
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
