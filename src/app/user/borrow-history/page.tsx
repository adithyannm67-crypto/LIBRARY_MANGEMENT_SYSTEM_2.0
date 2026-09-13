
import { Search } from 'lucide-react';
import { LOAN_HISTORY, getBook } from '@/styles/mock/portalData';

import { BorrowHistoryRow } from '@/components/features/BorrowCard';

import SearchBar from '@/components/ui/SearchBar2.0';
import EmptyState from '@/components/ui/EmptyState';
import styles from '@/styles/user-shared.module.css';

import { createClient } from '@/lib/server';
import type { BorrowRecord } from '@/types/database';

interface BorrowWithBook extends BorrowRecord {
  books: { title: string; author: string } | null;
}

interface Props { searchParams:Promise<{ q?: string; }> }




export default async function BorrowHistoryPage({searchParams}:Props) {
 const supabase = await createClient()

  const { data, error } = await supabase
    .from('borrow_records')
    .select('*, books(title, author)')
    .eq('member_id', 'm2')
    
 
  if (error) console.error(error)



    const borrowHistory: BorrowWithBook[] = data ?? [];
  const LOAN_HISTORY = borrowHistory

console.log(data?.map(b=>b.id))

  const params = await searchParams;
  const { q } = params;
  const query = q ?? "";


const filtered = (() => {
  if (!query) return LOAN_HISTORY;
  const q = query.toLowerCase();
  return LOAN_HISTORY.filter((l) => {
    return (
      l?.books?.title?.toLowerCase().includes(q) ||
      l?.books?.author?.toLowerCase().includes(q)
    );
  });
})();
  const onTime = LOAN_HISTORY.filter(l => l.returnedAt && new Date(l.returnedAt) <= new Date(l.dueAt)).length;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Borrow History</h1>
          <p className={styles.pageSub}>{LOAN_HISTORY.length} books returned all time</p>
        </div>
      </div>

      <div className={styles.threeCol} style={{ marginBottom:20 }}>
        {[
          { label:'Books returned', value:LOAN_HISTORY.length },
          { label:'Returned on time', value:onTime },
          { label:'Total renewals', value:LOAN_HISTORY.reduce((s,l)=>s+l.renewCount,0) },
        ].map(s => (
          <div key={s.label} className={styles.miniCard} style={{ textAlign:'center' }}>
            <div style={{ fontSize:22, fontWeight:800, letterSpacing:'-0.04em', marginBottom:2 }}>{s.value}</div>
            <div style={{ fontSize:11, color:'var(--muted-foreground)', fontWeight:500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{  marginBottom:16 }}>
        <SearchBar  placeholder="Search history…"/>
      </div>

      <div className={styles.cardList}>
        {filtered.length === 0 ? (
          <EmptyState icon={<Search size={20}/>} title="No results" description="No returned books match your search." compact/>
        ) : (
          filtered.map(l => <BorrowHistoryRow key={l.id} loan={l} />)
        )}
      </div>
    </div>
  );
}
