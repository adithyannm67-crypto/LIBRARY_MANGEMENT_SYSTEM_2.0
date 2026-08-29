import React from 'react';
import { Lock } from 'lucide-react';
import { Achievement } from '../../mock/portalData';
import styles from './AchievementBadge.module.css';

const RARITY_COLOR = {
  common: '#71717A',
  rare: '#3B82F6',
  epic: '#8B5CF6',
  legendary: '#F59E0B',
};

interface BadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
}

export function AchievementBadge({ achievement: a, size = 'md' }: BadgeProps) {
  return (
    <div
      className={`${styles.badge} ${styles[size]} ${!a.unlocked ? styles.locked : ''}`}
      title={a.title}
      style={{ '--rarity': RARITY_COLOR[a.rarity] } as React.CSSProperties}
    >
      {a.unlocked ? (
        <span className={styles.emoji}>{a.icon}</span>
      ) : (
        <Lock size={size === 'sm' ? 12 : size === 'lg' ? 18 : 14} color="var(--muted-foreground)"/>
      )}
    </div>
  );
}

interface CardProps { achievement: Achievement; }

export function AchievementCard({ achievement: a }: CardProps) {
  const rarityColor = RARITY_COLOR[a.rarity];
  return (
    <div className={`${styles.card} ${!a.unlocked ? styles.cardLocked : ''}`} style={{ '--rarity': rarityColor } as React.CSSProperties}>
      <div className={styles.cardIcon}>
        {a.unlocked ? (
          <span className={styles.bigEmoji}>{a.icon}</span>
        ) : (
          <Lock size={22} color="var(--muted-foreground)"/>
        )}
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardRarity} style={{ color: rarityColor }}>{a.rarity}</div>
        <div className={styles.cardTitle}>{a.title}</div>
        <div className={styles.cardDesc}>{a.description}</div>
        {!a.unlocked && a.progress !== undefined && a.target && (
          <div className={styles.progress}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${Math.min(100, (a.progress / a.target) * 100)}%`, background: rarityColor }} />
            </div>
            <span className={styles.progressLabel}>{a.progress} / {a.target}</span>
          </div>
        )}
        {a.unlocked && a.unlockedAt && (
          <div className={styles.unlockDate}>
            Unlocked {new Date(a.unlockedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        )}
      </div>
    </div>
  );
}
