import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import styles from './Dropdown.module.css';

export type DropdownAlign = 'start' | 'end' | 'center';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  destructive?: boolean;
  disabled?: boolean;
  checked?: boolean;
  onClick?: () => void;
}

export interface DropdownGroup {
  label?: string;
  items: DropdownItem[];
}

export interface DropdownProps {
  trigger: React.ReactNode;
  groups?: DropdownGroup[];
  items?: DropdownItem[];
  align?: DropdownAlign;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function Dropdown({
  trigger,
  groups,
  items,
  align = 'start',
  className,
  open: controlled,
  onOpenChange,
}: DropdownProps) {
  const [uncontrolled, setUncontrolled] = useState(false);
  const open = controlled ?? uncontrolled;
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  function toggle() {
    const next = !open;
    setUncontrolled(next);
    onOpenChange?.(next);
  }

  function close() {
    setUncontrolled(false);
    onOpenChange?.(false);
  }

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => { if (!rootRef.current?.contains(e.target as Node)) close(); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', onKey);
    menuRef.current?.focus();
    return () => { document.removeEventListener('mousedown', handler); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const allGroups = groups ?? (items ? [{ items }] : []);

  return (
    <div ref={rootRef} className={clsx(styles.root, className)}>
      <div onClick={toggle} style={{ display: 'contents' }}>{trigger}</div>
      {open && (
        <div
          ref={menuRef}
          className={clsx(styles.menu, align !== 'start' && styles[`align-${align}`])}
          role="menu"
          tabIndex={-1}
        >
          {allGroups.map((group, gi) => (
            <React.Fragment key={gi}>
              {gi > 0 && <div className={styles.separator} />}
              {group.label && <div className={styles.groupLabel}>{group.label}</div>}
              {group.items.map(item => (
                <button
                  key={item.id}
                  role="menuitem"
                  className={clsx(
                    styles.item,
                    item.destructive && styles.destructive,
                    item.disabled && styles.disabled,
                    item.checked && styles.active,
                  )}
                  onClick={() => { item.onClick?.(); close(); }}
                  disabled={item.disabled}
                >
                  {item.checked != null && (
                    <span className={styles.checkmark}>{item.checked && <Check size={13} />}</span>
                  )}
                  {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
                  <span className={styles.itemLabel}>{item.label}</span>
                  {item.shortcut && <kbd className={styles.itemShortcut}>{item.shortcut}</kbd>}
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
