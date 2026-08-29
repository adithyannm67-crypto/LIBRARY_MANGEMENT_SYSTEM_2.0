import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import { CheckCircle2, XCircle, AlertTriangle, Info, X, Bell } from 'lucide-react';
import styles from './Toast.module.css';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default';

export interface ToastItem {
  id: string;
  type?: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 size={16} />,
  error:   <XCircle size={16} />,
  warning: <AlertTriangle size={16} />,
  info:    <Info size={16} />,
  default: <Bell size={16} />,
};

interface ToastItemProps extends ToastItem {
  onDismiss: (id: string) => void;
}

function ToastItemComponent({ id, type = 'default', title, message, duration = 4000, action, onDismiss }: ToastItemProps) {
  return (
    <div className={clsx(styles.toast, styles[type])}>
      <span className={styles.icon}>{icons[type]}</span>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        {message && <div className={styles.message}>{message}</div>}
        {action && (
          <div className={styles.action}>
            <button
              onClick={() => { action.onClick(); onDismiss(id); }}
              style={{ fontSize: 12, fontWeight: 500, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}
            >
              {action.label}
            </button>
          </div>
        )}
      </div>
      <button className={styles.closeBtn} onClick={() => onDismiss(id)} aria-label="Dismiss">
        <X size={12} />
      </button>
      <div className={styles.progress} style={{ animationDuration: `${duration}ms` }} onAnimationEnd={() => onDismiss(id)} />
    </div>
  );
}

export interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className={styles.container} aria-live="polite" aria-atomic="false">
      {toasts.map(t => (
        <ToastItemComponent key={t.id} {...t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = useCallback((item: Omit<ToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { ...item, id }]);
    return id;
  }, []);

  const success = useCallback((title: string, message?: string) => toast({ type: 'success', title, message }), [toast]);
  const error   = useCallback((title: string, message?: string) => toast({ type: 'error',   title, message }), [toast]);
  const warning = useCallback((title: string, message?: string) => toast({ type: 'warning', title, message }), [toast]);
  const info    = useCallback((title: string, message?: string) => toast({ type: 'info',    title, message }), [toast]);

  return { toasts, dismiss, toast, success, error, warning, info };
}
