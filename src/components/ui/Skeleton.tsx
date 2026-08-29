import React from 'react';
import clsx from 'clsx';
import styles from './Skeleton.module.css';

export type SkeletonVariant = 'text' | 'heading' | 'block' | 'circle' | 'card' | 'avatar' | 'button' | 'input';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}

export default function Skeleton({ variant = 'block', width, height, size, className, style }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading…"
      className={clsx(styles.root, styles[variant], size && styles[size], className)}
      style={{ width, height, ...style }}
    />
  );
}

export function SkeletonRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx(styles.row, className)}>{children}</div>;
}

export function SkeletonStack({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx(styles.stack, className)}>{children}</div>;
}
