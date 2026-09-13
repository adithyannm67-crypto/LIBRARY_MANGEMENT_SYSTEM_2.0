"use client";

import React, { useState } from 'react';
import { CalendarClock, AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { RESERVATIONS, getBook, fmtDateShort } from '@/styles/mock/portalData';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import styles from '@/styles/user-shared.module.css';
import { USER_SIDEBAR_INITIAL_LINK } from '@/constants/user-sidebar-constants';



export default function ReservationsPage() {
  const [items, setItems] = useState(RESERVATIONS);
  const ready = items.filter(r => r.status === 'ready');

  function cancel(id: string) { setItems(prev => prev.filter(r => r.id !== id)); }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Reservations</h1>
          <p className={styles.pageSub}>{items.length} active reservation{items.length!==1?'s':''}</p>
        </div>
        <Button variant="primary" size="sm" navigateTo={USER_SIDEBAR_INITIAL_LINK["books"]}>Browse catalog</Button>
      </div>

      {ready.length > 0 && (
        <div className={styles.successBanner}>
          <CheckCircle size={15}/>
          <span><strong>{ready.length} reservation{ready.length>1?'s are':' is'} ready for pickup.</strong> Visit the library desk with your member ID.</span>
        </div>
      )}

      {items.length === 0 ? (
        <EmptyState
          icon={<CalendarClock size={22}/>}
          title="No reservations"
          description="Browse the catalog to reserve books that are currently unavailable."
          actions={<Button variant="primary" size="sm" navigateTo={USER_SIDEBAR_INITIAL_LINK["books"]}>Browse catalog</Button>}
        />
      ) : (
        <div className={styles.cardList}>
          {items.map(res => {
            const book = getBook(res.bookId);
            if (!book) return null;
            const isReady = res.status === 'ready';
            return (
              <Card key={res.id} style={{ borderColor: isReady ? 'color-mix(in srgb,var(--success) 35%,transparent)' : undefined } as any}>
                <Card.Body>
                  <div style={{ display:'flex', gap:14, alignItems:'flex-start' }}>
                    <div style={{ width:50, height:68, borderRadius:7, flexShrink:0, background:`linear-gradient(160deg,${book.coverColor},${book.coverAccent})`, boxShadow:'0 2px 8px rgba(0,0,0,0.15)' }}/>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', gap:8, flexWrap:'wrap', marginBottom:8 }}>
                        <div>
                          <Link href={`/books/${book.id}`} style={{ background:'none', border:'none', cursor:'pointer', fontFamily:'inherit', padding:0, fontSize:14, fontWeight:700, textAlign:'left' }}>{book.title}</Link>
                          <div style={{ fontSize:12, color:'var(--muted-foreground)' }}>by {book.author}</div>
                        </div>
                        <Badge variant={isReady?'success':'warning'}>{isReady?'Ready for pickup':'Pending'}</Badge>
                      </div>
                      <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
                        {isReady ? (
                          <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'var(--success)', fontWeight:500 }}>
                            <CheckCircle size={12}/> Pick up by {fmtDateShort(res.expiresAt!)}
                          </div>
                        ) : (
                          <>
                            <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:12, color:'var(--muted-foreground)' }}>
                              <Clock size={12}/> Queue position #{res.queuePosition}
                            </div>
                            <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:12, color:'var(--muted-foreground)' }}>
                              <CalendarClock size={12}/> Est. {fmtDateShort(res.estimatedAvailability)}
                            </div>
                          </>
                        )}
                        <div style={{ fontSize:12, color:'var(--muted-foreground)' }}>Reserved {fmtDateShort(res.reservedAt)}</div>
                      </div>
                    </div>
                    <button onClick={() => cancel(res.id)} title="Cancel" style={{ background:'none', border:'none', cursor:'pointer', color:'var(--muted-foreground)', padding:4, borderRadius:6, flexShrink:0 }}>
                      <XCircle size={16}/>
                    </button>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}

      {items.length > 0 && (
        <div className={styles.miniCard} style={{ marginTop:20, fontSize:12, color:'var(--muted-foreground)', lineHeight:1.6 }}>
          <strong style={{ color:'var(--foreground)' }}>Reservation policy:</strong> Ready reservations expire after 3 days. You may hold up to 5 reservations. Cancelling removes you from the queue immediately.
        </div>
      )}
    </div>
  );
}
