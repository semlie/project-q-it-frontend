import { Award } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { styles } from './styles';
import { Achievement } from './types';

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export default function AchievementsSection({ achievements }: AchievementsSectionProps) {
  const earnedCount = achievements.filter((achievement) => achievement.earned).length;

  return (
    <div style={styles.section}>
      <SectionTitle icon={<Award size={20} />} title={`הישגים (${earnedCount}/${achievements.length})`} />
      <div style={styles.achievementsList}>
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            style={achievement.earned ? styles.achievementCard : styles.achievementCardLocked}
          >
            <div style={styles.achievementIcon}>{achievement.icon}</div>
            <div style={styles.achievementContent}>
              <div style={styles.achievementTitle}>{achievement.title}</div>
              <div style={styles.achievementDescription}>{achievement.description}</div>
              {achievement.earned && achievement.date && (
                <div style={styles.achievementDate}>הושג ב-{achievement.date}</div>
              )}
            </div>
            <div style={styles.achievementRarity}>{achievement.rarity}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
