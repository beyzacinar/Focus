import React from 'react';
import { AIReflection } from '../types';
import { Sparkles, Compass, Lightbulb, Target, ArrowRight, RefreshCw } from 'lucide-react';
import { ZenStonesIllustration } from './AbstractIllustrations';

interface AIReflectionCardProps {
  reflection: AIReflection | null;
  isLoadingChallenge: boolean;
  onCreateChallenge: () => void;
  onRegenerateReflection?: () => void;
  onBackToUsage: () => void;
}

export const AIReflectionCard: React.FC<AIReflectionCardProps> = ({
  reflection,
  isLoadingChallenge,
  onCreateChallenge,
  onRegenerateReflection,
  onBackToUsage,
}) => {
  if (!reflection) return null;

  return (
    <div className="space-y-4 pt-1 pb-4">
      {/* Top Header info */}
      <div className="flex items-center justify-between px-1">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#027A48]">
            Mindful Synthesis
          </span>
          <h2 className="text-[22px] font-bold text-[#101828] tracking-[-0.4px] leading-[1.25]">
            Today’s reflection
          </h2>
        </div>
        
        <button
          onClick={onBackToUsage}
          className="text-[12px] font-medium text-[#667085] hover:text-[#101828] underline underline-offset-4 cursor-pointer transition-colors"
        >
          View raw stats
        </button>
      </div>

      {/* Focus Area Hero Banner */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#EAECF0] shadow-[0_4px_24px_rgba(16,24,40,0.03)] relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="max-w-[75%]">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#B54708]">
              Your focus for today
            </span>
            <h3 className="text-[17px] sm:text-[19px] font-bold text-[#101828] mt-1 leading-[1.3] tracking-[-0.3px]">
              “{reflection.focusArea}”
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#F8F9FA] border border-[#EAECF0] flex items-center justify-center">
            <ZenStonesIllustration className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Distinction Section 1: FACTS FROM DATA (Observation) */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#EAECF0] shadow-[0_4px_20px_rgba(16,24,40,0.02)] space-y-2">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-[#027A48] uppercase tracking-wider">
          <div className="w-2 h-2 rounded-full bg-[#12B76A]" />
          <span>Observed in your data</span>
        </div>
        <p className="text-[14px] font-medium text-[#101828] leading-[1.55] pl-3.5 border-l-2 border-[#D1FADF]">
          {reflection.observation}
        </p>
      </div>

      {/* Distinction Section 2: POSSIBLE INTERPRETATIONS (Possible Pattern) */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#EAECF0] shadow-[0_4px_20px_rgba(16,24,40,0.02)] space-y-2">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-[#5925DC] uppercase tracking-wider">
          <div className="w-2 h-2 rounded-full bg-[#7A5AF8]" />
          <span>Possible pattern to explore</span>
        </div>
        <p className="text-[14px] font-medium text-[#344054] leading-[1.55] pl-3.5 border-l-2 border-[#ECE9FE] italic">
          “{reflection.possiblePattern}”
        </p>
        <p className="text-[11px] font-medium text-[#98A2B3] pt-1">
          Presented as an exploratory hypothesis, not a medical diagnosis or judgment.
        </p>
      </div>

      {/* Mindful Inquiry Note */}
      {reflection.reflection && (
        <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-[#EAECF0] flex items-start gap-3">
          <Lightbulb className="w-4 h-4 text-[#F79009] shrink-0 mt-0.5" />
          <p className="text-[12px] font-medium text-[#344054] leading-[1.45]">
            <span className="font-semibold text-[#101828]">Gentle Inquiry: </span>
            {reflection.reflection}
          </p>
        </div>
      )}

      {/* CTA Button: Create my challenge */}
      <div className="pt-2">
        <button
          id="btn-create-my-challenge"
          onClick={onCreateChallenge}
          disabled={isLoadingChallenge}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#101828] hover:bg-[#1D2939] text-[#FFFFFF] font-bold text-[14px] shadow-[0_4px_16px_rgba(16,24,40,0.15)] flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] cursor-pointer disabled:opacity-75"
        >
          {isLoadingChallenge ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-[#FFFFFF] border-t-transparent animate-spin" />
              <span className="text-[14px] font-bold">Tailoring your daily experiment...</span>
            </>
          ) : (
            <>
              <Target className="w-4 h-4 text-[#FDB022]" />
              <span className="text-[14px] font-bold">Create my challenge</span>
              <ArrowRight className="w-4 h-4 text-[#98A2B3]" />
            </>
          )}
        </button>
        <p className="text-[11px] font-medium text-center text-[#98A2B3] mt-2">
          Gemini will generate 1 realistic, small behavioral experiment tailored to this pattern.
        </p>
      </div>
    </div>
  );
};
