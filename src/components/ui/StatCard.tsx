import React from 'react';
import clsx from 'clsx';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import styles from './StatCard.module.css';

export type StatCardColor = 'accent' | 'success' | 'warning' | 'destructive' | 'muted';

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  iconColor?: StatCardColor;
  trend?: number;
  trendLabel?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
  max?: number;
}

export default function StatCard({
  label,
  value,
  icon,
  iconColor = 'accent',
  trend,
  trendLabel,
  size = 'md',
  className,
  children,
}: StatCardProps) {
  const trendDir = trend == null ? null : trend > 0 ? 'up' : trend < 0 ? 'down' : 'neutral';

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {icon && <span className={clsx(styles.iconWrap, styles[iconColor])}>{icon}</span>}
      </div>
      <div className={clsx(styles.value, size !== 'md' && styles[size])}>{value}</div>
      {(trend != null || children) && (
        <div className={styles.footer}>
          {trend != null && (
            <span className={clsx(styles.trend, trendDir && styles[trendDir])}>
              {trendDir === 'up' && <TrendingUp size={12} />}
              {trendDir === 'down' && <TrendingDown size={12} />}
              {trendDir === 'neutral' && <Minus size={12} />}
              {trend > 0 ? '+' : ''}{trend}%
            </span>
          )}
          {trendLabel && <span className={styles.comparison}>{trendLabel}</span>}
          {children}
        </div>
      )}
    </div>
  );
}
