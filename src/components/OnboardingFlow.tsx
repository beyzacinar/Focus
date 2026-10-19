import React, { useState } from 'react';
import { UserProfile } from '../types';
import { INITIAL_USER_PROFILE } from '../data/mockData';
import {
  Sparkles,
  ShieldCheck,
  Check,
  Clock,
  ArrowRight,
  BookOpen,
  Footprints,
  Dumbbell,
  Music,
  Users,
  Palette,
  GraduationCap,
  Utensils,
  PenTool,
  Coffee,
  Trees,
  Smartphone,
  ChevronRight,
} from 'lucide-react';
import { SunIllustration, ZenStonesIllustration, PlantSproutIllustration } from './AbstractIllustrations';

interface OnboardingFlowProps {
  initialProfile?: UserProfile;
  onComplete: (completedProfile: UserProfile) => void;
}

const GOAL_OPTIONS = [
  'Reduce evening scrolling',
  'Use my phone less before bed',
  'Improve focus while studying',
  'Reduce short-form video usage',
  'Take more screen-free breaks',
  'Build a healthier morning routine',
  'Custom goal',
];

const ACTIVITY_OPTIONS: { name: string; icon: React.FC<{ className?: string }> }[] = [
  { name: 'Reading', icon: BookOpen },
  { name: 'Walking', icon: Footprints },
  { name: 'Exercise', icon: Dumbbell },
  { name: 'Music', icon: Music },
  { name: 'Spending time with friends', icon: Users },
  { name: 'Creative hobbies', icon: Palette },
  { name: 'Studying', icon: GraduationCap },
  { name: 'Cooking', icon: Utensils },
  { name: 'Journaling', icon: PenTool },
  { name: 'Relaxing', icon: Coffee },
  { name: 'Outdoor activities', icon: Trees },
];

const DURATION_OPTIONS = [5, 10, 20, 30];
const DIFFICULTY_OPTIONS: ('Easy' | 'Balanced' | 'Challenging')[] = ['Easy', 'Balanced', 'Challenging'];

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ initialProfile = INITIAL_USER_PROFILE, onComplete }) => {
  // Step: 0 -> Welcome, 1 -> Connect, 2 -> Goal, 3 -> Activities, 4 -> Preferences, 5 -> All Set
  const [step, setStep] = useState<number>(0);

  const safeProfile = initialProfile || INITIAL_USER_PROFILE;

  // Editable Profile state during onboarding
  const [goal, setGoal] = useState<string>(safeProfile.goal || 'Reduce evening scrolling');
  const [customGoal, setCustomGoal] = useState<string>(safeProfile.customGoal || '');
  const [activities, setActivities] = useState<string[]>(
    safeProfile.preferredOfflineActivities && safeProfile.preferredOfflineActivities.length > 0
      ? safeProfile.preferredOfflineActivities
      : ['Reading', 'Walking', 'Music', 'Spending time with friends']
  );
  const [duration, setDuration] = useState<number>(safeProfile.preferredDurationMinutes || 20);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Balanced' | 'Challenging'>(
    safeProfile.preferredDifficulty || 'Balanced'
  );

  const toggleActivity = (act: string) => {
    setActivities((prev) =>
      prev.includes(act) ? prev.filter((a) => a !== act) : [...prev, act]
    );
  };

  const handleFinishOnboarding = () => {
    const finalProfile: UserProfile = {
      ...safeProfile,
      goal: goal === 'Custom goal' && customGoal.trim() ? 'Custom goal' : goal,
      customGoal: goal === 'Custom goal' ? customGoal : undefined,
      preferredOfflineActivities: activities.length > 0 ? activities : ['Reading', 'Walking', 'Music'],
      preferredDurationMinutes: duration,
      preferredDifficulty: difficulty,
    };
    onComplete(finalProfile);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#101828] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#FFFFFF] rounded-3xl p-6 sm:p-7 border border-[#EAECF0] shadow-[0_8px_32px_rgba(16,24,40,0.06)] space-y-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step
                    ? 'w-6 bg-[#101828]'
                    : s < step
                    ? 'w-2 bg-[#12B76A]'
                    : 'w-2 bg-[#EAECF0]'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-semibold text-[#98A2B3]">
            Step {step + 1} of 6
          </span>
        </div>

        {/* STEP 0: WELCOME TO FOCUS */}
        {step === 0 && (
          <div className="space-y-6 text-center py-4">
            <div className="w-24 h-24 rounded-3xl bg-[#F8F9FA] border border-[#EAECF0] mx-auto flex items-center justify-center shadow-2xs">
              <SunIllustration className="w-16 h-16" />
            </div>

            <div className="space-y-2">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#027A48]">
                Digital Well-being
              </span>
              <h1 className="text-[28px] font-bold text-[#101828] leading-[1.2] tracking-[-0.8px]">
                Welcome to Focus
              </h1>
              <p className="text-[15px] font-medium text-[#667085] leading-[1.55] max-w-xs mx-auto">
                Understand your screen habits and build healthier digital routines.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#EAECF0] text-left space-y-1.5">
              <div className="flex items-center gap-2 text-[12px] font-bold text-[#101828]">
                <Sparkles className="w-4 h-4 text-[#F79009]" />
                <span>Our calm philosophy</span>
              </div>
              <p className="text-[12px] font-medium text-[#667085] leading-relaxed">
                We reward intentional moments away from your screen—never streak pressure or restrictive locks.
              </p>
            </div>

            <button
              id="btn-onboarding-start"
              onClick={() => setStep(1)}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#101828] hover:bg-[#1D2939] text-[#FFFFFF] font-bold text-[14px] shadow-[0_4px_16px_rgba(16,24,40,0.15)] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 1: CONNECT YOUR SCREEN TIME */}
        {step === 1 && (
          <div className="space-y-6 text-center py-2">
            <div className="w-24 h-24 rounded-3xl bg-[#F4F3FF] border border-[#E0EAFF] mx-auto flex items-center justify-center text-[#5925DC] shadow-2xs">
              <div className="flex items-end gap-1.5">
                <div className="w-2.5 h-7 rounded bg-[#7A5AF8]" />
                <div className="w-2.5 h-12 rounded bg-[#5925DC]" />
                <div className="w-2.5 h-9 rounded bg-[#9B8AFB]" />
                <div className="w-2.5 h-5 rounded bg-[#D9D6FE]" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#5925DC]">
                Device Metrics
              </span>
              <h2 className="text-[24px] font-bold text-[#101828] leading-[1.25] tracking-[-0.5px]">
                Connect Your Screen Time
              </h2>
              <p className="text-[14px] font-medium text-[#667085] leading-[1.55]">
                Focus uses your screen time data to generate personalized reflections and challenges.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#ECFDF3] border border-[#ABEFC6] text-left flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#027A48] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[12px] font-bold text-[#027A48] block">
                  Private & Non-Judgmental
                </span>
                <p className="text-[12px] text-[#027A48] font-medium leading-relaxed">
                  Only aggregated usage duration and app categories are processed. We never access message contents, browsing history, or personal identifiers.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setStep(0)}
                className="py-3.5 px-4 rounded-2xl bg-[#F8F9FA] hover:bg-[#F2F4F7] text-[#667085] font-semibold text-[13px] border border-[#EAECF0] transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                id="btn-onboarding-grant"
                onClick={() => setStep(2)}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-[#101828] hover:bg-[#1D2939] text-[#FFFFFF] font-bold text-[14px] shadow-[0_4px_16px_rgba(16,24,40,0.15)] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#75E0A7]" />
                <span>Grant Access</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: WHAT IS YOUR MAIN GOAL? */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B54708]">
                Intention
              </span>
              <h2 className="text-[22px] font-bold text-[#101828] leading-[1.25] tracking-[-0.4px]">
                What is your main goal?
              </h2>
              <p className="text-[13px] font-medium text-[#667085]">
                You can change this anytime. Gemini tailors reflections to your intent.
              </p>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {GOAL_OPTIONS.map((g) => {
                const isSelected = goal === g;
                return (
                  <div
                    key={g}
                    onClick={() => setGoal(g)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#F9FAFB] border-[#101828] shadow-2xs font-bold text-[#101828]'
                        : 'bg-[#FFFFFF] border-[#EAECF0] text-[#475467] hover:bg-[#F8F9FA]'
                    }`}
                  >
                    <span className="text-[13px]">{g}</span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-[#101828] bg-[#101828] text-white'
                          : 'border-[#D0D5DD] bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {goal === 'Custom goal' && (
              <input
                type="text"
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                placeholder="Enter your personal well-being focus..."
                className="w-full text-[13px] p-3 rounded-xl border border-[#D0D5DD] bg-white text-[#101828] focus:outline-none focus:ring-1 focus:ring-[#101828]"
              />
            )}

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setStep(1)}
                className="py-3.5 px-4 rounded-2xl bg-[#F8F9FA] hover:bg-[#F2F4F7] text-[#667085] font-semibold text-[13px] border border-[#EAECF0] transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                id="btn-onboarding-goal-continue"
                onClick={() => setStep(3)}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-[#101828] hover:bg-[#1D2939] text-[#FFFFFF] font-bold text-[14px] shadow-[0_4px_16px_rgba(16,24,40,0.15)] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PICK ACTIVITIES YOU ENJOY */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#027A48]">
                Alternatives
              </span>
              <h2 className="text-[22px] font-bold text-[#101828] leading-[1.25] tracking-[-0.4px]">
                Pick activities you enjoy
              </h2>
              <p className="text-[13px] font-medium text-[#667085]">
                We'll suggest these as alternatives in your daily challenges.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto py-1">
              {ACTIVITY_OPTIONS.map((item) => {
                const isSelected = activities.includes(item.name);
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => toggleActivity(item.name)}
                    className={`px-3 py-2 rounded-xl text-[12px] font-medium transition-all cursor-pointer flex items-center gap-2 border ${
                      isSelected
                        ? 'bg-[#101828] text-white border-[#101828] font-bold shadow-2xs'
                        : 'bg-[#F8F9FA] text-[#344054] border-[#EAECF0] hover:bg-[#F2F4F7]'
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-[#FDB022]' : 'text-[#667085]'}`} />
                    <span>{item.name}</span>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setStep(2)}
                className="py-3.5 px-4 rounded-2xl bg-[#F8F9FA] hover:bg-[#F2F4F7] text-[#667085] font-semibold text-[13px] border border-[#EAECF0] transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                id="btn-onboarding-activities-continue"
                onClick={() => setStep(4)}
                disabled={activities.length === 0}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-[#101828] hover:bg-[#1D2939] text-[#FFFFFF] font-bold text-[14px] shadow-[0_4px_16px_rgba(16,24,40,0.15)] flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CHALLENGE PREFERENCES */}
        {step === 4 && (
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5925DC]">
                Pacing
              </span>
              <h2 className="text-[22px] font-bold text-[#101828] leading-[1.25] tracking-[-0.4px]">
                Challenge preferences
              </h2>
              <p className="text-[13px] font-medium text-[#667085]">
                We'll create the right challenges for your schedule.
              </p>
            </div>

            {/* Length */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-semibold text-[#101828]">Preferred Length</span>
                <span className="text-[#344054] font-bold">{duration} minutes</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {DURATION_OPTIONS.map((d) => {
                  const isSelected = duration === d;
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDuration(d)}
                      className={`py-2.5 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#101828] text-white border border-[#101828] shadow-2xs'
                          : 'bg-[#F8F9FA] text-[#667085] border border-[#EAECF0] hover:bg-[#F2F4F7]'
                      }`}
                    >
                      {d} min
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty */}
            <div className="space-y-2 pt-2 border-t border-[#F2F4F7]">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-semibold text-[#101828]">Preferred Difficulty</span>
                <span className="text-[#344054] font-bold">{difficulty}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {DIFFICULTY_OPTIONS.map((diff) => {
                  const isSelected = difficulty === diff;
                  return (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setDifficulty(diff)}
                      className={`py-2.5 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
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

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setStep(3)}
                className="py-3.5 px-4 rounded-2xl bg-[#F8F9FA] hover:bg-[#F2F4F7] text-[#667085] font-semibold text-[13px] border border-[#EAECF0] transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                id="btn-onboarding-finish-pref"
                onClick={() => setStep(5)}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-[#101828] hover:bg-[#1D2939] text-[#FFFFFF] font-bold text-[14px] shadow-[0_4px_16px_rgba(16,24,40,0.15)] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Finish</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: YOU'RE ALL SET! */}
        {step === 5 && (
          <div className="space-y-6 text-center py-4">
            <div className="w-24 h-24 rounded-3xl bg-[#ECFDF3] border border-[#ABEFC6] mx-auto flex items-center justify-center shadow-2xs">
              <PlantSproutIllustration className="w-16 h-16" />
            </div>

            <div className="space-y-2">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#027A48]">
                Ready
              </span>
              <h2 className="text-[28px] font-bold text-[#101828] leading-[1.2] tracking-[-0.8px]">
                You’re all set!
              </h2>
              <p className="text-[15px] font-medium text-[#667085] leading-[1.55] max-w-xs mx-auto">
                Let’s build healthier habits together.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#EAECF0] text-left space-y-2">
              <span className="text-[11px] uppercase font-semibold text-[#667085] tracking-wider block">
                Your Initial Focus
              </span>
              <p className="text-[14px] font-bold text-[#101828]">
                “{goal === 'Custom goal' && customGoal ? customGoal : goal}”
              </p>
              <p className="text-[12px] text-[#667085] font-medium">
                {activities.slice(0, 3).join(', ')} {activities.length > 3 ? `+${activities.length - 3} more` : ''}
              </p>
            </div>

            <button
              id="btn-onboarding-go-today"
              onClick={handleFinishOnboarding}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#101828] hover:bg-[#1D2939] text-[#FFFFFF] font-bold text-[14px] shadow-[0_4px_16px_rgba(16,24,40,0.15)] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Go to Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
