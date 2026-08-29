import React from 'react';
import clsx from 'clsx';
import styles from './EmptyState.module.css';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  compact?: boolean;
  className?: string;
}

export default function EmptyState({ icon, title, description, actions, compact, className }: EmptyStateProps) {
  return (
    <div className={clsx(styles.root, compact && styles.compact, className)}>
      {icon && <div className={styles.iconWrap}>{icon}</div>}
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
