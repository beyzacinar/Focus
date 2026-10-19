import React from 'react';
import { DailyChallenge } from '../types';
import { Award, ArrowRight, Sparkles, TrendingDown, Moon, CheckCircle2 } from 'lucide-react';
import { PlantSproutIllustration } from './AbstractIllustrations';

interface ChallengeRewardViewProps {
  challenge: DailyChallenge;
  beforeUrge: number;
  afterUrge: number;
  userNote?: string;
  insightText: string;
  earnedPoints: number;
  onViewProgress: () => void;
  onDoneToday: () => void;
}

export const ChallengeRewardView: React.FC<ChallengeRewardViewProps> = ({
  challenge,
  beforeUrge,
  afterUrge,
  insightText,
  earnedPoints,
  onViewProgress,
  onDoneToday,
}) => {
  const urgeDecreased = beforeUrge > afterUrge;

  return (
    <div className="space-y-4 pt-1 pb-4">
      {/* Main Reward Card */}
      <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-7 border border-[#EAECF0] shadow-[0_4px_24px_rgba(16,24,40,0.03)] text-center space-y-5">
        {/* Top Graphic */}
        <div className="w-20 h-20 rounded-3xl bg-[#ECFDF3] border border-[#ABEFC6] mx-auto flex items-center justify-center shadow-2xs">
          <PlantSproutIllustration className="w-14 h-14" />
        </div>

        <div className="space-y-1">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#027A48]">
            Experiment Complete
          </span>
          <h2 className="text-[24px] font-bold text-[#101828] tracking-[-0.5px] leading-[1.2]">
            Insight unlocked!
          </h2>
        </div>

        {/* Urge Change Meter */}
        <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-[#EAECF0] flex items-center justify-between">
          <span className="text-[12px] font-semibold text-[#667085]">Urge to scroll</span>
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-bold text-[#5925DC] bg-[#F4F3FF] px-2 py-0.5 rounded-lg border border-[#D9D6FE]">
              {beforeUrge}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#98A2B3]" />
            <span className="text-[13px] font-bold text-[#027A48] bg-[#ECFDF3] px-2 py-0.5 rounded-lg border border-[#ABEFC6]">
              {afterUrge}
            </span>
            {urgeDecreased && (
              <span className="text-[11px] font-bold text-[#027A48] flex items-center gap-0.5 ml-1">
                <TrendingDown className="w-3 h-3" />
                (-{beforeUrge - afterUrge})
              </span>
            )}
          </div>
        </div>

        {/* Dynamic AI Insight Box */}
        <div className="bg-[#FFFFFF] rounded-2xl p-4 border border-[#EAECF0] text-left space-y-2 shadow-2xs">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5925DC] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#7A5AF8]" />
            <span>AI Observation</span>
          </div>
          <p className="text-[13px] font-medium text-[#344054] leading-[1.55] italic">
            “{insightText}”
          </p>
        </div>

        {/* Rewards Row */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {/* Points */}
          <div className="p-3.5 rounded-2xl bg-[#ECFDF3] border border-[#ABEFC6] text-left space-y-1">
            <span className="text-[11px] uppercase font-bold text-[#027A48] tracking-wider block">
              Focus Points
            </span>
            <div className="flex items-center gap-1 text-[18px] font-bold text-[#027A48]">
              <Award className="w-4.5 h-4.5 text-[#12B76A]" />
              <span>+{earnedPoints} pts</span>
            </div>
          </div>

          {/* Milestone */}
          <div className="p-3.5 rounded-2xl bg-[#F4F3FF] border border-[#D9D6FE] text-left space-y-1">
            <span className="text-[11px] uppercase font-bold text-[#5925DC] tracking-wider block">
              Milestone
            </span>
            <div className="flex items-center gap-1 text-[13px] font-bold text-[#5925DC]">
              <Moon className="w-3.5 h-3.5 text-[#7A5AF8]" />
              <span className="truncate">{challenge.title.replace(/^\d+-Minute\s*/i, '') || 'Evening Reset'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            id="btn-view-progress-from-reward"
            onClick={onViewProgress}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#101828] hover:bg-[#1D2939] text-[#FFFFFF] font-bold text-[14px] shadow-[0_4px_16px_rgba(16,24,40,0.15)] flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>View Progress</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onDoneToday}
            className="w-full py-2.5 text-[13px] font-semibold text-[#667085] hover:text-[#101828] transition-colors cursor-pointer"
          >
            Return to Today Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
