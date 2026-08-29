"use client";

import  { useState } from 'react';
import { Trophy } from 'lucide-react';
import { ACHIEVEMENTS, MY_ACHIEVEMENTS } from '@/mock/portalData';

import { AchievementCard } from '@/components/features/AchievementBadge';
import Tabs from '@/components/ui/Tabs';
import EmptyState from '@/components/ui/EmptyState';
import styles from '@/styles/user-shared.module.css';



export default function AchievementsPage() {
  const [tab, setTab] = useState('all');
  const unlocked = MY_ACHIEVEMENTS.filter(a => a.unlocked);
  const inProgress = MY_ACHIEVEMENTS.filter(a => !a.unlocked);
  const shown = tab === 'unlocked' ? unlocked : tab === 'progress' ? inProgress : MY_ACHIEVEMENTS;


  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Achievements</h1>
          <p className={styles.pageSub}>{unlocked.length} of {ACHIEVEMENTS.length} unlocked</p>
        </div>
      </div>

      {/* Overall progress */}
      <div className={styles.miniCard} style={{ marginBottom:20 }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
          <span style={{ fontSize:13, fontWeight:600 }}>Overall progress</span>
          <span style={{ fontSize:13, fontWeight:700, color:'var(--accent)' }}>{Math.round((unlocked.length/MY_ACHIEVEMENTS.length)*100)}%</span>
        </div>
        <div style={{ height:8, borderRadius:4, background:'var(--border)', overflow:'hidden' }}>
          <div style={{ width:`${(unlocked.length/MY_ACHIEVEMENTS.length)*100}%`, height:'100%', background:'linear-gradient(90deg,var(--accent),#818cf8)', borderRadius:4, transition:'width 600ms' }}/>
        </div>
        <div style={{ fontSize:11, color:'var(--muted-foreground)', marginTop:6 }}>{unlocked.length} unlocked · {inProgress.length} in progress</div>
      </div>

      <Tabs
        variant="underline"
        activeTab={tab}
        onChange={setTab}
        items={[
          { id:'all', label:'All', badge:ACHIEVEMENTS.length },
          { id:'unlocked', label:'Unlocked', badge:unlocked.length },
          { id:'progress', label:'In progress', badge:inProgress.length },
        ]}
      />

      {shown.length === 0 ? (
        <EmptyState icon={<Trophy size={22}/>} title="Nothing here" description="Keep reading to unlock achievements!" compact/>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:10, marginTop:16 }}>
          {shown.map(a => <AchievementCard key={a.id} achievement={a}/>)}
        </div>
      )}
    </div>
  );
}
