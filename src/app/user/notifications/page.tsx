"use client";

import React, { useState } from 'react';
import { Bell, AlertTriangle, CheckCheck } from 'lucide-react';
import { NOTIFICATIONS } from '@/mock/portalData';

import { NotificationItem } from '@/components/features/NotificationItem';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import styles from '@/styles/user-shared.module.css';



export default function NotificationsPage() {
  const [items, setItems] = useState(NOTIFICATIONS);
  const unread = items.filter(n => !n.read).length;

  function markRead(id: string) { setItems(prev => prev.map(n => n.id===id?{...n,read:true}:n)); }
  function dismiss(id: string) { setItems(prev => prev.filter(n => n.id!==id)); }
  function markAll() { setItems(prev => prev.map(n => ({...n,read:true}))); }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Notifications</h1>
          <p className={styles.pageSub}>{unread > 0 ? `${unread} unread` : 'All caught up'}</p>
        </div>
        {unread > 0 && (
          <Button variant="outline" size="sm" leadingIcon={<CheckCheck size={14}/>} onClick={markAll}>Mark all read</Button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState icon={<Bell size={22}/>} title="No notifications" description="We'll notify you about due dates, reservations, and new arrivals." />
      ) : (
        <div className={styles.cardList}>
          {items.map(n => <NotificationItem key={n.id} notification={n} onMarkRead={markRead} onDismiss={dismiss}/>)}
        </div>
      )}
    </div>
  );
}
