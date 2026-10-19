import React, { useState } from 'react';
import { DailyChallenge } from '../types';
import { ArrowRight, Sparkles, MessageSquare } from 'lucide-react';

interface MicroReflectionModalProps {
  challenge: DailyChallenge;
  onComplete: (data: { beforeUrge: number; afterUrge: number; note: string }) => void;
  isLoadingInsight?: boolean;
}

export const MicroReflectionModal: React.FC<MicroReflectionModalProps> = ({
  challenge,
  onComplete,
  isLoadingInsight,
}) => {
  const [beforeUrge, setBeforeUrge] = useState<number>(7);
  const [afterUrge, setAfterUrge] = useState<number>(3);
  const [note, setNote] = useState<string>('');

  const scaleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({ beforeUrge, afterUrge, note });
  };

  return (
    <div className="space-y-4 pt-1 pb-4">
      {/* Title */}
      <div className="pt-2 px-1">
        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#5925DC]">
          Reflection
        </span>
        <h2 className="text-[22px] font-bold text-[#101828] tracking-[-0.4px] leading-[1.25]">
          How did it feel?
        </h2>
        <p className="text-[14px] font-medium text-[#667085] mt-0.5 leading-[1.55]">
          Help us understand your experience (optional)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#FFFFFF] rounded-3xl p-5 sm:p-6 border border-[#EAECF0] shadow-[0_4px_24px_rgba(16,24,40,0.03)] space-y-5">
        {/* Question 1: Before Urge */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-[#101828]">
              Before the challenge, how strong was your urge to scroll?
            </span>
            <span className="text-[12px] font-bold text-[#5925DC] bg-[#F4F3FF] px-2 py-0.5 rounded-lg border border-[#D9D6FE]">
              {beforeUrge} / 10
            </span>
          </div>

          <div className="grid grid-cols-10 gap-1">
            {scaleNumbers.map((num) => {
              const isSelected = beforeUrge === num;
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => setBeforeUrge(num)}
                  className={`h-9 rounded-xl text-[12px] font-bold transition-all cursor-pointer flex items-center justify-center ${
                    isSelected
                      ? 'bg-[#101828] text-white border border-[#101828] shadow-2xs'
                      : 'bg-[#F8F9FA] text-[#667085] border border-[#EAECF0] hover:bg-[#F2F4F7]'
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>
          <div className="flex justify-between text-[10px] font-semibold text-[#98A2B3] px-1">
            <span>1 (Very low)</span>
            <span>10 (Very strong)</span>
          </div>
        </div>

        {/* Question 2: After Urge */}
        <div className="space-y-2.5 pt-3 border-t border-[#F2F4F7]">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-[#101828]">
              After the challenge, how strong is it now?
            </span>
            <span className="text-[12px] font-bold text-[#027A48] bg-[#ECFDF3] px-2 py-0.5 rounded-lg border border-[#ABEFC6]">
              {afterUrge} / 10
            </span>
          </div>

          <div className="grid grid-cols-10 gap-1">
            {scaleNumbers.map((num) => {
              const isSelected = afterUrge === num;
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => setAfterUrge(num)}
                  className={`h-9 rounded-xl text-[12px] font-bold transition-all cursor-pointer flex items-center justify-center ${
                    isSelected
                      ? 'bg-[#12B76A] text-white border border-[#12B76A] shadow-2xs'
                      : 'bg-[#F8F9FA] text-[#667085] border border-[#EAECF0] hover:bg-[#F2F4F7]'
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>
          <div className="flex justify-between text-[10px] font-semibold text-[#98A2B3] px-1">
            <span>1 (Very low)</span>
            <span>10 (Very strong)</span>
          </div>
        </div>

        {/* Question 3: Optional Textarea */}
        <div className="space-y-2 pt-3 border-t border-[#F2F4F7]">
          <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#101828]">
            <MessageSquare className="w-3.5 h-3.5 text-[#667085]" />
            <span>What did you notice? <span className="text-[11px] font-normal text-[#98A2B3]">(Optional)</span></span>
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="E.g., Felt restless at first, but reading calmed my mind..."
            className="w-full text-[13px] p-3 rounded-2xl border border-[#D0D5DD] bg-[#FFFFFF] text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:ring-1 focus:ring-[#101828]"
          />
        </div>

        {/* CTA */}
        <div className="pt-2">
          <button
            type="submit"
            id="btn-complete-reflection"
            disabled={isLoadingInsight}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#101828] hover:bg-[#1D2939] text-[#FFFFFF] font-bold text-[14px] shadow-[0_4px_16px_rgba(16,24,40,0.15)] flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-75"
          >
            {isLoadingInsight ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-[#FFFFFF] border-t-transparent animate-spin" />
                <span>Generating mindful insight...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#FDB022]" />
                <span>Complete Reflection</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
