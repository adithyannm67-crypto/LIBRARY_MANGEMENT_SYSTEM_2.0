import React, { useState } from 'react';
import clsx from 'clsx';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import styles from './Table.module.css';
import Skeleton from './Skeleton';
import Checkbox from './Checkbox';

export interface ColumnDef<T> {
  key: string;
  header: string;
  accessor?: keyof T | ((row: T) => React.ReactNode);
  render?: (row: T) => React.ReactNode;
  width?: number | string;
  sortable?: boolean;
  numeric?: boolean;
  mono?: boolean;
  muted?: boolean;
}

export interface TableProps<T extends { id?: string | number }> {
  columns: ColumnDef<T>[];
  data: T[];
  loading?: boolean;
  skeletonRows?: number;
  selectable?: boolean;
  onRowClick?: (row: T) => void;
  onSelectionChange?: (selected: T[]) => void;
  compact?: boolean;
  emptyLabel?: string;
  emptyDescription?: string;
  footer?: React.ReactNode;
  className?: string;
}

type SortState = { key: string; dir: 'asc' | 'desc' } | null;

export default function Table<T extends { id?: string | number }>({
  columns,
  data,
  loading,
  skeletonRows = 5,
  selectable,
  onRowClick,
  onSelectionChange,
  compact,
  emptyLabel = 'No results',
  emptyDescription = 'No data to display.',
  footer,
  className,
}: TableProps<T>) {
  const [sort, setSort] = useState<SortState>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  function handleSort(key: string) {
    setSort(prev => prev?.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' });
  }

  function handleSelect(idx: number) {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      onSelectionChange?.(data.filter((_, i) => next.has(i)));
      return next;
    });
  }

  function handleSelectAll() {
    if (selected.size === data.length) {
      setSelected(new Set());
      onSelectionChange?.([]);
    } else {
      const all = new Set(data.map((_, i) => i));
      setSelected(all);
      onSelectionChange?.(data);
    }
  }

  const sorted = sort
    ? [...data].sort((a, b) => {
        const col = columns.find(c => c.key === sort.key);
        if (!col?.accessor) return 0;
        const av = typeof col.accessor === 'function' ? col.accessor(a) : a[col.accessor];
        const bv = typeof col.accessor === 'function' ? col.accessor(b) : b[col.accessor];
        const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
        return sort.dir === 'asc' ? cmp : -cmp;
      })
    : data;

  function cellValue(row: T, col: ColumnDef<T>) {
    if (col.render) return col.render(row);
    if (!col.accessor) return null;
    if (typeof col.accessor === 'function') return col.accessor(row) as React.ReactNode;
    return row[col.accessor] as React.ReactNode;
  }

  return (
    <div className={clsx(styles.wrapper, compact && styles.compact, className)}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {selectable && (
              <th className={clsx(styles.th, styles.checkboxCol)}>
                <Checkbox
                  checked={selected.size === data.length && data.length > 0}
                  indeterminate={selected.size > 0 && selected.size < data.length}
                  onChange={handleSelectAll}
                />
              </th>
            )}
            {columns.map(col => (
              <th
                key={col.key}
                className={clsx(styles.th, col.sortable && styles.sortable, sort?.key === col.key && styles.sorted)}
                style={{ width: col.width }}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
              >
                <span className={styles.thContent}>
                  {col.header}
                  {col.sortable && (
                    <span className={styles.sortIcon}>
                      {sort?.key === col.key
                        ? sort.dir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                        : <ChevronsUpDown size={12} />}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {loading
            ? Array.from({ length: skeletonRows }).map((_, i) => (
                <tr key={i} className={clsx(styles.tr, styles.skeletonRow)}>
                  {selectable && <td className={styles.td}><Skeleton width={16} height={16} /></td>}
                  {columns.map(col => (
                    <td key={col.key} className={styles.td}>
                      <Skeleton height={14} style={{ width: `${60 + Math.random() * 30}%` }} />
                    </td>
                  ))}
                </tr>
              ))
            : sorted.length === 0
            ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className={styles.empty}>
                  <div style={{ fontWeight: 500, marginBottom: 4, color: 'var(--foreground)' }}>{emptyLabel}</div>
                  <div style={{ fontSize: 12 }}>{emptyDescription}</div>
                </td>
              </tr>
            )
            : sorted.map((row, i) => (
              <tr
                key={row.id ?? i}
                className={clsx(styles.tr, selected.has(i) && styles.selected)}
                onClick={() => onRowClick?.(row)}
                style={onRowClick ? { cursor: 'pointer' } : undefined}
              >
                {selectable && (
                  <td className={clsx(styles.td, styles.checkboxCol)} onClick={e => { e.stopPropagation(); handleSelect(i); }}>
                    <Checkbox checked={selected.has(i)} onChange={() => handleSelect(i)} />
                  </td>
                )}
                {columns.map(col => (
                  <td
                    key={col.key}
                    className={clsx(
                      styles.td,
                      col.numeric && styles.numeric,
                      col.mono && styles.mono,
                      col.muted && styles.muted,
                    )}
                  >
                    {cellValue(row, col)}
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
      {footer && (
        <div className={styles.footer}>{footer}</div>
      )}
    </div>
  );
}
