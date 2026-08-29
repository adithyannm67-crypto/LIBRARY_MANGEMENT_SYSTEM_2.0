import React from 'react';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import styles from './Pagination.module.css';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  total?: number;
  pageSize?: number;
  showInfo?: boolean;
  showFirstLast?: boolean;
  siblings?: number;
  className?: string;
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  total,
  pageSize,
  showInfo = true,
  showFirstLast = false,
  siblings = 1,
  className,
}: PaginationProps) {
  function pages(): (number | 'ellipsis')[] {
    if (totalPages <= 7) return range(1, totalPages);
    const left = Math.max(2, page - siblings);
    const right = Math.min(totalPages - 1, page + siblings);
    const result: (number | 'ellipsis')[] = [1];
    if (left > 2) result.push('ellipsis');
    result.push(...range(left, right));
    if (right < totalPages - 1) result.push('ellipsis');
    result.push(totalPages);
    return result;
  }

  const start = pageSize ? (page - 1) * pageSize + 1 : null;
  const end = pageSize && total ? Math.min(page * pageSize, total) : null;

  return (
    <div className={clsx(styles.wrapper, className)}>
      {showInfo && total != null && (
        <span className={styles.info}>
          {start && end ? `${start}–${end} of ${total}` : `${total} results`}
        </span>
      )}
      <div className={styles.root}>
        {showFirstLast && (
          <button className={clsx(styles.btn, styles.nav)} disabled={page === 1} onClick={() => onPageChange(1)} aria-label="First page">
            <ChevronsLeft size={14} />
          </button>
        )}
        <button className={clsx(styles.btn, styles.nav)} disabled={page === 1} onClick={() => onPageChange(page - 1)} aria-label="Previous page">
          <ChevronLeft size={14} />
        </button>
        {pages().map((p, i) =>
          p === 'ellipsis'
            ? <span key={`e${i}`} className={styles.ellipsis}>…</span>
            : (
              <button
                key={p}
                className={clsx(styles.btn, p === page && styles.active)}
                onClick={() => onPageChange(p)}
                aria-label={`Page ${p}`}
                aria-current={p === page ? 'page' : undefined}
              >
                {p}
              </button>
            )
        )}
        <button className={clsx(styles.btn, styles.nav)} disabled={page === totalPages} onClick={() => onPageChange(page + 1)} aria-label="Next page">
          <ChevronRight size={14} />
        </button>
        {showFirstLast && (
          <button className={clsx(styles.btn, styles.nav)} disabled={page === totalPages} onClick={() => onPageChange(totalPages)} aria-label="Last page">
            <ChevronsRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
