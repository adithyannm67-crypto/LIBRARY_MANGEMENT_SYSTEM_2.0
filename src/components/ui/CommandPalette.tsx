import React, { useState, useEffect, useRef, useMemo } from 'react';
import clsx from 'clsx';
import { Search, CornerDownLeft, ArrowUp, ArrowDown } from 'lucide-react';
import styles from './CommandPalette.module.css';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string[];
  onSelect: () => void;
  keywords?: string[];
}

export interface CommandGroup {
  label: string;
  items: CommandItem[];
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  groups: CommandGroup[];
  placeholder?: string;
}

export default function CommandPalette({ open, onClose, groups, placeholder = 'Type a command or search…' }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return groups;
    const q = query.toLowerCase();
    return groups.map(g => ({
      ...g,
      items: g.items.filter(i =>
        i.label.toLowerCase().includes(q) ||
        i.description?.toLowerCase().includes(q) ||
        i.keywords?.some(k => k.toLowerCase().includes(q))
      ),
    })).filter(g => g.items.length > 0);
  }, [query, groups]);

  const allItems = filtered.flatMap(g => g.items);

  useEffect(() => {
    if (open) {
      setQuery('');
      setFocused(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setFocused(f => Math.min(f + 1, allItems.length - 1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setFocused(f => Math.max(f - 1, 0)); }
      if (e.key === 'Enter' && allItems[focused]) { allItems[focused].onSelect(); onClose(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, focused, allItems, onClose]);

  if (!open) return null;

  let globalIdx = 0;

  return (
    <div className={styles.overlay} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={dialogRef} className={styles.dialog} role="dialog" aria-label="Command palette">
        <div className={styles.search}>
          <Search size={16} className={styles.searchIcon} />
          <input
            ref={inputRef}
            className={styles.input}
            placeholder={placeholder}
            value={query}
            onChange={e => { setQuery(e.target.value); setFocused(0); }}
            autoComplete="off"
            spellCheck={false}
          />
          <span className={styles.escBadge}>ESC</span>
        </div>
        <div className={styles.results} role="listbox">
          {filtered.length === 0
            ? <div className={styles.empty}>No results for "{query}"</div>
            : filtered.map(group => (
              <div key={group.label} className={styles.group}>
                <div className={styles.groupLabel}>{group.label}</div>
                {group.items.map(item => {
                  const idx = globalIdx++;
                  return (
                    <button
                      key={item.id}
                      role="option"
                      aria-selected={idx === focused}
                      className={clsx(styles.item, idx === focused && styles.focused)}
                      onClick={() => { item.onSelect(); onClose(); }}
                      onMouseEnter={() => setFocused(idx)}
                    >
                      {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
                      <span className={styles.itemContent}>
                        <span className={styles.itemLabel}>{item.label}</span>
                        {item.description && <span className={styles.itemDescription}>{item.description}</span>}
                      </span>
                      {item.shortcut && (
                        <span className={styles.itemShortcut}>
                          {item.shortcut.map(k => <kbd key={k} className={styles.kbd}>{k}</kbd>)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          }
        </div>
        <div className={styles.footer}>
          <span className={styles.footerHint}><ArrowUp size={11} /><ArrowDown size={11} /> Navigate</span>
          <span className={styles.footerHint}><CornerDownLeft size={11} /> Select</span>
        </div>
      </div>
    </div>
  );
}
