import React, { useState, useEffect } from 'react';
import { DailyChallenge } from '../types';
import { Play, Pause, X, CheckCircle2, HeartHandshake, Sparkles, FastForward } from 'lucide-react';
import { MoonIllustration } from './AbstractIllustrations';

interface ActiveChallengeTimerProps {
  challenge: DailyChallenge;
  onComplete: () => void;
  onAttempted: () => void;
  onClose: () => void;
}

export const ActiveChallengeTimer: React.FC<ActiveChallengeTimerProps> = ({
  challenge,
  onComplete,
  onAttempted,
  onClose,
}) => {
  const totalSeconds = (challenge.durationMinutes || 20) * 60;
  const [secondsLeft, setSecondsLeft] = useState<number>(totalSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const progressPct = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  // Demo speedup helper
  const handleFastForward = () => {
    setSecondsLeft(0);
    setIsRunning(false);
  };

  return (
    <div className="space-y-4 pt-1 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#12B76A] animate-pulse" />
          <h2 className="text-[20px] font-bold text-[#101828] tracking-[-0.4px]">
            {challenge.title}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-[#FFFFFF] border border-[#EAECF0] flex items-center justify-center text-[#667085] hover:text-[#101828] cursor-pointer shadow-2xs transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Timer Container */}
      <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 border border-[#EAECF0] shadow-[0_4px_24px_rgba(16,24,40,0.03)] text-center space-y-6">
        <div className="space-y-1">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#027A48]">
            Your experiment is active
          </span>
          <p className="text-[13px] font-medium text-[#667085]">
            Put your phone face down or engage in your chosen offline activity.
          </p>
        </div>

        {/* Circular Countdown Display */}
        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
            {/* Background track */}
            <circle
              cx="80"
              cy="80"
              r="70"
              className="stroke-[#F2F4F7]"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Active progress */}
            <circle
              cx="80"
              cy="80"
              r="70"
              className="stroke-[#12B76A] transition-all duration-1000"
              strokeWidth="8"
              strokeDasharray={440}
              strokeDashoffset={440 - (440 * progressPct) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-[36px] font-bold text-[#101828] tracking-[-0.6px] font-mono leading-none">
              {formattedTime}
            </span>
            <span className="text-[11px] font-semibold text-[#667085] uppercase tracking-wider mt-1.5">
              {secondsLeft === 0 ? 'Time completed' : 'Time left'}
            </span>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="mt-2.5 p-2 rounded-full bg-[#F8F9FA] hover:bg-[#F2F4F7] text-[#101828] border border-[#EAECF0] transition-colors cursor-pointer"
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
          </div>
        </div>

        {/* Stay Present Text */}
        <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-[#EAECF0] space-y-1">
          <span className="text-[13px] font-bold text-[#101828] block">
            Stay present
          </span>
          <p className="text-[12px] font-medium text-[#667085] leading-relaxed">
            You're building a better, calmer relationship with your phone.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-2.5 pt-2">
          <button
            id="btn-timer-completed"
            onClick={onComplete}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#101828] hover:bg-[#1D2939] text-[#FFFFFF] font-bold text-[14px] shadow-[0_4px_16px_rgba(16,24,40,0.15)] flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-[#75E0A7]" />
            <span>I completed it</span>
          </button>

          <button
            id="btn-timer-tried"
            onClick={onAttempted}
            className="w-full py-3 px-4 rounded-2xl bg-[#FFFFFF] hover:bg-[#F8F9FA] text-[#475467] font-semibold text-[13px] border border-[#D0D5DD] transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <HeartHandshake className="w-4 h-4 text-[#667085]" />
            <span>I tried (partial)</span>
          </button>
        </div>

        {/* Demo Fast Forward */}
        <div className="pt-1">
          <button
            onClick={handleFastForward}
            className="text-[11px] text-[#98A2B3] hover:text-[#667085] font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
          >
            <FastForward className="w-3 h-3" />
            <span>Fast-forward timer (Prototype test)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
