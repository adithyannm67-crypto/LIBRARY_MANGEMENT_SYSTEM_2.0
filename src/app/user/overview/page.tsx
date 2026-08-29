
import {  BookMarked, CheckCircle, Clock, Award, Star } from 'lucide-react';
import {
  LOANS, LOAN_HISTORY, ACHIEVEMENTS,MY_ACHIEVEMENTS, READING_HISTORY, USER_PROFILE, MONTHLY_READING, getBook, fmtDateShort,
} from '@/mock/portalData';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { AreaChartCard } from '@/components/ui/Charts';
import { AchievementBadge } from '@/components/features/AchievementBadge';
import styles from '@/styles/user-shared.module.css';
import Link from 'next/link';




export default function OverviewPage() {
  const active = LOANS.filter(l => l.status !== 'returned');
  const unlocked = MY_ACHIEVEMENTS.filter(a => a.unlocked);

  const allBorrowed = [...LOANS, ...LOAN_HISTORY];
  const genreMap: Record<string, number> = {};
  allBorrowed.forEach(l => {
    const b = getBook(l.bookId);
    if (b) genreMap[String(b.category)] = (genreMap[String(b.category)] ?? 0) + 1;
  });
  const topGenres = Object.entries(genreMap).sort((a,b) => b[1]-a[1]).slice(0,3);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Reading Overview</h1>
          <p className={styles.pageSub}>Your full reading snapshot</p>
        </div>
        <Button variant="outline" size="sm">Export report</Button>
      </div>

      {/* Key stats */}
      <div className={styles.fourCol} style={{ marginBottom:24 }}>
        {[
          { icon:<BookMarked size={16}/>, label:'Total borrowed', value:USER_PROFILE.stats.totalBorrowed, color:'var(--accent)' },
          { icon:<CheckCircle size={16}/>, label:'Returned', value:USER_PROFILE.stats.returned, color:'var(--success)' },
          { icon:<Clock size={16}/>, label:'Active', value:active.length, color:'var(--warning)' },
          { icon:<Award size={16}/>, label:'Achievements', value:unlocked.length, color:'#a78bfa' },
        ].map(s => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statIcon} style={{ color:s.color }}>{s.icon}</div>
            <div className={styles.statValue}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className={styles.twoCol}>
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          <AreaChartCard
            title="Reading trend"
            subtitle="Books read per month · 2025–2026"
            data={MONTHLY_READING}
            series={[{ key:'count', label:'Books', color:'var(--accent)' }]}
            xKey="month"
            height={180}
          />

          {/* Top genres */}
          <Card>
            <Card.Header><Card.Title>Top genres</Card.Title></Card.Header>
            <Card.Body style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {topGenres.map(([genre, count], i) => (
                <div key={genre} style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:20, height:20, borderRadius:'50%', flexShrink:0, background:['#F59E0B','#9CA3AF','#CD7F32'][i], display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:'#fff' }}>{i+1}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                      <span style={{ fontSize:13, fontWeight:500 }}>{genre}</span>
                      <span style={{ fontSize:11, color:'var(--muted-foreground)' }}>{count} books</span>
                    </div>
                    <div style={{ height:4, borderRadius:2, background:'var(--border)', overflow:'hidden' }}>
                      <div style={{ width:`${(count/(topGenres[0]?.[1]??1))*100}%`, height:'100%', background:'var(--accent)', borderRadius:2 }}/>
                    </div>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          {/* Recent reads */}
          <Card>
            <Card.Header>
              <Card.Title>Recent reads</Card.Title>
              <Link href="/user/reading-history" style={{ textDecoration:'none',cursor:'pointer', fontSize:12, color:'var(--accent)', background:'none', border:'none', fontFamily:'inherit' }}>View all</Link>
            </Card.Header>
            <Card.Body style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {READING_HISTORY.slice(0,4).map(r => {
                const book = getBook(r.bookId);
                if (!book) return null;
                return (
                  <div key={r.id} style={{ display:'flex', gap:10, alignItems:'center' }}>
                    <div style={{ width:32, height:44, borderRadius:4, flexShrink:0, background:`linear-gradient(160deg,${book.coverColor},${book.coverAccent})` }}/>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{book.title}</div>
                      <div style={{ fontSize:11, color:'var(--muted-foreground)' }}>{fmtDateShort(r.finishedAt)}</div>
                    </div>
                    {r.userRating && (
                      <div style={{ display:'flex', alignItems:'center', gap:2, flexShrink:0 }}>
                        <Star size={11} fill="#F59E0B" color="#F59E0B"/>
                        <span style={{ fontSize:11, fontWeight:600 }}>{r.userRating}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </Card.Body>
          </Card>

          {/* Achievements preview */}
          <Card>
            <Card.Header>
              <Card.Title>Achievements</Card.Title>
              <Link href="/user/achievements" style={{ textDecoration:'none', fontSize:12, color:'var(--accent)', background:'none', border:'none', cursor:'pointer', fontFamily:'inherit' }}>View all</Link>
            </Card.Header>
            <Card.Body>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {unlocked.slice(0,6).map(a => <AchievementBadge key={a.id} achievement={a} size="md"/>)}
              </div>
              <div style={{ fontSize:11, color:'var(--muted-foreground)', marginTop:10 }}>{unlocked.length} of {ACHIEVEMENTS.length} unlocked</div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
