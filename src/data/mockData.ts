import { DayScreenTime, WeeklyData, Badge, AIReflection, DailyChallenge, UserProfile } from '../types';

export const INITIAL_PRESETS: DayScreenTime[] = [
  {
    id: 'preset-typical',
    presetName: 'Typical Evening Social Day',
    dateStr: 'Today, Aug 29',
    totalMinutes: 5 * 60 + 42, // 5h 42m (342m)
    yesterdayMinutes: 6 * 60 + 18, // 6h 18m (378m)
    changeMinutes: -36, // -36 minutes
    apps: [
      { id: 'insta', name: 'Instagram', category: 'Social', minutes: 102, iconName: 'Instagram', color: '#F7C6B8', changeFromYesterdayMinutes: -12 },
      { id: 'tiktok', name: 'TikTok', category: 'Social', minutes: 75, iconName: 'Video', color: '#E4DAEC', changeFromYesterdayMinutes: -15 },
      { id: 'youtube', name: 'YouTube', category: 'Entertainment', minutes: 58, iconName: 'PlayCircle', color: '#FCE7C8', changeFromYesterdayMinutes: +8 },
      { id: 'whatsapp', name: 'WhatsApp', category: 'Messaging', minutes: 47, iconName: 'MessageCircle', color: '#D2E8D7', changeFromYesterdayMinutes: -5 },
      { id: 'other', name: 'Other Apps', category: 'Other', minutes: 60, iconName: 'Grid', color: '#EAE6DF', changeFromYesterdayMinutes: -12 },
    ],
    timeOfDay: [
      { period: 'Morning (06:00 - 12:00)', shortLabel: 'Morning', minutes: 45, percentage: 13 },
      { period: 'Afternoon (12:00 - 17:00)', shortLabel: 'Afternoon', minutes: 65, percentage: 19 },
      { period: 'Evening (17:00 - 21:00)', shortLabel: 'Evening', minutes: 82, percentage: 24 },
      { period: 'Late Night (21:00 - 00:00)', shortLabel: 'Late Night', minutes: 150, percentage: 44, highlight: true },
    ],
    peakPeriod: '21:00 – 00:00',
    pickups: 68,
    firstPickupTime: '07:15',
    contextNote: 'Busy day at work, unwound with videos in bed before sleeping.'
  },
  {
    id: 'preset-night-scroll',
    presetName: 'Late-Night Loop Session',
    dateStr: 'Today, Aug 29',
    totalMinutes: 6 * 60 + 20, // 6h 20m (380m)
    yesterdayMinutes: 5 * 60 + 40,
    changeMinutes: +40,
    apps: [
      { id: 'tiktok', name: 'TikTok', category: 'Social', minutes: 130, iconName: 'Video', color: '#E4DAEC', changeFromYesterdayMinutes: +35 },
      { id: 'reddit', name: 'Reddit', category: 'Social', minutes: 90, iconName: 'Compass', color: '#FCE7C8', changeFromYesterdayMinutes: +15 },
      { id: 'youtube', name: 'YouTube', category: 'Entertainment', minutes: 65, iconName: 'PlayCircle', color: '#F7C6B8', changeFromYesterdayMinutes: -10 },
      { id: 'messaging', name: 'Messages & Mail', category: 'Messaging', minutes: 45, iconName: 'MessageCircle', color: '#D2E8D7', changeFromYesterdayMinutes: 0 },
      { id: 'other', name: 'Other Apps', category: 'Other', minutes: 50, iconName: 'Grid', color: '#EAE6DF', changeFromYesterdayMinutes: 0 },
    ],
    timeOfDay: [
      { period: 'Morning (06:00 - 12:00)', shortLabel: 'Morning', minutes: 30, percentage: 8 },
      { period: 'Afternoon (12:00 - 17:00)', shortLabel: 'Afternoon', minutes: 70, percentage: 18 },
      { period: 'Evening (17:00 - 21:00)', shortLabel: 'Evening', minutes: 90, percentage: 24 },
      { period: 'Late Night (21:00 - 01:30)', shortLabel: 'Late Night', minutes: 190, percentage: 50, highlight: true },
    ],
    peakPeriod: '22:00 – 01:30',
    pickups: 82,
    firstPickupTime: '06:50',
    contextNote: 'Felt tired in the evening and scrolled through feeds late into the night.'
  },
  {
    id: 'preset-mindful-workday',
    presetName: 'Balanced Workday',
    dateStr: 'Today, Aug 29',
    totalMinutes: 3 * 60 + 15, // 3h 15m (195m)
    yesterdayMinutes: 4 * 60 + 50,
    changeMinutes: -95,
    apps: [
      { id: 'slack', name: 'Slack & Teams', category: 'Productivity', minutes: 70, iconName: 'Briefcase', color: '#D2E8D7', changeFromYesterdayMinutes: -20 },
      { id: 'notion', name: 'Notion', category: 'Productivity', minutes: 45, iconName: 'FileText', color: '#EAE6DF', changeFromYesterdayMinutes: +10 },
      { id: 'spotify', name: 'Spotify & Audio', category: 'Entertainment', minutes: 40, iconName: 'Headphones', color: '#FCE7C8', changeFromYesterdayMinutes: -15 },
      { id: 'whatsapp', name: 'WhatsApp', category: 'Messaging', minutes: 25, iconName: 'MessageCircle', color: '#E4DAEC', changeFromYesterdayMinutes: -10 },
      { id: 'other', name: 'Other Utilities', category: 'Other', minutes: 15, iconName: 'Grid', color: '#F7C6B8', changeFromYesterdayMinutes: -60 },
    ],
    timeOfDay: [
      { period: 'Morning (06:00 - 12:00)', shortLabel: 'Morning', minutes: 70, percentage: 36 },
      { period: 'Afternoon (12:00 - 17:00)', shortLabel: 'Afternoon', minutes: 85, percentage: 44, highlight: true },
      { period: 'Evening (17:00 - 21:00)', shortLabel: 'Evening', minutes: 30, percentage: 15 },
      { period: 'Late Night (21:00 - 00:00)', shortLabel: 'Late Night', minutes: 10, percentage: 5 },
    ],
    peakPeriod: '14:00 – 16:00',
    pickups: 34,
    firstPickupTime: '08:30',
    contextNote: 'Took an evening walk and left phone in bag during dinner.'
  },
  {
    id: 'preset-weekend-marathon',
    presetName: 'Weekend Media Spree',
    dateStr: 'Today, Aug 29',
    totalMinutes: 7 * 60 + 5, // 7h 05m (425m)
    yesterdayMinutes: 4 * 60 + 20,
    changeMinutes: +165,
    apps: [
      { id: 'youtube', name: 'YouTube', category: 'Entertainment', minutes: 190, iconName: 'PlayCircle', color: '#FCE7C8', changeFromYesterdayMinutes: +120 },
      { id: 'insta', name: 'Instagram', category: 'Social', minutes: 110, iconName: 'Instagram', color: '#F7C6B8', changeFromYesterdayMinutes: +40 },
      { id: 'netflix', name: 'Streaming Video', category: 'Entertainment', minutes: 75, iconName: 'Tv', color: '#E4DAEC', changeFromYesterdayMinutes: +30 },
      { id: 'messaging', name: 'Chat Apps', category: 'Messaging', minutes: 30, iconName: 'MessageCircle', color: '#D2E8D7', changeFromYesterdayMinutes: -5 },
      { id: 'other', name: 'Other Apps', category: 'Other', minutes: 20, iconName: 'Grid', color: '#EAE6DF', changeFromYesterdayMinutes: -20 },
    ],
    timeOfDay: [
      { period: 'Morning (06:00 - 12:00)', shortLabel: 'Morning', minutes: 60, percentage: 14 },
      { period: 'Afternoon (12:00 - 17:00)', shortLabel: 'Afternoon', minutes: 180, percentage: 42, highlight: true },
      { period: 'Evening (17:00 - 21:00)', shortLabel: 'Evening', minutes: 120, percentage: 28 },
      { period: 'Late Night (21:00 - 00:00)', shortLabel: 'Late Night', minutes: 65, percentage: 16 },
    ],
    peakPeriod: '14:30 – 17:30',
    pickups: 52,
    firstPickupTime: '09:40',
    contextNote: 'Rainy Saturday spent relaxing indoors watching cooking tutorials and video essays.'
  }
];

export const INITIAL_WEEKLY_DATA: WeeklyData = {
  weekLabel: 'Aug 23 – Aug 29',
  days: [
    { dayOfWeek: 'Mon', dateStr: 'Aug 23', totalMinutes: 5 * 60 + 20, deltaMinutes: -25, goalMet: true },
    { dayOfWeek: 'Tue', dateStr: 'Aug 24', totalMinutes: 4 * 60 + 50, deltaMinutes: -30, goalMet: true },
    { dayOfWeek: 'Wed', dateStr: 'Aug 25', totalMinutes: 5 * 60 + 45, deltaMinutes: +15, goalMet: false },
    { dayOfWeek: 'Thu', dateStr: 'Aug 26', totalMinutes: 4 * 60 + 40, deltaMinutes: -45, goalMet: true },
    { dayOfWeek: 'Fri', dateStr: 'Aug 27', totalMinutes: 6 * 60 + 10, deltaMinutes: +50, goalMet: false },
    { dayOfWeek: 'Sat', dateStr: 'Aug 28', totalMinutes: 6 * 60 + 18, deltaMinutes: +40, goalMet: false },
    { dayOfWeek: 'Sun', dateStr: 'Aug 29', totalMinutes: 5 * 60 + 42, deltaMinutes: -36, goalMet: true, isToday: true },
  ],
  averageDailyMinutes: 5 * 60 + 6, // 5h 06m (306m)
  lastWeekAvgMinutes: 5 * 60 + 48, // 5h 48m (348m)
  changeMinutes: -42, // -42 min
  weeklyGoalTarget: 5,
  completedChallengesCount: 3, // 3 / 5 mindful challenges completed
  focusPointsTotal: 120, // 120 points
  mostImprovedPeriod: 'Late evening usage decreased by 28 minutes.'
};

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'evening-reset',
    title: 'Evening Reset',
    description: 'Completed a 20-minute screen-free buffer before sleeping.',
    icon: 'Moon',
    unlocked: true,
    unlockedAt: 'Aug 24'
  },
  {
    id: 'mindful-break',
    title: 'Mindful Break',
    description: 'Chose a physical alternative activity instead of scrolling.',
    icon: 'BookOpen',
    unlocked: true,
    unlockedAt: 'Aug 26'
  },
  {
    id: 'focus-starter',
    title: 'Focus Starter',
    description: 'Took the first step to reflect on digital habits with Gemini.',
    icon: 'Sparkles',
    unlocked: true,
    unlockedAt: 'Aug 23'
  },
  {
    id: 'intentional-user',
    title: 'Intentional User',
    description: 'Completed 3 mindful daily challenges in a single week.',
    icon: 'Compass',
    unlocked: true,
    unlockedAt: 'Today'
  }
];

export const INITIAL_SAVED_REFLECTIONS: { reflection: AIReflection; challenge: DailyChallenge; date: string }[] = [
  {
    date: 'Yesterday (Aug 28)',
    reflection: {
      observation: 'YouTube and Instagram accounted for 2h 40m, primarily between 21:30 and midnight.',
      possiblePattern: 'Late-night video streaming might be serving as a passive decompression habit after work.',
      reflection: 'Notice how your eyes and mind feel right before opening video apps late at night.',
      focusArea: 'Gentle screen boundary 30 minutes before sleep.'
    },
    challenge: {
      id: 'prev-1',
      title: '15-Minute Audio Wind-Down',
      description: 'Place phone face down across the room and listen to an album or podcast episode with eyes closed.',
      durationMinutes: 15,
      difficulty: 'Gentle',
      alternativeActivities: ['Listen to instrumental album', 'Prepare clothes for tomorrow', 'Stretch quietly'],
      focusPoints: 30,
      reason: 'Helps transition the mind away from visual stimulation before rest.',
      status: 'completed',
      completedAt: 'Aug 28, 22:45'
    }
  },
  {
    date: 'Tuesday (Aug 26)',
    reflection: {
      observation: 'Frequent short pickups (under 2 minutes each) occurred in 15 distinct bursts during the afternoon.',
      possiblePattern: 'Quick app switching during transitions between work tasks could reflect momentary cognitive pauses.',
      reflection: 'Short check-ins often feel automatic rather than deliberate.',
      focusArea: 'Taking one conscious breath before unlocking the screen.'
    },
    challenge: {
      id: 'prev-2',
      title: 'One-Breath Unlock Experiment',
      description: 'Whenever you reach for your device today, pause for one deep breath and ask yourself what you want to do.',
      durationMinutes: 10,
      difficulty: 'Easy',
      alternativeActivities: ['Take a sip of water', 'Look out the window for 20 seconds', 'Stretch wrists'],
      focusPoints: 30,
      reason: 'Builds a micro-moment of intentionality before habit kicks in.',
      status: 'completed',
      completedAt: 'Aug 26, 17:10'
    }
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  goal: 'Reduce unnecessary evening scrolling',
  customGoal: undefined,
  preferredOfflineActivities: [
    'Reading',
    'Music',
    'Walking',
    'Relaxing',
  ],
  preferredDurationMinutes: 20,
  preferredDifficulty: 'Balanced',
  lifetimeStats: {
    focusPoints: 320,
    challengesCompleted: 8,
    bestImprovement: 'Evening usage (-36m)',
  },
  notificationsEnabled: true,
  challengeRemindersEnabled: true,
  reduceMotion: false,
};
