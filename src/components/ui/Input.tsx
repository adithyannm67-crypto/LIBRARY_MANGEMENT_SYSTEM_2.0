import React from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  required?: boolean;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  hint,
  error,
  size = 'md',
  variant,
  leadingIcon,
  trailingIcon,
  required,
  fullWidth,
  className,
  id,
  ...props
}, ref) => {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  const resolvedVariant = error ? 'error' : variant;

  return (
    <div className={clsx(
      styles.wrapper,
      resolvedVariant && styles[resolvedVariant],
      size !== 'md' && styles[size],
      leadingIcon && styles.hasLeading,
      trailingIcon && styles.hasTrailing,
      fullWidth && { width: '100%' },
    )}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-hidden="true">*</span>}
        </label>
      )}
      <div className={styles.inputRow}>
        {leadingIcon && <span className={styles.leadingIcon}>{leadingIcon}</span>}
        <input
          ref={ref}
          id={inputId}
          className={clsx(styles.input, className)}
          aria-invalid={!!error}
          aria-describedby={hint || error ? `${inputId}-helper` : undefined}
          {...props}
        />
        {trailingIcon && <span className={styles.trailingIcon}>{trailingIcon}</span>}
      </div>
      {(hint || error) && (
        <div id={`${inputId}-helper`} className={styles.footer}>
          <span className={error ? styles.errorMsg : styles.hint}>{error ?? hint}</span>
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
