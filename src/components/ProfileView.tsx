import React, { useState } from 'react';
import { UserProfile, Badge, WeeklyData } from '../types';
import {
  Target,
  Sparkles,
  Award,
  ShieldCheck,
  Clock,
  Check,
  Edit3,
  ToggleLeft,
  ToggleRight,
  Moon,
  BookOpen,
  Compass
} from 'lucide-react';
import { ZenStonesIllustration } from './AbstractIllustrations';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  badges: Badge[];
  weeklyData: WeeklyData;
  onOpenResponsibleAI: () => void;
}

const PREDEFINED_GOALS = [
  'Reduce unnecessary evening scrolling',
  'Reduce social media use',
  'Use my phone less before bed',
  'Improve focus while studying',
  'Reduce short-form video usage',
  'Take more screen-free breaks',
  'Build a healthier morning routine',
  'Custom goal',
];

const AVAILABLE_ACTIVITIES = [
  'Reading',
  'Walking',
  'Exercise',
  'Music',
  'Spending time with friends',
  'Creative hobbies',
  'Studying',
  'Cooking',
  'Journaling',
  'Relaxing',
  'Outdoor activities',
];

const DURATION_OPTIONS = [5, 10, 20, 30];
const DIFFICULTY_OPTIONS: ('Easy' | 'Balanced' | 'Challenging')[] = ['Easy', 'Balanced', 'Challenging'];

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onUpdateProfile,
  badges,
  weeklyData,
  onOpenResponsibleAI,
}) => {
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(profile?.goal || 'Reduce unnecessary evening scrolling');
  const [customGoalText, setCustomGoalText] = useState(profile?.customGoal || '');

  const safeActivities = profile?.preferredOfflineActivities || [
    'Reading',
    'Music',
    'Walking',
    'Creative hobbies',
  ];

  const handleSaveGoal = () => {
    onUpdateProfile({
      goal: selectedGoal,
      customGoal: selectedGoal === 'Custom goal' ? customGoalText : undefined,
    });
    setIsEditingGoal(false);
  };

  const toggleActivity = (activity: string) => {
    const current = safeActivities;
    const exists = current.includes(activity);
    const updated = exists
      ? current.filter((a) => a !== activity)
      : [...current, activity];
    if (updated.length > 0) {
      onUpdateProfile({ preferredOfflineActivities: updated });
    }
  };

  return (
    <div className="space-y-4 pt-1 pb-16">
      {/* 1. PROFILE HEADER */}
      <div className="pt-2 px-1">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[22px] font-bold text-[#101828] tracking-[-0.4px] leading-[1.25]">Your Focus Profile</h2>
            <p className="text-[14px] font-medium text-[#667085] mt-0.5 leading-[1.55]">
              Manage your personal digital well-being preferences.
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#F8F9FA] border border-[#EAECF0] flex items-center justify-center shadow-2xs">
            <ZenStonesIllustration className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* 2. MY GOAL */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#EAECF0] shadow-[0_4px_20px_rgba(16,24,40,0.02)] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#F2F4F7] flex items-center justify-center text-[#344054]">
              <Target className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-semibold text-[#667085] uppercase tracking-wider">
              My Goal
            </span>
          </div>
          <button
            onClick={() => setIsEditingGoal(!isEditingGoal)}
            className="text-[12px] font-semibold text-[#344054] hover:text-[#101828] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditingGoal ? 'Cancel' : 'Change Goal'}</span>
          </button>
        </div>

        {!isEditingGoal ? (
          <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#EAECF0] space-y-1">
            <span className="text-[11px] uppercase font-semibold tracking-wider text-[#667085] block">
              Current focus
            </span>
            <p className="text-[17px] font-bold text-[#101828] leading-[1.3] tracking-[-0.3px]">
              “{profile?.goal === 'Custom goal' && profile?.customGoal ? profile.customGoal : profile?.goal || 'Reduce unnecessary evening scrolling'}”
            </p>
            <p className="text-[12px] font-medium text-[#667085] pt-1">
              Gemini tailors your daily reflection and experiments to this specific intent.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5 pt-1">
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {PREDEFINED_GOALS.map((g) => {
                const isSelected = selectedGoal === g;
                return (
                  <div
                    key={g}
                    onClick={() => setSelectedGoal(g)}
                    className={`p-2.5 rounded-xl border text-[13px] font-medium cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#F9FAFB] border-[#101828] text-[#101828] shadow-2xs font-semibold'
                        : 'bg-[#FFFFFF] border-[#EAECF0] text-[#667085] hover:bg-[#F8F9FA]'
                    }`}
                  >
                    <span>{g}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#101828] stroke-[3]" />}
                  </div>
                );
              })}
            </div>

            {selectedGoal === 'Custom goal' && (
              <input
                type="text"
                value={customGoalText}
                onChange={(e) => setCustomGoalText(e.target.value)}
                placeholder="Enter your custom well-being goal..."
                className="w-full text-[13px] p-3 rounded-xl border border-[#D0D5DD] bg-white text-[#101828] focus:outline-none focus:ring-1 focus:ring-[#101828]"
              />
            )}

            <button
              onClick={handleSaveGoal}
              className="w-full py-2.5 rounded-xl bg-[#101828] hover:bg-[#1D2939] text-white text-[13px] font-bold cursor-pointer shadow-2xs transition-all"
            >
              Save Goal Preference
            </button>
          </div>
        )}
      </div>

      {/* 3. PREFERRED OFFLINE ACTIVITIES */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#EAECF0] shadow-[0_4px_20px_rgba(16,24,40,0.02)] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#F2F4F7] flex items-center justify-center text-[#344054]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-semibold text-[#667085] uppercase tracking-wider">
              Preferred Offline Activities
            </span>
          </div>
          <span className="text-[11px] text-[#667085] font-medium">Select all that apply</span>
        </div>

        <p className="text-[12px] font-medium text-[#667085] leading-relaxed">
          Gemini suggests activities you actually enjoy when generating screen-free alternatives.
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {AVAILABLE_ACTIVITIES.map((act) => {
            const isSelected = safeActivities.includes(act);
            return (
              <button
                key={act}
                onClick={() => toggleActivity(act)}
                className={`px-3 py-1.5 rounded-full text-[12px] transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#101828] text-white border border-[#101828] font-semibold shadow-2xs'
                    : 'bg-[#F8F9FA] text-[#667085] border border-[#EAECF0] hover:bg-[#F2F4F7] font-medium'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                <span>{act}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. CHALLENGE PREFERENCES */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#EAECF0] shadow-[0_4px_20px_rgba(16,24,40,0.02)] space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#F2F4F7] flex items-center justify-center text-[#344054]">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <span className="text-[11px] font-semibold text-[#667085] uppercase tracking-wider">
            Challenge Preferences
          </span>
        </div>

        {/* Preferred Length */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[13px]">
            <span className="font-semibold text-[#101828]">Preferred Challenge Length</span>
            <span className="text-[#344054] font-bold">{profile?.preferredDurationMinutes || 20} minutes</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {DURATION_OPTIONS.map((dur) => {
              const isSelected = (profile?.preferredDurationMinutes || 20) === dur;
              return (
                <button
                  key={dur}
                  onClick={() => onUpdateProfile({ preferredDurationMinutes: dur })}
                  className={`py-2 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#101828] text-white border border-[#101828] shadow-2xs'
                      : 'bg-[#F8F9FA] text-[#667085] border border-[#EAECF0] hover:bg-[#F2F4F7]'
                  }`}
                >
                  {dur} min
                </button>
              );
            })}
          </div>
        </div>

        {/* Preferred Difficulty */}
        <div className="space-y-2 pt-1 border-t border-[#F2F4F7]">
          <div className="flex justify-between items-center text-[13px] pt-1">
            <span className="font-semibold text-[#101828]">Preferred Challenge Difficulty</span>
            <span className="text-[#344054] font-bold">{profile?.preferredDifficulty || 'Balanced'}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {DIFFICULTY_OPTIONS.map((diff) => {
              const isSelected = (profile?.preferredDifficulty || 'Balanced') === diff;
              return (
                <button
                  key={diff}
                  onClick={() => onUpdateProfile({ preferredDifficulty: diff })}
                  className={`py-2 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#101828] text-white border border-[#101828] shadow-2xs'
                      : 'bg-[#F8F9FA] text-[#667085] border border-[#EAECF0] hover:bg-[#F2F4F7]'
                  }`}
                >
                  {diff}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. MY PROGRESS SUMMARY */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#EAECF0] shadow-[0_4px_20px_rgba(16,24,40,0.02)] space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-[17px] font-bold text-[#101828] leading-[1.3] tracking-[-0.3px]">Lifetime Summary</h3>
          <span className="text-[12px] font-medium text-[#667085]">Calm personal statistics</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Focus Points */}
          <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-[#EAECF0] space-y-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#027A48] block">
              Focus Points
            </span>
            <div className="text-[24px] font-bold text-[#101828] tracking-[-0.5px]">
              {profile?.lifetimeStats?.focusPoints ?? 120}
            </div>
            <span className="text-[11px] font-medium text-[#667085] block">
              Earned away from screen
            </span>
          </div>

          {/* Challenges Completed */}
          <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-[#EAECF0] space-y-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#B54708] block">
              Experiments Done
            </span>
            <div className="text-[24px] font-bold text-[#101828] tracking-[-0.5px]">
              {profile?.lifetimeStats?.challengesCompleted ?? 3}
            </div>
            <span className="text-[11px] font-medium text-[#667085] block">
              Completed challenges
            </span>
          </div>
        </div>

        {/* This week & Best improvement */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-[#EAECF0] space-y-0.5">
            <span className="text-[11px] uppercase font-semibold text-[#667085] block">
              This Week
            </span>
            <span className="text-[15px] font-bold text-[#101828]">
              {weeklyData.completedChallengesCount} / {weeklyData.weeklyGoalTarget}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-[#EAECF0] space-y-0.5">
            <span className="text-[11px] uppercase font-semibold text-[#667085] block">
              Best Improvement
            </span>
            <span className="text-[13px] font-bold text-[#101828] block truncate">
              {profile?.lifetimeStats?.bestImprovement || 'Evening social -28m'}
            </span>
          </div>
        </div>

        <p className="text-[11px] font-medium text-center text-[#98A2B3] italic pt-1">
          Statistics are private to you. We do not support leaderboards or competitive ranking.
        </p>
      </div>

      {/* 6. ACHIEVEMENTS */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#EAECF0] shadow-[0_4px_20px_rgba(16,24,40,0.02)] space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#D97706]" />
            <h3 className="text-[17px] font-bold text-[#101828] leading-[1.3] tracking-[-0.3px]">Mindful Milestones</h3>
          </div>
          <span className="text-[12px] font-medium text-[#667085]">Healthy habits</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-3 rounded-2xl border flex items-start gap-2.5 ${
                badge.unlocked
                  ? 'bg-[#F8F9FA] border-[#EAECF0]'
                  : 'bg-[#F9FAFB] border-dashed border-[#D0D5DD] opacity-60'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#101828] shadow-2xs shrink-0 mt-0.5 border border-[#EAECF0]">
                {badge.icon === 'Moon' && <Moon className="w-4 h-4 text-[#5925DC]" />}
                {badge.icon === 'BookOpen' && <BookOpen className="w-4 h-4 text-[#B54708]" />}
                {badge.icon === 'Sparkles' && <Sparkles className="w-4 h-4 text-[#D97706]" />}
                {badge.icon === 'Compass' && <Compass className="w-4 h-4 text-[#027A48]" />}
              </div>
              <div className="min-w-0">
                <span className="text-[13px] font-bold text-[#101828] block truncate">
                  {badge.title}
                </span>
                <span className="text-[11px] text-[#667085] font-medium block leading-tight mt-0.5 line-clamp-2">
                  {badge.description}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] font-medium text-[#98A2B3] pt-1">
          Badges recognize offline intentional moments — never app usage streaks or screen time.
        </p>
      </div>

      {/* 7. PRIVACY & RESPONSIBLE AI */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#EAECF0] shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#027A48]" />
          <h3 className="text-[17px] font-bold text-[#101828] leading-[1.3] tracking-[-0.3px]">
            Privacy & Responsible AI
          </h3>
        </div>

        <p className="text-[12px] font-medium text-[#667085] leading-relaxed">
          Focus processes aggregated screen metrics without personal identifiers. AI reflections offer exploratory possibilities rather than medical diagnoses.
        </p>

        <button
          onClick={onOpenResponsibleAI}
          className="w-full py-2.5 rounded-xl bg-[#F8F9FA] hover:bg-[#F2F4F7] text-[#101828] text-[13px] font-bold border border-[#EAECF0] transition-all cursor-pointer"
        >
          View Privacy & AI Standards
        </button>
      </div>

      {/* 8. SETTINGS */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#EAECF0] shadow-[0_4px_20px_rgba(16,24,40,0.02)] space-y-3">
        <h3 className="text-[17px] font-bold text-[#101828] leading-[1.3] tracking-[-0.3px]">App Preferences</h3>

        <div className="space-y-2 text-[13px]">
          {/* Notifications */}
          <div className="flex items-center justify-between py-2 border-b border-[#F2F4F7]">
            <div>
              <span className="font-semibold text-[#101828] block">Notifications</span>
              <span className="text-[11px] font-medium text-[#667085]">Receive gentle evening reflection alerts</span>
            </div>
            <button
              onClick={() => onUpdateProfile({ notificationsEnabled: !profile.notificationsEnabled })}
              className="cursor-pointer"
            >
              {profile.notificationsEnabled ? (
                <ToggleRight className="w-7 h-7 text-[#101828]" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-[#D0D5DD]" />
              )}
            </button>
          </div>

          {/* Challenge Reminders */}
          <div className="flex items-center justify-between py-2 border-b border-[#F2F4F7]">
            <div>
              <span className="font-semibold text-[#101828] block">Challenge Reminders</span>
              <span className="text-[11px] font-medium text-[#667085]">Helpful prompt before bedtime</span>
            </div>
            <button
              onClick={() => onUpdateProfile({ challengeRemindersEnabled: !profile.challengeRemindersEnabled })}
              className="cursor-pointer"
            >
              {profile.challengeRemindersEnabled ? (
                <ToggleRight className="w-7 h-7 text-[#101828]" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-[#D0D5DD]" />
              )}
            </button>
          </div>

          {/* Reduce Motion */}
          <div className="flex items-center justify-between py-2">
            <div>
              <span className="font-semibold text-[#101828] block">Reduce Motion</span>
              <span className="text-[11px] font-medium text-[#667085]">Simpler transition animations</span>
            </div>
            <button
              onClick={() => onUpdateProfile({ reduceMotion: !profile.reduceMotion })}
              className="cursor-pointer"
            >
              {profile.reduceMotion ? (
                <ToggleRight className="w-7 h-7 text-[#101828]" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-[#D0D5DD]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
