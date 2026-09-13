import React from 'react';
import { AlertCircle, Clock, RotateCcw, CheckCircle, ChevronRight } from 'lucide-react';
import { Loan, getBook, daysUntil, fmtDate, fmtDateShort } from '../../mock/portalData';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import styles from './BorrowCard.module.css';

import Link from 'next/link';
import type { BorrowRecord } from '@/types/database';

type BorrowLoan = Loan | BorrowRecord;

function getBookId(loan: BorrowLoan): string {
  return 'bookId' in loan ? loan.bookId : loan.book_id;
}

function getBorrowStatus(loan: BorrowLoan): string {
  return 'status' in loan ? loan.status : loan.borrowrecord_status;
}

interface BorrowCardProps {
  loan: BorrowLoan;
  onReturn?: (id: string) => void;
  onRenew?: (id: string) => void;

  compact?: boolean;
}

export default function BorrowCard({ loan, onReturn, onRenew, compact }: BorrowCardProps) {
  const book = getBook(getBookId(loan));
  if (!book) return null;

  const isOverdue = getBorrowStatus(loan) === 'overdue';
  const days = daysUntil(loan.dueAt);
  const canRenew = loan.renewCount < loan.maxRenews;

  

  return (
    <div className={`${styles.card} ${isOverdue ? styles.overdue : ''} ${compact ? styles.compact : ''}`}>
      <div className={styles.cover} style={{ background: `linear-gradient(160deg, ${book.coverColor}, ${book.coverAccent})` }}>
        <div className={styles.coverSpine} />
      </div>
      <div className={styles.info}>
        <div className={styles.header}>
          <div>
            <Link href={`/user/books/${book.id}`} style={{textDecoration: "none"}} className={styles.title} >{book.title}</Link>
            <div className={styles.author}>by {book.author}</div>
          </div>
          <Badge variant={isOverdue ? 'destructive' : days <= 3 ? 'warning' : 'success'}>
            {isOverdue ? 'Overdue' : `Due ${fmtDateShort(loan.dueAt)}`}
          </Badge>
        </div>
        <div className={styles.meta}>
          {isOverdue ? (
            <span className={styles.overdueNote}><AlertCircle size={12}/> {Math.abs(days)} days overdue</span>
          ) : (
            <span className={styles.dueMeta}><Clock size={12}/> {days} days remaining</span>
          )}
          <span className={styles.metaItem}>Borrowed {fmtDateShort(loan.borrowedAt)}</span>
          {loan.renewCount > 0 && <span className={styles.metaItem}>Renewed {loan.renewCount}×</span>}
        </div>
        {!compact && (
          <div className={styles.actions}>
            {onReturn && <Button variant="outline" size="sm" onClick={() => onReturn(loan.id)}>Return</Button>}
            {onRenew && canRenew && (
              <Button variant="ghost" size="sm" leadingIcon={<RotateCcw size={13}/>} onClick={() => onRenew(loan.id)}>
                Renew
              </Button>
            )}
            {onRenew && !canRenew && (
              <span className={styles.maxRenew}>Max renewals reached</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface BorrowHistoryRowProps {
  loan: BorrowLoan;
  
}

export function BorrowHistoryRow({ loan, }: BorrowHistoryRowProps) {
  const book = getBook(getBookId(loan));
  if (!book) return null;

  const onTime = loan.returnedAt && new Date(loan.returnedAt) <= new Date(loan.dueAt);

  return (
    <div className={styles.historyRow}>
      <div className={styles.historyCover} style={{ background: `linear-gradient(160deg, ${book.coverColor}, ${book.coverAccent})` }} />
      <div className={styles.historyInfo}>
        <Link
        style={{textDecoration: "none"}}
          href={`/user/books/${book.id}`}
          className={styles.title}
        
        >
          {book.title}
        </Link>
        <div className={styles.author}>by {book.author}</div>
        <div className={styles.historyMeta}>
          <span>{fmtDateShort(loan.borrowedAt)} → {fmtDateShort(loan.returnedAt!)}</span>
          {loan.renewCount > 0 && <span>Renewed {loan.renewCount}×</span>}
        </div>
      </div>
      <Badge variant={onTime ? 'success' : 'destructive'}>
        {onTime ? 'On time' : 'Late'}
      </Badge>
    </div>
  );
}
