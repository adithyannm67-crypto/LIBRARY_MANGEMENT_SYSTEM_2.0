import React, { useRef } from 'react';
import clsx from 'clsx';
import { Search, X } from 'lucide-react';
import styles from './SearchBar.module.css';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: 'md' | 'lg';
  shortcut?: string;
  onEnter?: () => void;
  className?: string;
  autoFocus?: boolean;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search…',
  size = 'md',
  shortcut,
  onEnter,
  className,
  autoFocus,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={clsx(styles.root, size === 'lg' && styles.lg, className)}>
      <span className={styles.searchIcon}><Search size={14} /></span>
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
        autoFocus={autoFocus}
        onKeyDown={e => { if (e.key === 'Enter') onEnter?.(); }}
        aria-label={placeholder}
      />
      {value
        ? (
          <button className={styles.clearBtn} onClick={() => { onChange(''); inputRef.current?.focus(); }} aria-label="Clear search">
            <X size={10} />
          </button>
        )
        : shortcut && (
          <div className={styles.shortcut}>
            <span className={styles.kbd}>{shortcut}</span>
          </div>
        )
      }
    </div>
  );
}
