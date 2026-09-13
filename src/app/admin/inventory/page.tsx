
import { createClient } from '@/lib/server';
import { AlertTriangle,  Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import styles from "@/styles/admin-shared.module.css";
import Filterbar from '@/components/features/admin-filterBar';

import { fmtDate } from '@/mock/adminData';

interface Props {
  searchParams: Promise<{
    q?: string;
    cond?:string;
    filter?: string;
  }>;
}
const COND_COLOR: Record<string,string> = { excellent:'var(--success)', good:'var(--accent)', fair:'var(--warning)', damaged:'var(--destructive)', lost:'var(--muted-foreground)' };
const STATUS_CLS: Record<string,string>  = { available:'badgeActive', borrowed:'badgeWarning', reserved:'badgeAccent', maintenance:'badgeNeutral' };

export default async function InventoryPage({searchParams}:Props) {
  const supabase = await createClient();
  const params = await searchParams;
  const { q, cond, filter } = params;
  const query = q ?? "";
  const status = filter;

  const { data, error } = await supabase
    .from('inventory')
    .select('inventory_id, book_title, copy_number, condition, status, acquired_at, last_checked, notes')
    .order('book_title')
    .order('copy_number')
    .returns<{
      inventory_id: string;
      book_title: string;
      copy_number: number;
      condition: string | null;
      status: string | null;
      acquired_at: string;
      last_checked: string ;
      notes: string | null;
    }[]>();

  if (error) console.error(error);

  const rows = (data ?? []).map(i => ({
    id: i.inventory_id,
    bookTitle: i.book_title,
    copyNumber: i.copy_number,
    condition: i.condition ?? 'good',
    status: i.status ?? 'available',
    acquiredAt: i.acquired_at ?? null,
    lastChecked: i.last_checked ?? null,
    notes: i.notes ?? null,
  }));

  const filtered = query || cond !== 'All' || status !== 'All'
    ? rows.filter(i => {
        if (query && !i.bookTitle.toLowerCase().includes(query.toLowerCase())) return false;
        if (cond !== 'All' && i.condition !== cond) return false;
        if (status !== 'All' && i.status !== status) return false;
        return true;
      })
    : rows;

  const needsAttention = rows.filter(i => i.condition === 'damaged' || i.condition === 'lost' || i.status === 'maintenance');

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Inventory</h1>
          <p className={styles.pageSub}>{rows.length} physical copies tracked</p>
        </div>
        <div className={styles.pageActions}>
          <Button variant="primary" size="sm" leadingIcon={<Plus size={14}/>}>Add Copy</Button>
        </div>
      </div>

      {/* Condition summary */}
      <div style={{ display:'flex', gap:10, marginBottom:20, flexWrap:'wrap' }}>
        {(['excellent','good','fair','damaged','lost'] as const).map(c => {
          const count = rows.filter(i => i.condition === c).length;
          return (
            <div key={c} style={{ padding:'10px 14px', borderRadius:10, background:'var(--card)', border:'1px solid var(--border)', display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:COND_COLOR[c] }}/>
              <span style={{ fontSize:13, fontWeight:600 }}>{count}</span>
              <span style={{ fontSize:12, color:'var(--muted-foreground)' }}>{c}</span>
            </div>
          );
        })}
        {needsAttention.length > 0 && (
          <div style={{ marginLeft:'auto', padding:'10px 14px', borderRadius:10, background:'color-mix(in srgb,var(--warning) 8%,transparent)', border:'1px solid color-mix(in srgb,var(--warning) 20%,transparent)', display:'flex', alignItems:'center', gap:6, fontSize:13 }}>
            <AlertTriangle size={14} color="var(--warning)"/>
            {needsAttention.length} copies need attention
          </div>
        )}
      </div>

      <Filterbar />

      <div className={styles.section}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr>{['Book Title','Copy #','Condition','Status','Acquired','Last Checked','Notes',''].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {filtered.map(i => (
                <tr key={i.id}>
                  <td style={{ fontWeight:600, maxWidth:200, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{i.bookTitle}</td>
                  <td style={{ fontFamily:'monospace', color:'var(--muted-foreground)' }}>#{i.copyNumber}</td>
                  <td><span style={{ fontSize:12, fontWeight:600, color:COND_COLOR[i.condition] }}>{i.condition}</span></td>
                  <td><span className={`${styles.badge} ${styles[STATUS_CLS[i.status] ?? 'badgeNeutral']}`}>{i.status}</span></td>
                  <td style={{ color:'var(--muted-foreground)' }}>{fmtDate(i.acquiredAt)}</td>
                  <td style={{ color:'var(--muted-foreground)' }}>{fmtDate(i.lastChecked)}</td>
                  <td style={{ color:'var(--muted-foreground)', fontSize:12 }}>{i.notes ?? '—'}</td>
                  <td><Button variant="ghost" size="xs">Edit</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className={styles.emptyState}>No copies match.</p>}
        </div>
      </div>
    </div>
  );
}



// export function InventoryLoading() {
//   return <div className={styles.page}><div className={styles.skeleton}/></div>;
// }
// export function InventoryError({ onRetry }: { onRetry: () => void }) {
//   return <div className={styles.page}><div className={styles.errorState}><AlertTriangle size={28} color="var(--destructive)"/><button onClick={onRetry} style={{fontSize:13,cursor:'pointer',background:'none',border:'1px solid var(--border)',borderRadius:6,padding:'6px 14px',fontFamily:'inherit'}}>Retry</button></div></div>;
// }
