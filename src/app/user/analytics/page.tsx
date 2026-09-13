
import { ALL_RESERVATIONS, fmtDate } from '@/styles/mock/adminData';
import Button from '@/components/ui/Button';
import styles from "@/styles/admin-shared.module.css";
import FilterBar from '@/components/features/admin-filterBar';

interface Props {
  searchParams: Promise<{
    q?: string;
    
    filter?: string;
  }>;
}


const STATUS_CLS: Record<string,string> = { pending:'badgeWarning', ready:'badgeActive', cancelled:'badgeNeutral', fulfilled:'badgeNeutral' };

export default async function AdminReservationsPage({searchParams}:Props) {
  
   const params = await searchParams;
  const { q, filter } = params;
  const query = q ?? "";
  const status = filter;

  const ready = ALL_RESERVATIONS.filter(r => r.status === 'ready');

  const filtered = ALL_RESERVATIONS.filter(r => {
    const q = query.toLowerCase();
    if (q && !r.memberName.toLowerCase().includes(q) && !r.bookTitle.toLowerCase().includes(q)) return false;
    if (status !== 'All' && r.status !== status) return false;
    return true;
  });

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Reservations</h1>
          <p className={styles.pageSub}>{ready.length} ready for pickup · {ALL_RESERVATIONS.filter(r=>r.status==='pending').length} pending</p>
        </div>
      </div>

      {ready.length > 0 && (
        <div className={styles.alertSuccess}>
          <span style={{ flex:1 }}><strong>{ready.length} reservation{ready.length > 1 ? 's' : ''}</strong> ready for pickup — notify members?</span>
          <Button variant="success" size="xs">Notify All</Button>
        </div>
      )}

      <FilterBar/>

      <div className={styles.section}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr>{['Member','Book','Reserved','Queue','Est. Available','Expires','Status',''].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td style={{ fontWeight:600 }}>{r.memberName}</td>
                  <td style={{ maxWidth:180 }}>
                    <div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontWeight:500 }}>{r.bookTitle}</div>
                  </td>
                  <td style={{ color:'var(--muted-foreground)' }}>{fmtDate(r.reservedAt)}</td>
                  <td style={{ color:'var(--muted-foreground)' }}>{r.queuePosition}/{r.totalQueue}</td>
                  <td style={{ color:'var(--muted-foreground)' }}>{r.estimatedAvailability ? fmtDate(r.estimatedAvailability) : '—'}</td>
                  <td style={{ color:'var(--muted-foreground)' }}>{r.expiresAt ? fmtDate(r.expiresAt) : '—'}</td>
                  <td><span className={`${styles.badge} ${styles[STATUS_CLS[r.status] ?? 'badgeNeutral']}`}>{r.status}</span></td>
                  <td>
                    <div style={{ display:'flex', gap:4 }}>
                      {r.status === 'ready' && <Button variant="success" size="xs">Fulfill</Button>}
                      {r.status === 'pending' && <Button variant="ghost" size="xs">Cancel</Button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p style={{ textAlign:'center', padding:'32px', fontSize:13, color:'var(--muted-foreground)', margin:0 }}>No reservations match.</p>}
        </div>
      </div>
    </div>
  );
}


// export function AdminReservationsLoading() {
//   return <div className={styles.page}><div className={styles.skeleton}/></div>;
// }
// export function AdminReservationsError({ onRetry }: { onRetry: () => void }) {
//   return <div className={styles.page}><div className={styles.errorState}><AlertTriangle size={28} color="var(--destructive)"/><button onClick={onRetry} style={{fontSize:13,cursor:'pointer',background:'none',border:'1px solid var(--border)',borderRadius:6,padding:'6px 14px',fontFamily:'inherit'}}>Retry</button></div></div>;
// }