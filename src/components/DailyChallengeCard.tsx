import React, { useState } from 'react';
import { DailyChallenge } from '../types';
import { Award, Clock, CheckCircle2, HeartHandshake, Play, ArrowLeft } from 'lucide-react';
import { MoonIllustration, BookIllustration, HeadphonesIllustration } from './AbstractIllustrations';

interface DailyChallengeCardProps {
  challenge: DailyChallenge | null;
  onStartChallenge: () => void;
  onCompleteChallenge: (result: 'completed' | 'attempted') => void;
  onBackToReflection: () => void;
  isCompletedToday: boolean;
}

export const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({
  challenge,
  onStartChallenge,
  onCompleteChallenge,
  onBackToReflection,
  isCompletedToday,
}) => {
  const [selectedActivity, setSelectedActivity] = useState<number | null>(0);

  if (!challenge) return null;

  const isPending = challenge.status === 'pending';
  const isStarted = challenge.status === 'started';
  const isFinished = challenge.status === 'completed' || challenge.status === 'attempted';

  return (
    <div className="space-y-4 pt-1 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#B54708]">
            Today's Challenge
          </span>
          <h2 className="text-[22px] font-bold text-[#101828] tracking-[-0.4px] leading-[1.25]">
            One small experiment
          </h2>
        </div>

        <button
          onClick={onBackToReflection}
          className="text-[12px] font-medium text-[#667085] hover:text-[#101828] flex items-center gap-1 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Reflection</span>
        </button>
      </div>

      {/* Main Challenge Card */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 sm:p-6 border border-[#EAECF0] shadow-[0_4px_24px_rgba(16,24,40,0.03)] space-y-4">
        {/* Badges & Meta row */}
        <div className="flex items-center justify-between text-[12px]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-[#FFFAEB] text-[#B54708] font-semibold border border-[#FEDF89] flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#D97706]" />
              <span>{challenge.durationMinutes} min</span>
            </span>

            <span className="px-2.5 py-1 rounded-full bg-[#F2F4F7] text-[#344054] font-medium border border-[#EAECF0]">
              {challenge.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF3] text-[#027A48] font-semibold border border-[#ABEFC6]">
            <Award className="w-3.5 h-3.5 text-[#12B76A]" />
            <span>+{challenge.focusPoints} Focus Points</span>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-[17px] sm:text-[19px] font-bold text-[#101828] leading-[1.3] tracking-[-0.3px]">
            “{challenge.title}”
          </h3>
          <p className="text-[14px] font-medium text-[#344054] mt-2 leading-[1.55]">
            {challenge.description}
          </p>
        </div>

        {/* Reason / Link to usage */}
        {challenge.reason && (
          <div className="bg-[#F8F9FA] rounded-2xl p-3.5 border border-[#EAECF0] text-[12px] text-[#344054] leading-[1.45]">
            <span className="font-bold text-[#101828]">Why this experiment: </span>
            {challenge.reason}
          </div>
        )}

        {/* Alternative Activities ("Instead, choose one:") */}
        {challenge.alternativeActivities && challenge.alternativeActivities.length > 0 && (
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-[#667085] uppercase tracking-wider block mb-2">
              Instead, choose one activity:
            </span>

            <div className="space-y-2">
              {challenge.alternativeActivities.map((activity, idx) => {
                const isSelected = selectedActivity === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedActivity(idx)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#F9FAFB] border-[#101828] shadow-2xs'
                        : 'bg-[#FFFFFF] border-[#EAECF0] hover:bg-[#F8F9FA]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-[#101828] bg-[#101828] text-white'
                            : 'border-[#D0D5DD] bg-white'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="text-[13px] font-semibold text-[#101828]">
                        {activity}
                      </span>
                    </div>

                    {/* Minimal icon hints */}
                    {idx === 0 && <MoonIllustration className="w-6 h-6 opacity-60" />}
                    {idx === 1 && <BookIllustration className="w-6 h-6 opacity-60" />}
                    {idx === 2 && <HeadphonesIllustration className="w-6 h-6 opacity-60" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* State Banners & Action Buttons */}
        {isFinished ? (
          <div className="bg-[#ECFDF3] rounded-2xl p-4 border border-[#ABEFC6] text-center space-y-1.5 pt-4">
            <div className="w-10 h-10 rounded-full bg-[#D1FADF] text-[#027A48] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-[15px] font-bold text-[#027A48]">
              {challenge.status === 'completed' ? 'Challenge Completed!' : 'Mindful Effort Recorded'}
            </h4>
            <p className="text-[12px] text-[#027A48] font-medium">
              +{challenge.focusPoints} Focus Points added to your weekly mindful balance.
            </p>
            <p className="text-[11px] text-[#05603A] italic pt-1">
              “We reward intentional time away from the screen — not time spent inside the app.”
            </p>
          </div>
        ) : isStarted ? (
          <div className="space-y-3 pt-2">
            <div className="bg-[#FFFAEB] rounded-2xl p-3 border border-[#FEDF89] text-center">
              <span className="text-[12px] font-bold text-[#B54708] block">
                Challenge is active tonight
              </span>
              <p className="text-[11px] text-[#B54708] font-medium mt-0.5">
                (For demo purposes, you can complete right now or mark that you tried)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                id="btn-complete-challenge"
                onClick={() => onCompleteChallenge('completed')}
                className="py-3.5 px-4 rounded-2xl bg-[#101828] hover:bg-[#1D2939] text-[#FFFFFF] font-bold text-[13px] shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-[#75E0A7]" />
                <span>Complete challenge</span>
              </button>

              <button
                id="btn-attempted-challenge"
                onClick={() => onCompleteChallenge('attempted')}
                className="py-3.5 px-4 rounded-2xl bg-[#FFFFFF] hover:bg-[#F2F4F7] text-[#344054] font-bold text-[13px] border border-[#D0D5DD] shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4 text-[#667085]" />
                <span>I tried</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-2">
            <button
              id="btn-start-challenge"
              onClick={onStartChallenge}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#101828] hover:bg-[#1D2939] text-[#FFFFFF] font-bold text-[14px] shadow-[0_4px_16px_rgba(16,24,40,0.15)] flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-[#FDB022]" />
              <span>Start challenge</span>
            </button>
          </div>
        )}
      </div>

      {/* Non-judgmental philosophy reminder */}
      <div className="text-center px-4 py-2">
        <p className="text-[12px] font-medium text-[#98A2B3] leading-relaxed">
          Small, regular experiments create lasting awareness without rigid restrictions.
        </p>
      </div>
    </div>
  );
};
