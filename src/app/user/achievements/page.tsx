import { Trophy } from 'lucide-react';
import { AchievementCard } from '@/components/features/AchievementBadge';
import Tabs from '@/components/ui/Tabs';
import EmptyState from '@/components/ui/EmptyState';
import styles from '@/styles/user-shared.module.css';
import { createClient } from '@/lib/server';
import type { Achievement, UserAchievement } from '@/types/database';

interface Props {
  searchParams: Promise<{ tab?: string }>;
}

export default async function AchievementsPage({ searchParams }: Props) {
  const tab = (await searchParams).tab || 'all';
  const supabase = await createClient();  // Fetch all achievements
  const { data: achievementsData } = await supabase
    .from('achievements')
    .select('*')
    .order('id');

  const achievements = (achievementsData ?? []) as Achievement[];

  // Get member_id via database function
  const { data: memberId } = await supabase.rpc('get_my_member_id');

  // Fetch user's progress
  let userAchievements: UserAchievement[] = [];
  if (memberId) {
    const { data: uaData } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('member_id', memberId);

    userAchievements = (uaData ?? []) as UserAchievement[];
  }

  // Merge achievements with user progress
  const merged = achievements.map(a => {
    const ua = userAchievements.find(u => u.achievement_id === a.id);
    return {
      ...a,
      achievement_id: a.id,
      member_id: memberId ?? '',
      progress: ua?.progress ?? 0,
      unlocked: ua?.unlocked ?? false,
      unlocked_at: ua?.unlocked_at,
    };
  });

  const unlocked = merged.filter(a => a.unlocked);
  const inProgress = merged.filter(a => !a.unlocked);
  const shown = tab === 'unlocked' ? unlocked : tab === 'progress' ? inProgress : merged;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Achievements</h1>
          <p className={styles.pageSub}>{unlocked.length} of {achievements.length} unlocked</p>
        </div>
      </div>

      {/* Overall progress */}
      <div className={styles.miniCard} style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Overall progress</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>
            {merged.length > 0 ? Math.round((unlocked.length / merged.length) * 100) : 0}%
          </span>
        </div>
        <div style={{ height: 8, borderRadius: 4, background: 'var(--border)', overflow: 'hidden' }}>
          <div style={{
            width: `${merged.length > 0 ? (unlocked.length / merged.length) * 100 : 0}%`,
            height: '100%',
            background: 'linear-gradient(90deg,var(--accent),#818cf8)',
            borderRadius: 4,
            transition: 'width 600ms',
          }} />
        </div>
        <div style={{ fontSize: 11, color: 'var(--muted-foreground)', marginTop: 6 }}>
          {unlocked.length} unlocked · {inProgress.length} in progress
        </div>
      </div>

      <Tabs
        variant="underline"
        items={[
          { id: 'all', label: 'All', badge: achievements.length },
          { id: 'unlocked', label: 'Unlocked', badge: unlocked.length },
          { id: 'progress', label: 'In progress', badge: inProgress.length },
        ]}
      />

      {shown.length === 0 ? (
        <EmptyState icon={<Trophy size={22} />} title="Nothing here" description="Keep reading to unlock achievements!" compact />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
          {shown.map(a => <AchievementCard key={a.id} achievement={a} />)}
        </div>
      )}
    </div>
  );
}
