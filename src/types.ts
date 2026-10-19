export interface AppUsageData {
  id: string;
  name: string;
  category: 'Social' | 'Entertainment' | 'Productivity' | 'Messaging' | 'Other';
  minutes: number;
  iconName: string;
  color: string;
  changeFromYesterdayMinutes: number;
}

export interface TimeBlockUsage {
  period: string; // e.g. "Morning (06:00 - 12:00)"
  shortLabel: string; // e.g. "6a-12p"
  minutes: number;
  percentage: number;
  highlight?: boolean;
}

export interface DayScreenTime {
  id: string;
  presetName: string;
  dateStr: string;
  totalMinutes: number;
  yesterdayMinutes: number;
  changeMinutes: number;
  apps: AppUsageData[];
  timeOfDay: TimeBlockUsage[];
  peakPeriod: string;
  pickups: number;
  firstPickupTime: string;
  contextNote?: string;
}

export interface AIReflection {
  observation: string;
  possiblePattern: string;
  reflection: string;
  focusArea: string;
  createdAt?: string;
  isMockFallback?: boolean;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  difficulty: 'Gentle' | 'Easy' | 'Medium';
  alternativeActivities: string[];
  focusPoints: number;
  reason: string;
  status: 'pending' | 'started' | 'completed' | 'attempted';
  completedAt?: string;
  isMockFallback?: boolean;
}

export interface DayProgressItem {
  dayOfWeek: string; // "Mon", "Tue", etc.
  dateStr: string;
  totalMinutes: number;
  deltaMinutes: number; // vs target or previous
  goalMet: boolean;
  isToday?: boolean;
}

export interface WeeklyData {
  weekLabel: string;
  days: DayProgressItem[];
  averageDailyMinutes: number;
  lastWeekAvgMinutes: number;
  changeMinutes: number;
  weeklyGoalTarget: number;
  completedChallengesCount: number;
  focusPointsTotal: number;
  mostImprovedPeriod: string;
}

export interface WeeklyInsight {
  weeklyObservation: string;
  possiblePattern: string;
  nextExperiment: string;
  createdAt?: string;
  isMockFallback?: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserProfile {
  goal: string;
  customGoal?: string;
  preferredOfflineActivities: string[];
  preferredDurationMinutes: number;
  preferredDifficulty: 'Easy' | 'Balanced' | 'Challenging';
  lifetimeStats: {
    focusPoints: number;
    challengesCompleted: number;
    bestImprovement: string;
  };
  notificationsEnabled: boolean;
  challengeRemindersEnabled: boolean;
  reduceMotion: boolean;
}
