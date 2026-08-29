import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { X, Check } from 'lucide-react';
import styles from './FilterDrawer.module.css';
import Button from './Button';

export interface FilterOption { id: string; label: string; count?: number; }
export interface FilterSection {
  id: string;
  title: string;
  type: 'checkbox' | 'radio';
  options: FilterOption[];
}

export interface FilterValues { [sectionId: string]: string | string[]; }

export interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  sections: FilterSection[];
  values: FilterValues;
  onChange: (values: FilterValues) => void;
  onApply?: () => void;
  onReset?: () => void;
  title?: string;
}

export default function FilterDrawer({
  open,
  onClose,
  sections,
  values,
  onChange,
  onApply,
  onReset,
  title = 'Filters',
}: FilterDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    drawerRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  function toggleCheckbox(sectionId: string, optId: string) {
    const current = (values[sectionId] as string[] | undefined) ?? [];
    const next = current.includes(optId) ? current.filter(v => v !== optId) : [...current, optId];
    onChange({ ...values, [sectionId]: next });
  }

  function selectRadio(sectionId: string, optId: string) {
    onChange({ ...values, [sectionId]: optId });
  }

  const activeCount = Object.values(values).reduce((n, v) => n + (Array.isArray(v) ? v.length : v ? 1 : 0), 0);

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div ref={drawerRef} className={styles.drawer} role="dialog" aria-label={title} tabIndex={-1}>
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close filters"><X size={15} /></button>
        </div>
        <div className={styles.body}>
          {sections.map(section => (
            <div key={section.id} className={styles.section}>
              <div className={styles.sectionTitle}>{section.title}</div>
              {section.type === 'checkbox' ? (
                <div className={styles.checkList}>
                  {section.options.map(opt => {
                    const checked = ((values[section.id] as string[]) ?? []).includes(opt.id);
                    return (
                      <label key={opt.id} className={styles.checkItem}>
                        <span className={clsx(styles.checkIcon, checked && styles.checked)}>
                          {checked && <Check size={10} color="#fff" strokeWidth={2.5} />}
                        </span>
                        {opt.label}
                        {opt.count != null && (
                          <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--muted-foreground)' }}>{opt.count}</span>
                        )}
                        <input type="checkbox" checked={checked} onChange={() => toggleCheckbox(section.id, opt.id)} style={{ display: 'none' }} />
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div className={styles.radioList}>
                  {section.options.map(opt => {
                    const selected = values[section.id] === opt.id;
                    return (
                      <label key={opt.id} className={styles.radioItem} onClick={() => selectRadio(section.id, opt.id)}>
                        <span className={clsx(styles.radioCircle, selected && styles.selected)} />
                        {opt.label}
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.footer}>
          <Button variant="outline" size="sm" onClick={onReset} fullWidth>Reset{activeCount > 0 ? ` (${activeCount})` : ''}</Button>
          <Button variant="primary" size="sm" onClick={() => { onApply?.(); onClose(); }} fullWidth>Apply filters</Button>
        </div>
      </div>
    </>
  );
}
