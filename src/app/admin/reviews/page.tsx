
import {  Flag, Check, X, Star } from 'lucide-react';

import { ADMIN_REVIEWS, fmtDate } from '@/styles/mock/adminData';
import Button from '@/components/ui/Button';
import styles from "@/styles/admin-shared.module.css";
import { AlertBar, FilterBar } from '@/components/features/reviews-filterbar';


interface Props {
  searchParams: Promise<{
    filter?: string;
  }>;
}


const STATUS_CLS: Record<string,string> = { published:'badgeActive', pending:'badgeWarning', rejected:'badgeDanger' };

export default async function ReviewsPage({searchParams}:Props) {


   const params = await searchParams;
  const { filter } = params;
  

  const filtered = ADMIN_REVIEWS.filter(r => {
    if (filter === 'pending')   return r.status === 'pending';
    if (filter === 'flagged')   return r.flagged;
    if (filter === 'published') return r.status === 'published';
    return true;
  });

  const pendingCount = ADMIN_REVIEWS.filter(r => r.status === 'pending').length;
  const flaggedCount = ADMIN_REVIEWS.filter(r => r.flagged).length;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Reviews</h1>
          <p className={styles.pageSub}>{ADMIN_REVIEWS.length} reviews · {pendingCount} pending · {flaggedCount} flagged</p>
        </div>
      </div>

      <AlertBar pendingCount={pendingCount} flaggedCount={flaggedCount}/>

     <FilterBar pendingCount={pendingCount} flaggedCount={flaggedCount}/>
      <div className={styles.section}>
        {filtered.map(r => (
          <div key={r.id} style={{ padding:'16px 18px', borderBottom:'1px solid var(--border)', display:'flex', gap:14 }}>
            {/* Rating stars */}
            <div style={{ flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center', gap:4, width:48 }}>
              <div style={{ fontSize:18, fontWeight:800, letterSpacing:'-0.03em' }}>{r.rating}</div>
              <div style={{ display:'flex', gap:1 }}>
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={10} fill={i<=r.rating?'var(--warning)':'none'} color={i<=r.rating?'var(--warning)':'var(--border)'}/>
                ))}
              </div>
            </div>
            {/* Content */}
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', marginBottom:4 }}>
                <span style={{ fontSize:13, fontWeight:700 }}>{r.memberName}</span>
                <span style={{ fontSize:12, color:'var(--muted-foreground)' }}>on</span>
                <span style={{ fontSize:13, fontWeight:600, color:'var(--accent)' }}>{r.bookTitle}</span>
                {r.flagged && (
                  <span style={{ display:'flex', alignItems:'center', gap:3, fontSize:11, fontWeight:600, color:'var(--destructive)', background:'color-mix(in srgb,var(--destructive) 10%,transparent)', padding:'2px 7px', borderRadius:10 }}>
                    <Flag size={10}/>Flagged
                  </span>
                )}
                <span className={`${styles.badge} ${styles[STATUS_CLS[r.status] ?? 'badgeNeutral']}`}>{r.status}</span>
              </div>
              <p style={{ fontSize:13, color:'var(--muted-foreground)', lineHeight:1.6, margin:'0 0 8px' }}>{r.content}</p>
              <div style={{ fontSize:11, color:'var(--muted-foreground)' }}>{fmtDate(r.createdAt)}</div>
            </div>
            {/* Actions */}
            {(r.status === 'pending' || r.flagged) && (
              <div style={{ display:'flex', flexDirection:'column', gap:4, flexShrink:0 }}>
                <Button variant="success" size="xs" leadingIcon={<Check size={12}/>}>Approve</Button>
                <Button variant="destructive" size="xs" leadingIcon={<X size={12}/>}>Reject</Button>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && <p style={{ textAlign:'center', padding:'32px', fontSize:13, color:'var(--muted-foreground)', margin:0 }}>No reviews in this filter.</p>}
      </div>
    </div>
  );
}



// export function ReviewsLoading() {
//   return <div className={styles.page}><div className={styles.skeleton}/></div>;
// }
// export function ReviewsError({ onRetry }: { onRetry: () => void }) {
//   return <div className={styles.page}><div className={styles.errorState}><AlertTriangle size={28} color="var(--destructive)"/><button onClick={onRetry} style={{fontSize:13,cursor:'pointer',background:'none',border:'1px solid var(--border)',borderRadius:6,padding:'6px 14px',fontFamily:'inherit'}}>Retry</button></div></div>;
// }
