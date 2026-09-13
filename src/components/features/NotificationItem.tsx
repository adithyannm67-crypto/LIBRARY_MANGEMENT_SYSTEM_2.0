"use client";
import React from 'react';
import { AlertCircle, Clock, Bell, Package, CheckCircle, Info, X } from 'lucide-react';
import { Notification, timeAgo } from '../../styles/mock/portalData';
import styles from './NotificationItem.module.css';

const TYPE_CONFIG: Record<Notification['type'], { icon: React.ReactNode; color: string }> = {
  overdue: { icon: <AlertCircle size={14}/>, color: 'var(--destructive)' },
  'due-soon': { icon: <Clock size={14}/>, color: 'var(--warning)' },
  'reservation-ready': { icon: <Package size={14}/>, color: 'var(--success)' },
  'new-arrival': { icon: <Bell size={14}/>, color: 'var(--accent)' },
  'return-confirmed': { icon: <CheckCircle size={14}/>, color: 'var(--success)' },
  system: { icon: <Info size={14}/>, color: 'var(--accent)' },
};

interface Props {
  notification: Notification;
  onMarkRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export function NotificationItem({ notification: n, onMarkRead, onDismiss }: Props) {
  const cfg = TYPE_CONFIG[n.type];
  return (
    <div className={`${styles.item} ${!n.read ? styles.unread : ''}`}>
      <div className={styles.iconWrap} style={{ background: `color-mix(in srgb, ${cfg?.color} 12%, transparent)`, color: cfg?.color }}>
        {cfg?.icon}
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{n.title}</div>
        <div className={styles.body}>{n.body}</div>
        <div className={styles.time}>{timeAgo(n.createdAt)}</div>
      </div>
      <div className={styles.controls}>
        {!n.read && onMarkRead && (
          <button className={styles.ctrl} onClick={() => onMarkRead(n.id)} title="Mark as read">
            <CheckCircle size={13}/>
          </button>
        )}
        {onDismiss && (
          <button className={styles.ctrl} onClick={() => onDismiss(n.id)} title="Dismiss">
            <X size={13}/>
          </button>
        )}
      </div>
      {!n.read && <div className={styles.dot} />}
    </div>
  );
}
