import React, { useState, useEffect } from 'react';
import {
  DayScreenTime,
  WeeklyData,
  Badge,
  AIReflection,
  DailyChallenge,
  WeeklyInsight,
  UserProfile,
} from './types';
import {
  INITIAL_PRESETS,
  INITIAL_WEEKLY_DATA,
  INITIAL_BADGES,
  INITIAL_SAVED_REFLECTIONS,
  INITIAL_USER_PROFILE,
} from './data/mockData';
import { Header } from './components/Header';
import { Navigation, NavTab } from './components/Navigation';
import { UsageAnalysisView } from './components/UsageAnalysisView';
import { AIReflectionCard } from './components/AIReflectionCard';
import { DailyChallengeCard } from './components/DailyChallengeCard';
import { ActiveChallengeTimer } from './components/ActiveChallengeTimer';
import { MicroReflectionModal } from './components/MicroReflectionModal';
import { ChallengeRewardView } from './components/ChallengeRewardView';
import { WeeklyProgressView } from './components/WeeklyProgressView';
import { InsightsArchiveView } from './components/InsightsArchiveView';
import { ProfileView } from './components/ProfileView';
import { DemoPresetModal } from './components/DemoPresetModal';
import { ResponsibleAIModal } from './components/ResponsibleAIModal';
import { OnboardingFlow } from './components/OnboardingFlow';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Onboarding state
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean>(() => {
    const saved = localStorage.getItem('focus_onboarding_completed');
    return saved === 'true';
  });

  // Main Navigation Tab (Always opens on 'today' when onboarding finishes)
  const [currentTab, setCurrentTab] = useState<NavTab>('today');

  // Today Flow Sub-steps: 'usage' -> 'reflection' -> 'challenge' -> 'timer' -> 'micro_reflection' -> 'reward'
  const [todayStep, setTodayStep] = useState<
    'usage' | 'reflection' | 'challenge' | 'timer' | 'micro_reflection' | 'reward'
  >('usage');

  // Active Screen Time Dataset (Defaults to "Typical Evening Social Day")
  const [screenTimeData, setScreenTimeData] = useState<DayScreenTime>(INITIAL_PRESETS[0]);

  // AI Generated Entities
  const [reflection, setReflection] = useState<AIReflection | null>(null);
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);
  const [weeklyInsight, setWeeklyInsight] = useState<WeeklyInsight | null>(null);

  // Micro Reflection state
  const [microReflectionData, setMicroReflectionData] = useState<{
    beforeUrge: number;
    afterUrge: number;
    note: string;
    insightText: string;
    earnedPoints: number;
  }>({
    beforeUrge: 7,
    afterUrge: 3,
    note: '',
    insightText:
      "Your urge to scroll decreased from 7 to 3 during this experiment. One attempt isn't enough to establish causation, but a short offline transition may be worth exploring again.",
    earnedPoints: 40,
  });

  // Weekly & Gamification State
  const [weeklyData, setWeeklyData] = useState<WeeklyData>(INITIAL_WEEKLY_DATA);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [savedReflections, setSavedReflections] = useState(INITIAL_SAVED_REFLECTIONS);
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('focus_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_USER_PROFILE;
      }
    }
    return INITIAL_USER_PROFILE;
  });

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const next = { ...prev, ...updated };
      localStorage.setItem('focus_user_profile', JSON.stringify(next));
      return next;
    });
    showToast('Profile preferences updated');
  };

  // Complete onboarding
  const handleOnboardingComplete = (completedProfile: UserProfile) => {
    setUserProfile(completedProfile);
    localStorage.setItem('focus_user_profile', JSON.stringify(completedProfile));
    localStorage.setItem('focus_onboarding_completed', 'true');
    setIsOnboardingComplete(true);
    setCurrentTab('today');
    setTodayStep('usage');
    showToast('Welcome to Focus! Your daily flow is ready.');
  };

  // Replay onboarding helper
  const handleRestartOnboarding = () => {
    localStorage.removeItem('focus_onboarding_completed');
    setIsOnboardingComplete(false);
  };

  // Loading States
  const [isLoadingReflection, setIsLoadingReflection] = useState(false);
  const [isLoadingChallenge, setIsLoadingChallenge] = useState(false);
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);
  const [isLoadingMicroInsight, setIsLoadingMicroInsight] = useState(false);

  // Modals
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isResponsibleModalOpen, setIsResponsibleModalOpen] = useState(false);

  // Toast notification for calm gamification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Step 1.1 -> Step 1.2: Request Gemini Screen-Time Reflection
  const handleStartReflection = async () => {
    setIsLoadingReflection(true);
    try {
      const res = await fetch('/api/gemini/reflect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ screenTimeData, userProfile }),
      });
      const data = await res.json();
      setReflection(data);
      setTodayStep('reflection');
    } catch (err) {
      console.error('Failed to get reflection:', err);
      // Smart fallback
      setReflection({
        observation: `${screenTimeData.apps[0]?.name} and ${screenTimeData.apps[1]?.name || 'social apps'} accounted for most of your usage today, concentrated around ${screenTimeData.peakPeriod}.`,
        possiblePattern: `Late-evening short-form scrolling may be one area where phone use becomes less intentional.`,
        reflection: `Notice how your energy levels feel when you start scrolling compared to when you set the phone down.`,
        focusArea: `Create a short transition between scrolling and bedtime.`,
      });
      setTodayStep('reflection');
    } finally {
      setIsLoadingReflection(false);
    }
  };

  // Step 1.2 -> Step 1.3: Request Gemini Challenge Generation
  const handleCreateChallenge = async () => {
    if (!reflection) return;
    setIsLoadingChallenge(true);
    try {
      const res = await fetch('/api/gemini/challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ screenTimeData, reflection, userProfile }),
      });
      const data = await res.json();
      setChallenge(data);
      setTodayStep('challenge');
    } catch (err) {
      console.error('Failed to generate challenge:', err);
      const activities = userProfile?.preferredOfflineActivities?.length
        ? userProfile.preferredOfflineActivities.slice(0, 3)
        : ['Read a few pages of a book', 'Listen to calm instrumental music', 'Take a short evening walk'];
      setChallenge({
        id: `challenge-${Date.now()}`,
        title: `${userProfile?.preferredDurationMinutes || 20}-Minute Evening Reset`,
        description: 'Before bed, spend 20 minutes away from short-form video apps and choose one of your preferred offline activities.',
        durationMinutes: userProfile?.preferredDurationMinutes || 20,
        difficulty: userProfile?.preferredDifficulty || 'Balanced',
        alternativeActivities: activities,
        focusPoints: 40,
        reason: `Offers a calm offline wind-down buffer during your peak ${screenTimeData.peakPeriod} period.`,
        status: 'pending',
      });
      setTodayStep('challenge');
    } finally {
      setIsLoadingChallenge(false);
    }
  };

  // Step 1.3 -> Step 1.4: Launch Active Challenge Timer
  const handleStartChallenge = () => {
    if (!challenge) return;
    setChallenge({ ...challenge, status: 'started' });
    setTodayStep('timer');
  };

  // Step 1.4 -> Step 1.5: Trigger Micro-Reflection
  const handleTimerCompleted = () => {
    setTodayStep('micro_reflection');
  };

  const handleTimerAttempted = () => {
    setTodayStep('micro_reflection');
  };

  // Step 1.5 -> Step 1.6: Complete Micro-Reflection & Generate AI Insight
  const handleSubmitMicroReflection = async (formData: { beforeUrge: number; afterUrge: number; note: string }) => {
    if (!challenge) return;
    setIsLoadingMicroInsight(true);

    const earnedPoints = challenge.focusPoints || 40;
    let generatedInsight = `Your urge to scroll decreased from ${formData.beforeUrge} to ${formData.afterUrge} during this experiment. One attempt isn't enough to establish causation, but a short offline transition may be worth exploring again.`;

    try {
      const res = await fetch('/api/gemini/micro-reflection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challenge,
          beforeUrge: formData.beforeUrge,
          afterUrge: formData.afterUrge,
          note: formData.note,
        }),
      });
      const data = await res.json();
      if (data.insight) {
        generatedInsight = data.insight;
      }
    } catch (err) {
      console.error('Failed to get micro-reflection insight:', err);
    } finally {
      setIsLoadingMicroInsight(false);
    }

    const updatedChallenge: DailyChallenge = {
      ...challenge,
      status: 'completed',
      completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChallenge(updatedChallenge);

    // Update weekly points and challenge target
    setWeeklyData((prev) => ({
      ...prev,
      focusPointsTotal: prev.focusPointsTotal + earnedPoints,
      completedChallengesCount: Math.min(prev.weeklyGoalTarget, prev.completedChallengesCount + 1),
    }));

    // Update profile stats
    setUserProfile((prev) => ({
      ...prev,
      lifetimeStats: {
        ...prev.lifetimeStats,
        focusPoints: prev.lifetimeStats.focusPoints + earnedPoints,
        challengesCompleted: prev.lifetimeStats.challengesCompleted + 1,
      },
    }));

    // Unlock milestone badge
    setBadges((prev) =>
      prev.map((b) => (b.id === 'evening-reset' || b.id === 'intentional-user' ? { ...b, unlocked: true, unlockedAt: 'Today' } : b))
    );

    // Save reflection to archive
    if (reflection) {
      setSavedReflections((prev) => [
        {
          date: 'Today (' + screenTimeData.dateStr + ')',
          reflection,
          challenge: updatedChallenge,
        },
        ...prev,
      ]);
    }

    setMicroReflectionData({
      beforeUrge: formData.beforeUrge,
      afterUrge: formData.afterUrge,
      note: formData.note,
      insightText: generatedInsight,
      earnedPoints,
    });

    setTodayStep('reward');
    showToast(`+${earnedPoints} Focus Points awarded!`);
  };

  // Weekly Insight Generation via Gemini
  const handleGenerateWeeklyInsight = async () => {
    setIsLoadingInsight(true);
    try {
      const res = await fetch('/api/gemini/weekly-insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weeklyData }),
      });
      const data = await res.json();
      setWeeklyInsight(data);
    } catch (err) {
      console.error('Failed to generate weekly insight:', err);
      setWeeklyInsight({
        weeklyObservation: `Your evening screen time was lower on the days when you completed a challenge (${weeklyData.completedChallengesCount} mindful experiments recorded).`,
        possiblePattern: `This is only a short-term observation, but intentional evening wind-downs appear to naturally reduce passive scrolling.`,
        nextExperiment: `Next week, explore charging your phone slightly further from your nightstand.`,
      });
    } finally {
      setIsLoadingInsight(false);
    }
  };

  // Preset Switcher for Demo
  const handleSelectPreset = (preset: DayScreenTime) => {
    setScreenTimeData(preset);
    setTodayStep('usage');
    setReflection(null);
    setChallenge(null);
    showToast(`Loaded "${preset.presetName}" demo data.`);
  };

  // If user has not completed onboarding, show sequential onboarding flow
  if (!isOnboardingComplete) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] text-[#101828] flex flex-col items-center">
        <div className="w-full max-w-md min-h-screen flex flex-col bg-[#F8F9FA] relative shadow-xs border-x border-[#EAECF0]">
          <OnboardingFlow initialProfile={userProfile} onComplete={handleOnboardingComplete} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#101828] flex flex-col items-center">
      {/* Mobile-first Constrained Container */}
      <div className="w-full max-w-md min-h-screen flex flex-col bg-[#F8F9FA] relative pb-20 shadow-xs border-x border-[#EAECF0]">
        {/* Sticky Header */}
        <Header
          dateStr={screenTimeData.dateStr}
          focusPoints={weeklyData.focusPointsTotal}
          onOpenDemoPresets={() => setIsDemoModalOpen(true)}
          onOpenResponsibleAI={() => setIsResponsibleModalOpen(true)}
          isAiGenerating={isLoadingReflection || isLoadingChallenge || isLoadingInsight || isLoadingMicroInsight}
        />

        {/* Main Content Area */}
        <main className="flex-1 px-4 pt-2">
          {/* TAB 1: TODAY FLOW */}
          {currentTab === 'today' && (
            <div>
              {/* Step 1.1: Usage Analysis */}
              {todayStep === 'usage' && (
                <UsageAnalysisView
                  data={screenTimeData}
                  onStartReflection={handleStartReflection}
                  isLoadingReflection={isLoadingReflection}
                />
              )}

              {/* Step 1.2: AI Reflection Card */}
              {todayStep === 'reflection' && (
                <AIReflectionCard
                  reflection={reflection}
                  isLoadingChallenge={isLoadingChallenge}
                  onCreateChallenge={handleCreateChallenge}
                  onBackToUsage={() => setTodayStep('usage')}
                />
              )}

              {/* Step 1.3: Daily Challenge Card */}
              {todayStep === 'challenge' && (
                <DailyChallengeCard
                  challenge={challenge}
                  onStartChallenge={handleStartChallenge}
                  onCompleteChallenge={() => setTodayStep('micro_reflection')}
                  onBackToReflection={() => setTodayStep('reflection')}
                  isCompletedToday={challenge?.status === 'completed' || challenge?.status === 'attempted'}
                />
              )}

              {/* Step 1.4: Active Challenge Timer */}
              {todayStep === 'timer' && challenge && (
                <ActiveChallengeTimer
                  challenge={challenge}
                  onComplete={handleTimerCompleted}
                  onAttempted={handleTimerAttempted}
                  onClose={() => setTodayStep('challenge')}
                />
              )}

              {/* Step 1.5: Micro Reflection Modal */}
              {todayStep === 'micro_reflection' && challenge && (
                <MicroReflectionModal
                  challenge={challenge}
                  onComplete={handleSubmitMicroReflection}
                  isLoadingInsight={isLoadingMicroInsight}
                />
              )}

              {/* Step 1.6: Reward & Unlocked Insight Screen */}
              {todayStep === 'reward' && challenge && (
                <ChallengeRewardView
                  challenge={challenge}
                  beforeUrge={microReflectionData.beforeUrge}
                  afterUrge={microReflectionData.afterUrge}
                  userNote={microReflectionData.note}
                  insightText={microReflectionData.insightText}
                  earnedPoints={microReflectionData.earnedPoints}
                  onViewProgress={() => {
                    setCurrentTab('progress');
                    setTodayStep('usage');
                  }}
                  onDoneToday={() => setTodayStep('usage')}
                />
              )}
            </div>
          )}

          {/* TAB 2: WEEKLY PROGRESS */}
          {currentTab === 'progress' && (
            <WeeklyProgressView
              weeklyData={weeklyData}
              badges={badges}
              weeklyInsight={weeklyInsight}
              isLoadingInsight={isLoadingInsight}
              onGenerateWeeklyInsight={handleGenerateWeeklyInsight}
              onNavigateToInsights={() => setCurrentTab('insights')}
            />
          )}

          {/* TAB 3: INSIGHTS & PATTERNS */}
          {currentTab === 'insights' && (
            <InsightsArchiveView
              savedReflections={savedReflections}
              onOpenResponsibleAI={() => setIsResponsibleModalOpen(true)}
            />
          )}

          {/* TAB 4: PROFILE */}
          {currentTab === 'profile' && (
            <div className="space-y-4">
              <ProfileView
                profile={userProfile}
                onUpdateProfile={handleUpdateProfile}
                badges={badges}
                weeklyData={weeklyData}
                onOpenResponsibleAI={() => setIsResponsibleModalOpen(true)}
              />

              {/* Replay Onboarding Option */}
              <div className="px-1 pb-6">
                <button
                  onClick={handleRestartOnboarding}
                  className="w-full py-2.5 rounded-2xl bg-[#FFFFFF] border border-[#EAECF0] text-[12px] font-semibold text-[#667085] hover:text-[#101828] hover:bg-[#F8F9FA] transition-colors cursor-pointer"
                >
                  Restart Onboarding Flow (Demo)
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Fixed Bottom Navigation (Always 4 persistent tabs) */}
        <Navigation currentTab={currentTab} onSelectTab={(tab) => setCurrentTab(tab)} />

        {/* Toast Notification Banner */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-20 left-4 right-4 max-w-md mx-auto z-50 pointer-events-none"
            >
              <div className="bg-[#101828] text-[#FFFFFF] text-[12px] py-2.5 px-4 rounded-2xl shadow-lg border border-[#1D2939] flex items-center justify-center text-center font-semibold">
                {toastMessage}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Demo Data Preset Switcher Modal */}
        <DemoPresetModal
          isOpen={isDemoModalOpen}
          onClose={() => setIsDemoModalOpen(false)}
          currentPresetId={screenTimeData.id}
          onSelectPreset={handleSelectPreset}
        />

        {/* Responsible AI & Privacy Modal */}
        <ResponsibleAIModal
          isOpen={isResponsibleModalOpen}
          onClose={() => setIsResponsibleModalOpen(false)}
        />
      </div>
    </div>
  );
}
