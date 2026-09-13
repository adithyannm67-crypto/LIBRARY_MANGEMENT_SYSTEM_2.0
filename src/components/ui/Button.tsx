"use client"

import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import styles from './Button.module.css';
import type { AdminRoute} from '@/constants/admin-sidebar-constants';
import type { UserRoute } from '@/constants/user-sidebar-constants';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'destructive' | 'success';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';



export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  as?: React.ElementType;
  navigateTo?: string|`/user/${UserRoute}?${string}` | `/admin/${AdminRoute}${string}`;
  isBackButton?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  iconOnly = false,
  leadingIcon,
  trailingIcon,
  className,
  disabled,
  as: Tag = 'button',
  navigateTo,
  isBackButton,
  ...props
}, ref) => {
  const router = useRouter();
  return (
    <Tag
      ref={ref}
      disabled={disabled || loading}
      className={clsx(
        styles.root,
        !isBackButton && styles[variant],
        styles[size],
        loading && styles.loading,
        fullWidth && styles.fullWidth,
        iconOnly && styles.iconOnly,
        className,
      )}
      onClick={() => (navigateTo && router.push(navigateTo))||(isBackButton && router.back())}
      
      {...props}
    >
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : leadingIcon ? (
        <span className={styles.icon}>{leadingIcon}</span>
      ) : null}
      {!iconOnly && children}
      {!loading && trailingIcon && (
        <span className={styles.icon}>{trailingIcon}</span>
      )}
    </Tag>
  );
});

Button.displayName = 'Button';
export default Button;
