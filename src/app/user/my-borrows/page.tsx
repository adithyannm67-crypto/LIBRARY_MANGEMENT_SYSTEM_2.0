"use client";
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BookMarked, AlertTriangle } from 'lucide-react';
import { LOANS } from '@/styles/mock/portalData';

import BorrowCard from '@/components/features/BorrowCard';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';
import EmptyState from '@/components/ui/EmptyState';
import styles from '@/styles/user-shared.module.css';
import { USER_SIDEBAR_INITIAL_LINK } from '@/constants/user-sidebar-constants';




export default function MyBorrowsPage() {
  const params=useSearchParams();
  const tab=params.get('tab');
  const [loans, setLoans] = useState(LOANS.filter(l => l.status !== 'returned'));

  const overdue = loans.filter(l => l.status === 'overdue');
  const active = loans.filter(l => l.status === 'active');
  const shown = tab === 'overdue' ? overdue : tab === 'active' ? active : loans;

  function handleReturn(id: string) { setLoans(prev => prev.filter(l => l.id !== id)); }
  function handleRenew(id: string) {
    setLoans(prev => prev.map(l => l.id === id ? { ...l, renewCount: l.renewCount + 1, status: 'active' as const } : l));
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>My Borrows</h1>
          <p className={styles.pageSub}>{loans.length} book{loans.length !== 1 ? 's' : ''} checked out</p>
        </div>
        <Button variant="primary" size="sm" navigateTo={USER_SIDEBAR_INITIAL_LINK["books"]}>Browse more</Button>
      </div>

      {overdue.length > 0 && (
        <div className={styles.alertBanner}>
          <AlertTriangle size={15}/>
          <span><strong>{overdue.length} book{overdue.length > 1 ? 's are' : ' is'} overdue.</strong> Return soon to avoid fines.</span>
        </div>
      )}

      <Tabs
        variant="underline"
        items={[
          { id:'all', label:'All', badge: loans.length },
          { id:'active', label:'Active', badge: active.length },
          { id:'overdue', label:'Overdue', badge: overdue.length },
        ]}
      />

      <div className={styles.cardList} style={{ marginTop:16 }}>
        {shown.length === 0 ? (
          <EmptyState
            icon={<BookMarked size={22}/>}
            title="Nothing here"
            description={tab === 'overdue' ? "You have no overdue books. Great!" : "No borrows yet. Visit the catalog to get started."}
            actions={tab !== 'overdue' && <Button variant="primary" size="sm" navigateTo={USER_SIDEBAR_INITIAL_LINK["books"]}>Browse catalog</Button>}
            compact
          />
        ) : (
          shown.map(l => (
            <BorrowCard key={l.id} loan={l} onReturn={handleReturn} onRenew={handleRenew}  />
          ))
        )}
      </div>

      {/* Borrow limit */}
      <div className={styles.miniCard} style={{ marginTop:20 }}>
        <div style={{ fontWeight:700, fontSize:12, marginBottom:6 }}>Borrow limit</div>
        <div style={{ height:6, borderRadius:3, background:'var(--border)', overflow:'hidden', marginBottom:6 }}>
          <div style={{ width:`${(loans.length/5)*100}%`, height:'100%', background: loans.length>=5?'var(--destructive)':'var(--accent)', borderRadius:3, transition:'width 400ms' }}/>
        </div>
        <div style={{ fontSize:11, color:'var(--muted-foreground)' }}>{loans.length} of 5 used</div>
      </div>
    </div>
  );
}
