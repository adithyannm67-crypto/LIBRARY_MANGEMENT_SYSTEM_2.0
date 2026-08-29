import React from 'react';
import { Star, AlertTriangle, TrendingUp, BookOpen } from 'lucide-react';
import { READING_HISTORY, MONTHLY_READING, getBook } from '@/mock/portalData';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { BarChartCard } from '@/components/ui/Charts';
import styles from '@/styles/user-shared.module.css';

import Link from 'next/link';



export default function ReadingHistoryPage() {
  const totalPages = READING_HISTORY.reduce((s, r) => s + (getBook(r.bookId)?.pages ?? 0), 0);
  const avgRating = READING_HISTORY.filter(r => r.userRating).reduce((s, r, _, arr) => s + r.userRating / arr.length, 0);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Reading History</h1>
          <p className={styles.pageSub}>{READING_HISTORY.length} books finished</p>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.threeCol} style={{ marginBottom:20 }}>
        {[
          { icon:<BookOpen size={16} color="var(--accent)"/>, label:'Books finished', value:READING_HISTORY.length },
          { icon:<TrendingUp size={16} color="var(--success)"/>, label:'Pages read', value:totalPages.toLocaleString() },
          { icon:<Star size={16} color="#F59E0B"/>, label:'Avg rating', value:avgRating.toFixed(1) },
        ].map(s => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statIcon}>{s.icon}</div>
            <div className={styles.statValue}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      <BarChartCard
        title="Reading activity"
        subtitle="Books read per month · 2025–2026"
        data={MONTHLY_READING}
        series={[{ key:'count', label:'Books', color:'var(--accent)' }]}
        xKey="month"
        height={180}
      />

      <div className={styles.sectionLabel} style={{ marginTop:24 }}>Books finished</div>
      <div className={styles.cardList}>
        {READING_HISTORY.map(r => {
          const book = getBook(r.bookId);
          if (!book) return null;
          return (
            <div key={r.id} style={{ display:'flex', gap:12, padding:'12px 14px', borderRadius:10, border:'1px solid var(--border)', background:'var(--card)', alignItems:'flex-start' }}>
              <div style={{ width:44, height:60, borderRadius:6, flexShrink:0, background:`linear-gradient(160deg,${book.coverColor},${book.coverAccent})`, boxShadow:'0 2px 6px rgba(0,0,0,0.12)' }}/>
              <div style={{ flex:1, minWidth:0 }}>
                <Link href={`/user/books/${book.id}`} style={{ background:'none', border:'none', cursor:'pointer', padding:0, fontFamily:'inherit', textAlign:'left', fontSize:14, fontWeight:700, marginBottom:2 }}>{book.title}</Link>
                <div style={{ fontSize:12, color:'var(--muted-foreground)', marginBottom:6 }}>by {book.author}</div>
                <div style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center' }}>
                  <span style={{ fontSize:11, color:'var(--muted-foreground)' }}>
                    Finished {new Date(r.finishedAt).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
                  </span>
                  {r.userRating && (
                    <div style={{ display:'flex', alignItems:'center', gap:2 }}>
                      {[1,2,3,4,5].map(i => <Star key={i} size={11} fill={i<=r.userRating?'#F59E0B':'transparent'} color="#F59E0B"/>)}
                    </div>
                  )}
                  <Badge variant="outline">{book.pages.toLocaleString()} pg</Badge>
                </div>
                {r.note && <div style={{ marginTop:6, fontSize:12, color:'var(--muted-foreground)', fontStyle:'italic', lineHeight:1.5 }}>"{r.note}"</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
